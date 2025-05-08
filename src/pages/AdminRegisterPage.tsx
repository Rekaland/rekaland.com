
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Create schema for form validation
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nama harus minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Format email tidak valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon harus minimal 10 digit.",
  }).max(15),
  password: z.string().min(8, {
    message: "Kata sandi harus minimal 8 karakter.",
  }),
  confirmPassword: z.string(),
  region: z.string().min(1, {
    message: "Wilayah pengelolaan wajib diisi.",
  }),
  company: z.string().min(1, {
    message: "Nama perusahaan wajib diisi.",
  }),
  agreeTerms: z.boolean().refine(value => value === true, {
    message: "Anda harus menyetujui syarat dan ketentuan.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok.",
  path: ["confirmPassword"],
});

const AdminRegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      region: "",
      company: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // 1. Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create property manager profile with additional details
        // Using direct SQL query via RPC to avoid type issues
        const { error: profileError } = await supabase.rpc('create_property_manager', {
          p_user_id: authData.user.id,
          p_full_name: values.name,
          p_email: values.email,
          p_phone: values.phone,
          p_region: values.region,
          p_company: values.company
        });

        if (profileError) {
          // Fallback to direct insert if RPC doesn't exist
          const { error: insertError } = await supabase.from('property_managers').insert({
            user_id: authData.user.id, 
            full_name: values.name,
            email: values.email,
            phone: values.phone,
            region: values.region,
            company: values.company,
            status: 'pending'
          } as any); // Type assertion to bypass TypeScript check
          
          if (insertError) throw insertError;
        }

        // 3. Success toast
        toast({
          title: "Pendaftaran Berhasil!",
          description: "Akun Anda sedang menunggu verifikasi oleh admin pusat. Kami akan menghubungi Anda melalui email setelah verifikasi selesai.",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
        });

        // 4. Redirect to confirmation page
        navigate("/admin-register-confirmation");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-t-4 border-t-orange-500 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Pendaftaran Pengelola Properti
              </CardTitle>
              <CardDescription className="text-center">
                Daftar sebagai pengelola properti untuk mengajukan produk properti di Rekaland
              </CardDescription>
            </CardHeader>

            <Alert className="mx-6 bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Penting</AlertTitle>
              <AlertDescription>
                Semua pendaftaran akan diverifikasi oleh admin pusat sebelum akun diaktifkan.
                Pastikan data yang Anda masukkan valid dan dapat dihubungi.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Data Pribadi</h3>
                    <p className="text-sm text-muted-foreground">
                      Masukkan informasi pribadi Anda sebagai pengelola properti
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input placeholder="081234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kata Sandi</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Minimal 8 karakter" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Ulangi kata sandi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Informasi Perusahaan</h3>
                    <p className="text-sm text-muted-foreground">
                      Masukkan informasi perusahaan atau badan usaha Anda
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Perusahaan</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama perusahaan/badan usaha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wilayah Pengelolaan</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Jakarta Selatan, Bandung" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Saya menyetujui <Link to="/terms" className="text-rekaland-orange hover:underline">Syarat & Ketentuan</Link> serta <Link to="/privacy" className="text-rekaland-orange hover:underline">Kebijakan Privasi</Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                
                  <Button 
                    type="submit" 
                    className="w-full bg-rekaland-orange hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Memproses..." : "Daftar Sebagai Pengelola Properti"}
                  </Button>
                </CardContent>
              </form>
            </Form>
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="text-sm text-gray-600">
                Sudah memiliki akun?{" "}
                <Link to="/login" className="text-rekaland-orange hover:underline font-medium">
                  Masuk
                </Link>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-rekaland-orange" />
              <h3 className="text-lg font-medium">Proses Verifikasi</h3>
            </div>
            <ol className="list-decimal pl-10 space-y-2 text-gray-700">
              <li>Isi formulir pendaftaran dengan data yang valid dan lengkap</li>
              <li>Tim admin pusat akan mereview pengajuan Anda dalam 1-3 hari kerja</li>
              <li>Jika disetujui, Anda akan menerima email konfirmasi dengan instruksi selanjutnya</li>
              <li>Setelah diaktifkan, Anda dapat login dan mulai mengelola properti</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminRegisterPage;

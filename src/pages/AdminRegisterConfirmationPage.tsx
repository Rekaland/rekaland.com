
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { CheckCircle2, Home, Mail } from "lucide-react";

const AdminRegisterConfirmationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md border-t-4 border-t-green-500">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Pendaftaran Berhasil!</CardTitle>
            <CardDescription>
              Terima kasih telah mendaftar sebagai pengelola properti di REKA<span className="text-rekaland-orange">LAND</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
              <p className="font-medium mb-2">Akun Anda sedang dalam proses verifikasi</p>
              <p className="text-sm">
                Tim admin pusat kami sedang mereview pengajuan Anda. Proses ini biasanya membutuhkan waktu 1-3 hari kerja.
                Anda akan menerima email konfirmasi setelah akun Anda diverifikasi.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 space-y-2">
              <p className="font-medium">Langkah selanjutnya:</p>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-rekaland-orange" />
                <p className="text-sm">Periksa email Anda secara rutin untuk mendapatkan pembaruan status verifikasi</p>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 mt-0.5 text-rekaland-orange" />
                <p className="text-sm">Setelah diverifikasi, Anda dapat login dan mulai mengelola properti Anda</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Link to="/" className="w-full">
              <Button className="w-full bg-rekaland-orange hover:bg-orange-600">
                Kembali ke Beranda
              </Button>
            </Link>
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRegisterConfirmationPage;


import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Home } from "lucide-react";

const EmailConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { confirmEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    
    const verifyEmail = async () => {
      if (token && type === "email") {
        try {
          const success = await confirmEmail(token);
          setIsSuccess(success);
        } catch (err: any) {
          setError(err.message || "Terjadi kesalahan saat memverifikasi email.");
        } finally {
          setIsVerifying(false);
        }
      } else {
        setError("Parameter token tidak valid.");
        setIsVerifying(false);
      }
    };
    
    verifyEmail();
  }, [searchParams, confirmEmail]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-rekaland-black">Konfirmasi Email</CardTitle>
            <CardDescription>
              {isVerifying 
                ? "Memverifikasi alamat email Anda..." 
                : isSuccess 
                  ? "Alamat email Anda telah dikonfirmasi." 
                  : "Gagal mengonfirmasi alamat email Anda."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-16 w-16 text-rekaland-orange animate-spin mb-4" />
                <p className="text-gray-600">Harap tunggu sebentar...</p>
              </div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <p className="text-gray-600 text-center">
                  Email Anda telah berhasil dikonfirmasi. Sekarang Anda dapat masuk ke akun Anda.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <p className="text-gray-600 text-center">
                  Terjadi kesalahan saat memverifikasi email Anda. Silakan coba lagi atau hubungi dukungan kami.
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => navigate(isSuccess ? "/login" : "/")}
              className="bg-rekaland-orange hover:bg-orange-600 flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              {isSuccess ? "Masuk ke Akun" : "Kembali ke Beranda"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EmailConfirmPage;

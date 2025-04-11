
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { importContentsToSupabase, importPropertiesToSupabase } from "@/utils/contentMigration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Database, Loader2, RefreshCw } from "lucide-react";

const ContentImporter = () => {
  const [contentImportStatus, setContentImportStatus] = useState<{ 
    loading: boolean; 
    success?: boolean; 
    message?: string; 
  }>({ loading: false });
  
  const [propertyImportStatus, setPropertyImportStatus] = useState<{ 
    loading: boolean; 
    success?: boolean; 
    message?: string; 
  }>({ loading: false });

  const handleImportContents = async () => {
    setContentImportStatus({ loading: true });
    try {
      const result = await importContentsToSupabase();
      setContentImportStatus({ loading: false, success: result.success, message: result.message });
    } catch (error) {
      console.error("Error importing contents:", error);
      setContentImportStatus({ 
        loading: false, 
        success: false, 
        message: "Terjadi kesalahan saat mengimpor konten" 
      });
    }
  };

  const handleImportProperties = async () => {
    setPropertyImportStatus({ loading: true });
    try {
      const result = await importPropertiesToSupabase();
      setPropertyImportStatus({ loading: false, success: result.success, message: result.message });
    } catch (error) {
      console.error("Error importing properties:", error);
      setPropertyImportStatus({ 
        loading: false, 
        success: false, 
        message: "Terjadi kesalahan saat mengimpor properti" 
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Impor Konten Website</h2>
      <p className="text-gray-500">
        Tool ini membantu mengimpor konten statis website ke database Supabase agar dapat dikelola melalui dashboard admin.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} /> Impor Konten Halaman
            </CardTitle>
            <CardDescription>
              Mengimpor konten halaman website (Home, About, dll) ke database Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Proses ini akan mengimpor atau memperbarui konten halaman website ke tabel <code>contents</code> di Supabase.
              </p>
              
              {contentImportStatus.message && (
                <Alert className={contentImportStatus.success ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
                  {contentImportStatus.success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  <AlertTitle>
                    {contentImportStatus.success ? "Impor Berhasil" : "Impor Gagal"}
                  </AlertTitle>
                  <AlertDescription>
                    {contentImportStatus.message}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleImportContents}
                disabled={contentImportStatus.loading}
                className={contentImportStatus.loading ? "bg-gray-400" : "bg-gradient-to-r from-blue-500 to-indigo-500"}
              >
                {contentImportStatus.loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sedang Mengimpor...
                  </>
                ) : contentImportStatus.success ? (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Impor Ulang Konten
                  </>
                ) : (
                  <>
                    <Database size={16} className="mr-2" />
                    Impor Konten Halaman
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} /> Impor Data Properti
            </CardTitle>
            <CardDescription>
              Mengimpor data produk properti ke database Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Proses ini akan mengimpor atau memperbarui data properti ke tabel <code>properties</code> di Supabase.
              </p>
              
              {propertyImportStatus.message && (
                <Alert className={propertyImportStatus.success ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
                  {propertyImportStatus.success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  <AlertTitle>
                    {propertyImportStatus.success ? "Impor Berhasil" : "Impor Gagal"}
                  </AlertTitle>
                  <AlertDescription>
                    {propertyImportStatus.message}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleImportProperties}
                disabled={propertyImportStatus.loading}
                className={propertyImportStatus.loading ? "bg-gray-400" : "bg-gradient-to-r from-orange-500 to-amber-500"}
              >
                {propertyImportStatus.loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sedang Mengimpor...
                  </>
                ) : propertyImportStatus.success ? (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Impor Ulang Properti
                  </>
                ) : (
                  <>
                    <Database size={16} className="mr-2" />
                    Impor Data Properti
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentImporter;

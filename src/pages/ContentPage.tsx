
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import ContentDisplay from "@/components/content/ContentDisplay";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Slug halaman tidak ditemukan
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4">
        <ContentDisplay 
          slug={slug} 
          fallbackContent={
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Konten Tidak Ditemukan</h1>
              <p className="text-gray-500">
                Halaman yang Anda cari tidak tersedia. Silakan kembali ke halaman utama.
              </p>
            </div>
          } 
        />
      </div>
    </MainLayout>
  );
};

export default ContentPage;

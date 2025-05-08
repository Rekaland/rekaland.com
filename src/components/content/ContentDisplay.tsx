
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContentBySlug } from "@/hooks/useContentBySlug";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Clock, User, MapPin } from "lucide-react";

interface ContentDisplayProps {
  slug: string;
  fallbackContent?: React.ReactNode;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ slug, fallbackContent }) => {
  const { content, loading, error } = useContentBySlug(slug);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    console.error("Error loading content:", error);
    return fallbackContent || (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h1>
        <p className="text-gray-600 mb-6">Tidak dapat memuat konten yang diminta.</p>
        <Button onClick={() => navigate('/informasi')}>
          Kembali ke Halaman Informasi
        </Button>
      </div>
    );
  }

  if (!content || !content.content) {
    return fallbackContent || (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Konten Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Halaman yang Anda cari tidak tersedia.</p>
        <Button onClick={() => navigate('/informasi')}>
          Kembali ke Halaman Informasi
        </Button>
      </div>
    );
  }

  return (
    <div className="content-display">
      <Button 
        variant="outline" 
        onClick={() => navigate('/informasi')}
        className="mb-6"
      >
        &larr; Kembali ke Informasi
      </Button>
      
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      
      {content.created_at && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          {new Date(content.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
      
      {content.meta_description && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-lg mb-2">Ringkasan</h3>
          <p className="text-gray-600">{content.meta_description}</p>
        </div>
      )}
      
      <div className="mt-8 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={() => navigate('/informasi')}
        >
          &larr; Kembali ke Informasi
        </Button>
      </div>
    </div>
  );
};

export default ContentDisplay;

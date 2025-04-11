
import React from "react";
import { useContentBySlug } from "@/hooks/useContentBySlug";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentDisplayProps {
  slug: string;
  fallbackContent?: React.ReactNode;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ slug, fallbackContent }) => {
  const { content, loading, error } = useContentBySlug(slug);

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
    return fallbackContent || <div>Terjadi kesalahan saat memuat konten.</div>;
  }

  if (!content || !content.content) {
    return fallbackContent || <div>Konten tidak ditemukan.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
};

export default ContentDisplay;

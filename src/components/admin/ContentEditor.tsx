
import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
}

interface ContentEditorProps {
  initialContent: ContentData;
  onSave?: (content: ContentData) => void;
}

export const ContentEditor = ({ initialContent, onSave }: ContentEditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentData>(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    field: keyof ContentData,
    value: string
  ) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const handleSaveContent = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Jika konten memiliki ID, update konten yang ada
      // Jika tidak, buat konten baru
      const { data, error } = content.id 
        ? await supabase
            .from('contents')
            .update({
              title: content.title,
              slug: content.slug,
              content: content.content,
              meta_description: content.metaDescription,
              updated_at: new Date().toISOString()
            })
            .eq('id', content.id)
            .select()
        : await supabase
            .from('contents')
            .insert({
              title: content.title,
              slug: content.slug,
              content: content.content,
              meta_description: content.metaDescription
            })
            .select();
      
      if (error) {
        throw error;
      }
      
      console.log('Content saved successfully:', data);
      
      if (onSave) {
        onSave(content);
      }
      
      toast({
        title: "Konten tersimpan!",
        description: "Perubahan pada konten berhasil disimpan ke database",
        duration: 3000,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    } catch (err: any) {
      console.error('Error saving content:', err);
      
      toast({
        title: "Gagal menyimpan konten",
        description: err.message || "Terjadi kesalahan saat menyimpan konten ke database",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setContent(initialContent);
    toast({
      title: "Perubahan dibatalkan",
      description: "Perubahan pada konten telah dibatalkan",
      duration: 1000,
      className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="page-title">Judul Halaman</Label>
        <Input 
          id="page-title" 
          value={content.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="page-slug">URL</Label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
            example.com/
          </span>
          <Input 
            id="page-slug" 
            className="rounded-l-none" 
            value={content.slug}
            onChange={(e) => handleInputChange("slug", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="page-content">Konten</Label>
        <Textarea 
          id="page-content" 
          rows={10} 
          value={content.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
      </div>
      
      <div>
        <Label>SEO Meta Description</Label>
        <Textarea 
          rows={3} 
          value={content.metaDescription}
          onChange={(e) => handleInputChange("metaDescription", e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline"
          onClick={handleCancelEdit}
        >
          Batal
        </Button>
        <Button 
          onClick={handleSaveContent}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Simpan & Publikasikan
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

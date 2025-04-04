
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, X, Plus, CheckCircle, Database } from "lucide-react";
import { ProductContent } from "@/integrations/supabase/productTypes";

interface ProductContentEditorProps {
  initialContent: ProductContent | null;
  productId: string;
  onSave: (content: ProductContent) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
  isRealTimeConnected?: boolean;
}

export const ProductContentEditor = ({
  initialContent,
  productId,
  onSave,
  isSaving,
  isRealTimeConnected = false
}: ProductContentEditorProps) => {
  const [content, setContent] = useState<ProductContent>({
    id: initialContent?.id || "",
    product_id: productId,
    title: initialContent?.title || "",
    description: initialContent?.description || "",
    features: initialContent?.features || [],
    specifications: initialContent?.specifications || {},
    meta_description: initialContent?.meta_description || ""
  });
  
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  // Reset state when initialContent changes
  useEffect(() => {
    if (initialContent) {
      setContent({
        id: initialContent.id,
        product_id: productId,
        title: initialContent.title,
        description: initialContent.description,
        features: initialContent.features || [],
        specifications: initialContent.specifications || {},
        meta_description: initialContent.meta_description || ""
      });
    } else {
      setContent({
        id: "",
        product_id: productId,
        title: "",
        description: "",
        features: [],
        specifications: {},
        meta_description: ""
      });
    }
    
    setSaveError(null);
    setSaveSuccess(false);
  }, [initialContent, productId]);

  const handleChange = (field: keyof ProductContent, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear success/error messages when user makes changes
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleAddFeature = () => {
    if (newFeature.trim() === "") return;
    
    setContent(prev => ({
      ...prev,
      features: [...(prev.features || []), newFeature.trim()]
    }));
    
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setContent(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);
    
    // Validate
    if (!content.title) {
      setSaveError("Judul konten harus diisi");
      return;
    }
    
    if (!content.description) {
      setSaveError("Deskripsi konten harus diisi");
      return;
    }
    
    // Call save handler
    const result = await onSave(content);
    
    if (result.success) {
      setSaveSuccess(true);
      
      // Auto-reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } else {
      setSaveError(result.error || "Terjadi kesalahan saat menyimpan konten");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {isRealTimeConnected && (
          <div className="text-xs text-green-600 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            <Database className="h-3 w-3 mr-1" />
            Real-time sync aktif
          </div>
        )}
        
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Konten berhasil disimpan!
          </div>
        )}
        
        {saveError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {saveError}
          </div>
        )}
        
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Judul Konten</Label>
            <Input
              id="title"
              value={content.title}
              onChange={e => handleChange("title", e.target.value)}
              placeholder="Masukkan judul konten properti"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={e => handleChange("description", e.target.value)}
              placeholder="Deskripsi detail tentang properti"
              className="min-h-[200px] mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML dasar diperbolehkan, seperti &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;
            </p>
          </div>
          
          <div>
            <Label htmlFor="meta_description">Meta Description (SEO)</Label>
            <Textarea
              id="meta_description"
              value={content.meta_description || ""}
              onChange={e => handleChange("meta_description", e.target.value)}
              placeholder="Deskripsi singkat untuk SEO (ditampilkan di hasil pencarian)"
              rows={3}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maksimal 160 karakter untuk hasil optimal di mesin pencari
            </p>
          </div>
          
          <div>
            <Label>Fitur Properti</Label>
            <Card className="mt-2">
              <CardContent className="p-4">
                <div className="space-y-3 mb-4">
                  {content.features && content.features.length > 0 ? (
                    content.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm py-2">Belum ada fitur. Tambahkan fitur properti di bawah.</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    placeholder="Tambahkan fitur baru"
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    disabled={!newFeature.trim()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-8">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan Konten
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Save, Eye, Loader2 } from "lucide-react";
import { ProductContent } from '@/hooks/useProductContent';
import { useToast } from '@/hooks/use-toast';

interface ProductContentEditorProps {
  initialContent: ProductContent | null;
  productId?: string;
  onSave?: (content: ProductContent) => Promise<{ success: boolean, error?: string }>;
  isSaving?: boolean;
  isRealTimeConnected?: boolean;
}

const defaultContent: ProductContent = {
  id: '',
  title: '',
  description: '',
  features: [],
  specifications: {},
  meta_description: ''
};

export const ProductContentEditor = ({ 
  initialContent, 
  productId,
  onSave,
  isSaving = false,
  isRealTimeConnected = false
}: ProductContentEditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState<ProductContent>(initialContent || defaultContent);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  // Update content when initialContent changes (e.g., from real-time sync)
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleInputChange = (
    field: keyof ProductContent,
    value: string | string[] | Record<string, string>
  ) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setContent({
        ...content,
        features: [...content.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...content.features];
    updatedFeatures.splice(index, 1);
    setContent({
      ...content,
      features: updatedFeatures
    });
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setContent({
        ...content,
        specifications: {
          ...content.specifications,
          [newSpecKey.trim()]: newSpecValue.trim()
        }
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpecification = (key: string) => {
    const updatedSpecs = { ...content.specifications };
    delete updatedSpecs[key];
    setContent({
      ...content,
      specifications: updatedSpecs
    });
  };

  const handleSaveContent = async () => {
    if (!onSave) return;

    // Validasi data sebelum menyimpan
    if (!content.title) {
      toast({
        title: "Judul diperlukan",
        description: "Mohon isi judul produk",
        variant: "destructive",
      });
      return;
    }

    // Persiapkan konten untuk disimpan
    const contentToSave: ProductContent = {
      ...content,
      product_id: productId || content.product_id,
    };

    // Panggil fungsi onSave yang diberikan
    const result = await onSave(contentToSave);
    
    if (!result.success) {
      toast({
        title: "Gagal menyimpan",
        description: result.error || "Terjadi kesalahan saat menyimpan konten",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Editor Konten Produk</h2>
        {isRealTimeConnected && (
          <div className="text-xs text-green-600 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Real-time sync aktif
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
          <TabsTrigger value="features">Fitur Produk</TabsTrigger>
          <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-title">Judul Produk</Label>
                  <Input 
                    id="product-title" 
                    value={content.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Masukkan judul produk"
                  />
                </div>
                
                <div>
                  <Label htmlFor="product-description">Deskripsi Produk</Label>
                  <Textarea 
                    id="product-description" 
                    rows={5} 
                    value={content.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Jelaskan detail tentang produk ini"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta-description">SEO Meta Description</Label>
                  <Textarea 
                    id="meta-description" 
                    rows={2} 
                    value={content.meta_description || ''}
                    onChange={(e) => handleInputChange("meta_description", e.target.value)}
                    placeholder="Deskripsi singkat untuk meningkatkan SEO"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Fitur Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Tambahkan fitur baru"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button 
                    onClick={handleAddFeature}
                    variant="secondary"
                  >
                    <Plus size={16} className="mr-1" />
                    Tambah
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {content.features && content.features.length > 0 ? (
                    content.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span>{feature}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <X size={14} className="text-gray-500" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Belum ada fitur yang ditambahkan</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications">
          <Card>
            <CardHeader>
              <CardTitle>Spesifikasi Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-5">
                    <Input 
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Parameter (mis: Ukuran)"
                    />
                  </div>
                  <div className="col-span-5">
                    <Input 
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Nilai (mis: 45m²)"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSpecification()}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button 
                      onClick={handleAddSpecification}
                      variant="secondary"
                      className="w-full"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  {content.specifications && Object.keys(content.specifications).length > 0 ? (
                    Object.entries(content.specifications).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-50 rounded border">
                        <div className="col-span-5 font-medium">{key}</div>
                        <div className="col-span-5 text-gray-600">{value}</div>
                        <div className="col-span-2 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveSpecification(key)}
                          >
                            <X size={14} className="text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Belum ada spesifikasi yang ditambahkan</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Eye size={16} className="mr-2" />
          Pratinjau
        </Button>
        <Button 
          onClick={handleSaveContent}
          disabled={isSaving}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
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
    </div>
  );
};

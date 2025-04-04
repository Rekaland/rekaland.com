
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, Plus, Save, AlertCircle, RefreshCw, CheckCircle2 
} from "lucide-react";
import { ProductContent } from "@/integrations/supabase/productTypes";

interface ProductContentEditorProps {
  initialContent: ProductContent | null;
  productId: string;
  onSave: (content: ProductContent) => Promise<{ success: boolean, error?: string }>;
  isSaving: boolean;
  isRealTimeConnected?: boolean;
}

export const ProductContentEditor: React.FC<ProductContentEditorProps> = ({
  initialContent,
  productId,
  onSave,
  isSaving,
  isRealTimeConnected = false
}) => {
  const [content, setContent] = useState<ProductContent>({
    id: initialContent?.id || '',
    product_id: productId,
    title: initialContent?.title || '',
    description: initialContent?.description || '',
    features: initialContent?.features || [],
    specifications: initialContent?.specifications || {},
    meta_description: initialContent?.meta_description || '',
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Reset form when initialContent changes
  useEffect(() => {
    if (initialContent) {
      setContent({
        id: initialContent.id,
        product_id: initialContent.product_id || productId,
        title: initialContent.title || '',
        description: initialContent.description || '',
        features: initialContent.features || [],
        specifications: initialContent.specifications || {},
        meta_description: initialContent.meta_description || '',
      });
    } else {
      setContent({
        id: '',
        product_id: productId,
        title: '',
        description: '',
        features: [],
        specifications: {},
        meta_description: '',
      });
    }
  }, [initialContent, productId]);
  
  // Add a new feature to the list
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setContent({
        ...content,
        features: [...(content.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };
  
  // Remove a feature from the list
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(content.features || [])];
    updatedFeatures.splice(index, 1);
    setContent({ ...content, features: updatedFeatures });
  };
  
  // Add a new specification
  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setContent({
        ...content,
        specifications: {
          ...(content.specifications || {}),
          [newSpecKey.trim()]: newSpecValue.trim()
        }
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };
  
  // Remove a specification
  const handleRemoveSpecification = (key: string) => {
    const updatedSpecs = { ...(content.specifications || {}) };
    delete updatedSpecs[key];
    setContent({ ...content, specifications: updatedSpecs });
  };
  
  // Handle saving the content
  const handleSave = async () => {
    if (!content.title) {
      setError("Judul konten harus diisi");
      return;
    }
    
    if (!content.description) {
      setError("Deskripsi konten harus diisi");
      return;
    }
    
    setError(null);
    const result = await onSave(content);
    
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setError(result.error);
    }
  };
  
  return (
    <div className="space-y-6">
      {error && (
        <Alert className="bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>Konten berhasil disimpan!</AlertDescription>
        </Alert>
      )}
      
      {isRealTimeConnected && (
        <div className="text-xs text-green-600 flex items-center mb-2">
          <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
          Real-time sync aktif
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Judul Konten</Label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            placeholder="Masukkan judul konten"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            placeholder="Masukkan deskripsi lengkap produk"
            className="mt-1 min-h-[200px]"
          />
        </div>
      </div>
      
      <Tabs defaultValue="features">
        <TabsList>
          <TabsTrigger value="features">Fitur Produk</TabsTrigger>
          <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
          <TabsTrigger value="meta">Meta Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Masukkan fitur baru"
              onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
            />
            <Button onClick={handleAddFeature} type="button">
              <Plus size={16} className="mr-1" />
              Tambah
            </Button>
          </div>
          
          <div className="border rounded-md p-4">
            {content.features && content.features.length > 0 ? (
              <ul className="space-y-2">
                {content.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>{feature}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X size={16} className="text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Belum ada fitur yang ditambahkan
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Input
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              placeholder="Nama spesifikasi"
              className="w-1/3"
            />
            <Input
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              placeholder="Nilai spesifikasi"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddSpecification()}
            />
            <Button onClick={handleAddSpecification} type="button">
              <Plus size={16} className="mr-1" />
              Tambah
            </Button>
          </div>
          
          <div className="border rounded-md p-4">
            {content.specifications && Object.keys(content.specifications).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(content.specifications).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <div>
                      <span className="font-medium">{key}: </span>
                      <span>{value}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSpecification(key)}
                    >
                      <X size={16} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Belum ada spesifikasi yang ditambahkan
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="meta" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="meta_description">Meta Description (SEO)</Label>
            <Textarea
              id="meta_description"
              value={content.meta_description || ''}
              onChange={(e) => setContent({ ...content, meta_description: e.target.value })}
              placeholder="Masukkan deskripsi singkat untuk SEO (optional)"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deskripsi ini akan digunakan untuk meningkatkan SEO pada halaman produk
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-6" />
      
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          {isSaving ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Simpan Konten
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

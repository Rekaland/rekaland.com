import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductContentEditor } from "./content/ProductContentEditor";
import { Search, Plus, Edit, Trash2, Eye, FileText, Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/integrations/supabase/client";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { ProductContent, ProductContentDB, convertDBToProductContent } from "@/integrations/supabase/productTypes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProductContentManagement = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [contents, setContents] = useState<ProductContent[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [isLoadingContents, setIsLoadingContents] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedContent, setSelectedContent] = useState<ProductContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { isSubscribed: isPropertiesSynced } = useRealTimeSync('properties', fetchProperties);
  const { isSubscribed: isContentsSynced } = useRealTimeSync('product_contents', fetchContents);

  async function fetchProperties() {
    try {
      setIsLoadingProperties(true);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('title', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        setProperties(data);
      }
    } catch (err: any) {
      console.error("Error loading properties:", err);
      toast({
        title: "Gagal memuat data properti",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingProperties(false);
    }
  }

  async function fetchContents() {
    try {
      setIsLoadingContents(true);
      
      const { data, error } = await supabase
        .from('product_contents')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const processedContents = data.map(item => {
          return convertDBToProductContent(item as ProductContentDB);
        }).filter(Boolean) as ProductContent[];
        
        setContents(processedContents);
      }
    } catch (err: any) {
      console.error("Error loading product contents:", err);
      toast({
        title: "Gagal memuat konten produk",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingContents(false);
    }
  }

  useEffect(() => {
    fetchProperties();
    fetchContents();
  }, []);

  const handleSaveContent = async (content: ProductContent) => {
    try {
      setIsSaving(true);
      
      if (!content.title || !selectedProperty) {
        return { 
          success: false, 
          error: "Data tidak lengkap. Pastikan judul dan properti terkait sudah dipilih." 
        };
      }
      
      let result;
      
      if (content.id) {
        result = await supabase
          .from('product_contents')
          .update({
            title: content.title,
            description: content.description,
            features: content.features,
            specifications: content.specifications,
            meta_description: content.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.id);
      } else {
        result = await supabase
          .from('product_contents')
          .insert({
            product_id: selectedProperty.id,
            title: content.title,
            description: content.description,
            features: content.features,
            specifications: content.specifications,
            meta_description: content.meta_description
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      await fetchContents();
      
      setActiveTab("list");
      
      toast({
        title: "Konten tersimpan!",
        description: "Perubahan pada konten produk berhasil disimpan",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
      
      return { success: true };
    } catch (err: any) {
      console.error("Error saving product content:", err);
      return { 
        success: false, 
        error: err.message || "Terjadi kesalahan saat menyimpan konten"
      };
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditContent = (contentId: string) => {
    const content = contents.find(item => item.id === contentId);
    if (content) {
      const property = properties.find(prop => prop.id === content.product_id);
      setSelectedProperty(property || null);
      setSelectedContent(content);
      setActiveTab("edit");
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from('product_contents')
        .delete()
        .eq('id', contentId);
      
      if (error) throw error;
      
      await fetchContents();
      
      toast({
        title: "Konten dihapus",
        description: "Konten produk berhasil dihapus",
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg",
      });
    } catch (err: any) {
      console.error("Error deleting product content:", err);
      toast({
        title: "Gagal menghapus konten",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const filteredContents = contents.filter(content => 
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    properties.find(prop => prop.id === content.product_id)?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPropertyName = (productId?: string) => {
    if (!productId) return "Tidak ada properti terkait";
    const property = properties.find(prop => prop.id === productId);
    return property ? property.title : "Properti tidak ditemukan";
  };

  const handleAddNewContent = (property: Property) => {
    setSelectedProperty(property);
    setSelectedContent(null);
    setActiveTab("edit");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten Produk</h2>
        <div className="flex items-center gap-2">
          {(isPropertiesSynced && isContentsSynced) && (
            <div className="text-xs text-green-600 flex items-center mr-2">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              Real-time sync aktif
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchProperties();
              fetchContents();
            }}
            className="h-9"
          >
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText size={16} />
            Daftar Konten
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2" disabled={!selectedProperty}>
            <Edit size={16} />
            {selectedContent ? "Edit Konten" : "Tambah Konten"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Konten Produk</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari konten..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingContents || isLoadingProperties ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Memuat data...</span>
                </div>
              ) : contents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Belum ada konten produk yang ditambahkan</p>
                  <Button
                    onClick={() => setActiveTab("properties")}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Plus size={16} className="mr-2" />
                    Tambah Konten Produk
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Properti Terkait</TableHead>
                        <TableHead>Fitur</TableHead>
                        <TableHead>Terakhir Diperbarui</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Tidak ada konten yang sesuai dengan pencarian
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContents.map(content => (
                          <TableRow key={content.id}>
                            <TableCell className="font-medium">{content.title}</TableCell>
                            <TableCell>{getPropertyName(content.product_id)}</TableCell>
                            <TableCell>{content.features?.length || 0} fitur</TableCell>
                            <TableCell>
                              {content.updated_at ? new Date(content.updated_at).toLocaleDateString() : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditContent(content.id)}
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteContent(content.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properti Tersedia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle>Tip Penggunaan</AlertTitle>
                  <AlertDescription>
                    Pilih properti dari daftar di bawah ini untuk menambahkan atau mengedit konten produknya
                  </AlertDescription>
                </Alert>

                {isLoadingProperties ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-500">Memuat properti...</span>
                  </div>
                ) : properties.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    Belum ada properti yang tersedia. Tambahkan properti terlebih dahulu.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map(property => {
                      const hasContent = contents.some(c => c.product_id === property.id);
                      return (
                        <Card key={property.id} className="border overflow-hidden hover:shadow-md transition-shadow duration-200">
                          <CardContent className="p-0">
                            <div className="p-4">
                              <h3 className="font-semibold text-sm mb-1 truncate" title={property.title}>
                                {property.title}
                              </h3>
                              <div className="text-xs text-gray-500 mb-3">
                                {property.location}
                              </div>
                              
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-xs">
                                  <div className={`w-2 h-2 rounded-full mr-1 ${hasContent ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                  <span>{hasContent ? 'Memiliki konten' : 'Belum ada konten'}</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant={hasContent ? "outline" : "default"}
                                  className={!hasContent ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
                                  onClick={() => {
                                    const existingContent = contents.find(c => c.product_id === property.id);
                                    if (existingContent) {
                                      handleEditContent(existingContent.id);
                                    } else {
                                      handleAddNewContent(property);
                                    }
                                  }}
                                >
                                  {hasContent ? (
                                    <>
                                      <Edit size={14} className="mr-1" />
                                      Edit
                                    </>
                                  ) : (
                                    <>
                                      <Plus size={14} className="mr-1" />
                                      Tambah
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          {selectedProperty && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedContent ? "Edit Konten Produk" : "Tambah Konten Produk Baru"}</CardTitle>
                <div className="text-sm text-gray-500">
                  Properti: {selectedProperty.title} ({selectedProperty.location})
                </div>
              </CardHeader>
              <CardContent>
                <ProductContentEditor
                  initialContent={selectedContent}
                  productId={selectedProperty.id}
                  onSave={handleSaveContent}
                  isSaving={isSaving}
                  isRealTimeConnected={isContentsSynced}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductContentManagement;

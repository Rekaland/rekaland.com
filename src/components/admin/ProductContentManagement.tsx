
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Edit, Trash2, Save, Plus, 
  FileText, ListChecks, CheckSquare, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { 
  ProductContent, 
  ProductContentDB, 
  convertDBToProductContent 
} from "@/integrations/supabase/productTypes";

const ProductContentManagement = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<ProductContent[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [activeContent, setActiveContent] = useState<ProductContent>({
    id: "",
    product_id: "",
    title: "",
    description: "",
    features: [],
    specifications: {},
    meta_description: ""
  });
  
  const [newFeature, setNewFeature] = useState("");
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  
  // Setup real-time sync for tabel product_contents
  const { isSubscribed } = useRealTimeSync('product_contents', loadContents);
  
  // Muat daftar properti dan konten produk
  useEffect(() => {
    loadProperties();
    loadContents();
  }, []);
  
  // Fungsi untuk memuat daftar properti
  async function loadProperties() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, category');
        
      if (error) throw error;
      
      if (data) {
        setProperties(data);
      }
    } catch (err) {
      console.error("Error loading properties:", err);
      toast({
        title: "Gagal memuat data properti",
        description: "Terjadi kesalahan saat mengambil data dari server",
        variant: "destructive",
      });
    }
  }
  
  // Fungsi untuk memuat daftar konten produk
  async function loadContents() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('product_contents')
        .select('*');
        
      if (error) throw error;
      
      if (data) {
        // Konversi data dari database ke format frontend
        const processedContents = data.map((item: ProductContentDB) => 
          convertDBToProductContent(item)
        ).filter((item): item is ProductContent => item !== null);
        
        setContents(processedContents);
      }
    } catch (err) {
      console.error("Error loading product contents:", err);
      toast({
        title: "Gagal memuat data konten",
        description: "Terjadi kesalahan saat mengambil data dari server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  
  // Fungsi untuk mengedit konten produk
  const handleEditContent = (content: ProductContent) => {
    setActiveContent({
      ...content,
      features: content.features || [],
      specifications: content.specifications || {}
    });
    setActiveTab("edit");
  };
  
  // Fungsi untuk membuat konten baru
  const handleNewContent = () => {
    setActiveContent({
      id: "",
      product_id: "",
      title: "",
      description: "",
      features: [],
      specifications: {},
      meta_description: ""
    });
    setActiveTab("edit");
  };
  
  // Fungsi untuk menambahkan fitur
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    setActiveContent({
      ...activeContent,
      features: [...(activeContent.features || []), newFeature.trim()]
    });
    
    setNewFeature("");
  };
  
  // Fungsi untuk menghapus fitur
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(activeContent.features || [])];
    updatedFeatures.splice(index, 1);
    setActiveContent({
      ...activeContent,
      features: updatedFeatures
    });
  };
  
  // Fungsi untuk menambahkan spesifikasi
  const handleAddSpecification = () => {
    if (!specKey.trim() || !specValue.trim()) return;
    
    setActiveContent({
      ...activeContent,
      specifications: {
        ...(activeContent.specifications || {}),
        [specKey.trim()]: specValue.trim()
      }
    });
    
    setSpecKey("");
    setSpecValue("");
  };
  
  // Fungsi untuk menghapus spesifikasi
  const handleRemoveSpecification = (key: string) => {
    const updatedSpecs = { ...(activeContent.specifications || {}) };
    delete updatedSpecs[key];
    
    setActiveContent({
      ...activeContent,
      specifications: updatedSpecs
    });
  };
  
  // Fungsi untuk menyimpan konten produk
  const handleSaveContent = async () => {
    try {
      setIsSaving(true);
      
      // Validasi data
      if (!activeContent.title) {
        toast({
          title: "Data tidak lengkap",
          description: "Judul konten harus diisi",
          variant: "destructive",
        });
        return;
      }
      
      if (!activeContent.product_id) {
        toast({
          title: "Data tidak lengkap",
          description: "Pilih properti terlebih dahulu",
          variant: "destructive",
        });
        return;
      }
      
      let result;
      
      if (activeContent.id) {
        // Update konten yang sudah ada
        result = await supabase
          .from('product_contents')
          .update({
            title: activeContent.title,
            description: activeContent.description,
            features: activeContent.features,
            specifications: activeContent.specifications,
            meta_description: activeContent.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', activeContent.id);
      } else {
        // Buat konten baru
        result = await supabase
          .from('product_contents')
          .insert({
            product_id: activeContent.product_id,
            title: activeContent.title,
            description: activeContent.description,
            features: activeContent.features,
            specifications: activeContent.specifications,
            meta_description: activeContent.meta_description
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Muat ulang data setelah perubahan
      await loadContents();
      
      // Reset form dan kembali ke tab list
      setActiveTab("list");
      
      toast({
        title: "Konten tersimpan!",
        description: "Perubahan pada konten produk berhasil disimpan",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (err: any) {
      console.error("Error saving product content:", err);
      toast({
        title: "Gagal menyimpan konten",
        description: err.message || "Terjadi kesalahan saat menyimpan ke database",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Fungsi untuk menghapus konten produk
  const handleDeleteContent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konten ini?")) return;
    
    try {
      const { error } = await supabase
        .from('product_contents')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      await loadContents();
      
      toast({
        title: "Konten terhapus",
        description: "Konten produk berhasil dihapus",
        className: "bg-gray-900 text-white",
      });
    } catch (err: any) {
      console.error("Error deleting product content:", err);
      toast({
        title: "Gagal menghapus konten",
        description: err.message || "Terjadi kesalahan saat menghapus dari database",
        variant: "destructive",
      });
    }
  };
  
  // Mendapatkan nama properti berdasarkan ID
  const getPropertyTitle = (id: string | null | undefined) => {
    if (!id) return "Tidak ada properti terkait";
    const property = properties.find(p => p.id === id);
    return property ? property.title : "Properti tidak ditemukan";
  };
  
  // Filter konten berdasarkan kata kunci pencarian
  const filteredContents = contents.filter(content => 
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPropertyTitle(content.product_id).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten Produk</h2>
        <Button 
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
          onClick={handleNewContent}
        >
          <Plus size={16} className="mr-2" />
          Tambah Konten Baru
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText size={16} />
            Daftar Konten
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit size={16} />
            {activeContent.id ? "Edit Konten" : "Konten Baru"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Daftar Konten Produk</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari konten..."
                    className="pl-8 w-full sm:w-[200px] h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Memuat data konten...</span>
                </div>
              ) : filteredContents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm 
                    ? "Tidak ditemukan konten yang sesuai dengan pencarian" 
                    : "Belum ada konten produk yang ditambahkan"}
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Judul Konten</TableHead>
                        <TableHead>Properti Terkait</TableHead>
                        <TableHead>Fitur</TableHead>
                        <TableHead>Spesifikasi</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContents.map((content) => (
                        <TableRow key={content.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{content.title}</TableCell>
                          <TableCell>{getPropertyTitle(content.product_id)}</TableCell>
                          <TableCell>{content.features?.length || 0} fitur</TableCell>
                          <TableCell>
                            {content.specifications 
                              ? Object.keys(content.specifications).length 
                              : 0} item
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditContent(content)}
                              >
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteContent(content.id)}
                              >
                                <Trash2 size={14} className="mr-1" />
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {isSubscribed && (
                <div className="mt-4 text-xs text-right text-green-600">
                  <span className="flex items-center justify-end">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    Sinkronisasi real-time aktif
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>{activeContent.id ? "Edit Konten Produk" : "Tambah Konten Produk Baru"}</CardTitle>
              <CardDescription>Kelola informasi konten untuk properti</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveContent(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product_id">Pilih Properti</Label>
                    <select 
                      id="product_id" 
                      className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md"
                      value={activeContent.product_id || ""}
                      onChange={(e) => setActiveContent({...activeContent, product_id: e.target.value})}
                    >
                      <option value="">-- Pilih Properti --</option>
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.title} ({property.category === 'empty_lot' 
                            ? 'Kavling Kosongan' 
                            : property.category === 'semi_finished' 
                              ? 'Kavling Bangunan' 
                              : 'Kavling Siap Huni'})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="title">Judul Konten</Label>
                    <Input 
                      id="title" 
                      value={activeContent.title}
                      onChange={(e) => setActiveContent({...activeContent, title: e.target.value})}
                      placeholder="Judul konten produk"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    rows={5}
                    value={activeContent.description}
                    onChange={(e) => setActiveContent({...activeContent, description: e.target.value})}
                    placeholder="Deskripsi detail tentang produk"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta_description">Meta Deskripsi (SEO)</Label>
                  <Textarea 
                    id="meta_description" 
                    rows={2}
                    value={activeContent.meta_description || ""}
                    onChange={(e) => setActiveContent({...activeContent, meta_description: e.target.value})}
                    placeholder="Deskripsi singkat untuk SEO (maks. 160 karakter)"
                    maxLength={160}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="features">Fitur Unggulan</Label>
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckSquare size={14} className="mr-1" />
                      <span>{activeContent.features?.length || 0} fitur</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        id="newFeature"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Tambahkan fitur baru"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddFeature}
                      >
                        Tambah
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {activeContent.features && activeContent.features.length > 0 ? (
                        activeContent.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center">
                              <CheckSquare size={16} className="text-green-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveFeature(index)}
                            >
                              <Trash2 size={14} className="text-red-500" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          Belum ada fitur yang ditambahkan
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="specifications">Spesifikasi Produk</Label>
                    <div className="flex items-center text-xs text-gray-500">
                      <ListChecks size={14} className="mr-1" />
                      <span>
                        {activeContent.specifications 
                          ? Object.keys(activeContent.specifications).length 
                          : 0} item
                      </span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="md:col-span-1">
                        <Input 
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                          placeholder="Nama (contoh: Luas Tanah)"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Input 
                          value={specValue}
                          onChange={(e) => setSpecValue(e.target.value)}
                          placeholder="Nilai (contoh: 100 m²)"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecification())}
                        />
                      </div>
                      <div>
                        <Button 
                          type="button" 
                          onClick={handleAddSpecification}
                          className="w-full"
                        >
                          Tambah
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {activeContent.specifications && Object.keys(activeContent.specifications).length > 0 ? (
                        Object.entries(activeContent.specifications).map(([key, value], index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="grid grid-cols-2 w-full">
                              <div className="font-medium">{key}</div>
                              <div>{value}</div>
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveSpecification(key)}
                            >
                              <Trash2 size={14} className="text-red-500" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          Belum ada spesifikasi yang ditambahkan
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("list");
                      // Reset form jika membuat konten baru
                      if (!activeContent.id) {
                        setActiveContent({
                          id: "",
                          product_id: "",
                          title: "",
                          description: "",
                          features: [],
                          specifications: {},
                          meta_description: ""
                        });
                      }
                    }}
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
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
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductContentManagement;

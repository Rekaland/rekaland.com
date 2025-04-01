
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Upload, Save, Eye, FileText, Plus, Search, Filter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { Property } from "@/integrations/supabase/client";

// Define property types using proper TypeScript types from Supabase database
type PropertyCategory = "ready_to_occupy" | "empty_lot" | "semi_finished";
type PropertyStatus = "available" | "sold" | "pending";

interface ActiveProperty {
  id: string;
  title: string;
  type: PropertyCategory;
  price: string;
  location: string;
  description: string;
  status: PropertyStatus;
}

const PropertyManagement = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [activeProperty, setActiveProperty] = useState<ActiveProperty>({
    id: "",
    title: "",
    type: "ready_to_occupy",
    price: "",
    location: "",
    description: "",
    status: "available"
  });

  // Setup real-time sync for tabel properties
  const { isSubscribed } = useRealTimeSync('properties', loadProperties);

  // Fungsi untuk memuat data properti dari Supabase
  async function loadProperties() {
    try {
      setIsLoading(true);
      
      // Query data properti dari Supabase
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProperties(data);
      }
    } catch (err) {
      console.error("Error loading properties:", err);
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat memuat data properti",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Muat properti saat komponen dimuat
  useEffect(() => {
    loadProperties();
  }, []);

  // Fungsi untuk menyimpan properti baru atau update
  const handleSaveProperty = async () => {
    try {
      setIsSaving(true);
      
      // Validasi data sebelum menyimpan
      if (!activeProperty.title || !activeProperty.location || !activeProperty.price) {
        toast({
          title: "Data tidak lengkap",
          description: "Harap isi judul, lokasi, dan harga properti",
          variant: "destructive",
        });
        return;
      }
      
      // Pemrosesan harga untuk memastikan format numerik
      const processedPrice = parseFloat(activeProperty.price.toString().replace(/[^0-9]/g, ''));
      
      // Pemrosesan properti untuk format yang benar sesuai dengan tipe data Supabase
      const processedProperty = {
        title: activeProperty.title,
        price: processedPrice,
        location: activeProperty.location,
        description: activeProperty.description,
        category: activeProperty.type,
        status: activeProperty.status
      };
      
      let result;
      
      if (activeProperty.id) {
        // Update properti yang sudah ada
        result = await supabase
          .from('properties')
          .update({
            title: processedProperty.title,
            price: processedProperty.price,
            location: processedProperty.location,
            description: processedProperty.description,
            category: processedProperty.category,
            status: processedProperty.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', activeProperty.id);
      } else {
        // Membuat properti baru
        result = await supabase
          .from('properties')
          .insert({
            title: processedProperty.title,
            price: processedProperty.price,
            location: processedProperty.location,
            description: processedProperty.description,
            category: processedProperty.category,
            status: processedProperty.status
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Muat ulang data setelah perubahan
      await loadProperties();
      
      // Reset form dan pindah ke tab list
      setActiveProperty({
        id: "",
        title: "",
        type: "ready_to_occupy",
        price: "",
        location: "",
        description: "",
        status: "available"
      });
      
      setActiveTab("list");
      
      toast({
        title: "Properti tersimpan!",
        description: "Perubahan pada properti berhasil disimpan ke database",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    } catch (err: any) {
      console.error("Error saving property:", err);
      toast({
        title: "Gagal menyimpan properti",
        description: err.message || "Terjadi kesalahan saat menyimpan ke database",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Fungsi untuk mengedit properti yang sudah ada
  const handleEditProperty = async (id: string) => {
    try {
      // Fetch properti dari database berdasarkan ID
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Convert database property to form state with proper type casting
        setActiveProperty({
          id: data.id,
          title: data.title,
          type: data.category as PropertyCategory,
          price: data.price.toString(),
          location: data.location,
          description: data.description || "",
          status: data.status as PropertyStatus || "available"
        });
        
        // Pindah ke tab edit
        setActiveTab("edit");
        
        toast({
          title: "Mengedit properti",
          description: `Membuka properti: ${data.title}`,
          duration: 1000,
          className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
        });
      }
    } catch (err: any) {
      console.error("Error fetching property:", err);
      toast({
        title: "Gagal memuat properti",
        description: err.message || "Terjadi kesalahan saat memuat data dari database",
        variant: "destructive",
      });
    }
  };

  // Fungsi untuk menghapus properti
  const handleDeleteProperty = async (id: string) => {
    try {
      // Hapus properti dari database
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Muat ulang data setelah menghapus
      await loadProperties();
      
      toast({
        title: "Menghapus properti",
        description: "Properti berhasil dihapus dari database",
        duration: 1000,
        className: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    } catch (err: any) {
      console.error("Error deleting property:", err);
      toast({
        title: "Gagal menghapus properti",
        description: err.message || "Terjadi kesalahan saat menghapus dari database",
        variant: "destructive",
      });
    }
  };

  // Filter properti berdasarkan search term
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Properti</h2>
        <Button 
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
          onClick={() => {
            setActiveProperty({
              id: "",
              title: "",
              type: "ready_to_occupy",
              price: "",
              location: "",
              description: "",
              status: "available"
            });
            setActiveTab("edit");
          }}
        >
          <Plus size={16} className="mr-2" />
          Tambah Properti Baru
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText size={16} />
            Daftar Properti
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Pencil size={16} />
            Edit Properti
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="mb-6">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Daftar Properti</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Cari properti..."
                      className="pl-8 w-full sm:w-[200px] h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter size={14} className="mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Memuat data properti...</span>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? "Tidak ditemukan properti yang sesuai dengan pencarian" : "Belum ada properti yang ditambahkan"}
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Properti</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProperties.map(property => (
                        <TableRow key={property.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-xs">{property.id.substring(0, 8)}...</TableCell>
                          <TableCell>{property.title}</TableCell>
                          <TableCell>
                            {property.category === "ready_to_occupy" ? "Siap Huni" : 
                             property.category === "semi_finished" ? "Setengah Jadi" : "Kavling Kosongan"}
                          </TableCell>
                          <TableCell>Rp {property.price.toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              property.status === 'available' ? 'bg-green-100 text-green-800' : 
                              property.status === 'sold' ? 'bg-red-100 text-red-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {property.status === 'available' ? 'Tersedia' : 
                               property.status === 'sold' ? 'Terjual' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell>{property.location}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditProperty(property.id)}
                              >
                                <Pencil size={14} className="mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
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
              <CardTitle>{activeProperty.id ? "Edit Properti" : "Tambah Properti Baru"}</CardTitle>
              <CardDescription>Kelola informasi properti</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProperty(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property-name">Nama Properti</Label>
                    <Input 
                      id="property-name" 
                      value={activeProperty.title}
                      onChange={(e) => setActiveProperty({...activeProperty, title: e.target.value})}
                      placeholder="Masukkan nama properti"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-type">Tipe Properti</Label>
                    <select 
                      id="property-type" 
                      className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md"
                      value={activeProperty.type}
                      onChange={(e) => setActiveProperty({...activeProperty, type: e.target.value as PropertyCategory})}
                    >
                      <option value="ready_to_occupy">Siap Huni</option>
                      <option value="semi_finished">Setengah Jadi</option>
                      <option value="empty_lot">Kavling Kosongan</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="property-price">Harga (Rp)</Label>
                    <Input 
                      id="property-price" 
                      value={activeProperty.price}
                      onChange={(e) => setActiveProperty({...activeProperty, price: e.target.value})}
                      placeholder="Contoh: 1200000000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-location">Lokasi</Label>
                    <Input 
                      id="property-location" 
                      value={activeProperty.location}
                      onChange={(e) => setActiveProperty({...activeProperty, location: e.target.value})}
                      placeholder="Contoh: Jakarta Selatan"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-status">Status</Label>
                    <select 
                      id="property-status" 
                      className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md"
                      value={activeProperty.status}
                      onChange={(e) => setActiveProperty({...activeProperty, status: e.target.value as PropertyStatus})}
                    >
                      <option value="available">Tersedia</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Terjual</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="property-description">Deskripsi</Label>
                  <Textarea 
                    id="property-description" 
                    rows={5}
                    value={activeProperty.description}
                    onChange={(e) => setActiveProperty({...activeProperty, description: e.target.value})}
                    placeholder="Deskripsi detail tentang properti"
                  />
                </div>

                <div>
                  <Label>Foto Properti</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 mt-2 text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Drag & drop foto properti di sini, atau <span className="text-orange-500 cursor-pointer">Pilih File</span></p>
                    <p className="text-xs text-gray-400 mt-1">*Fitur unggah foto akan segera tersedia</p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("list");
                      setActiveProperty({
                        id: "",
                        title: "",
                        type: "ready_to_occupy",
                        price: "",
                        location: "",
                        description: "",
                        status: "available"
                      });
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
                        Simpan Perubahan
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

export default PropertyManagement;

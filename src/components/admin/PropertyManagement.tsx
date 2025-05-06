
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import PropertyForm from "@/components/admin/PropertyForm";
import PropertyDetail from "@/components/admin/PropertyDetail";
import { 
  Search, Plus, Edit, Trash2, Eye, 
  Home, Building, Castle, X, AlertCircle, Loader2 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";

const PropertyManagement = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Setup real-time sync untuk tabel properties
  const { isSubscribed } = useRealTimeSync('properties', fetchProperties);
  
  // Fungsi untuk memuat daftar properti
  async function fetchProperties() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setProperties(data);
      }
      
      setError(null);
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      setError(err.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }

  // Load data saat komponen mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle pencarian properti
  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle membuka modal untuk membuat properti baru
  const handleCreateProperty = () => {
    setSelectedProperty(null);
    setModalMode('create');
    setIsModalOpen(true);
  };
  
  // Handle membuka modal untuk mengedit properti
  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  // Handle membuka modal untuk melihat detail properti
  const handleViewProperty = (property: any) => {
    setSelectedProperty(property);
    setModalMode('view');
    setIsModalOpen(true);
  };
  
  // Handle menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProperty(null);
      setModalMode('create');
    }, 200);
  };
  
  // Handle submit form properti (create / edit)
  const handleSubmitProperty = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      if (modalMode === 'edit' && selectedProperty?.id) {
        // Update properti yang sudah ada
        const { error } = await supabase
          .from('properties')
          .update({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            address: formData.address,
            land_size: formData.land_size,
            building_size: formData.building_size,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            category: formData.category,
            status: formData.status,
            featured: formData.featured,
            images: formData.images,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedProperty.id);
          
        if (error) throw error;
        
        toast({
          title: "Properti diperbarui",
          description: "Properti telah berhasil diperbarui",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
      } else {
        // Buat properti baru
        const { error } = await supabase
          .from('properties')
          .insert({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            address: formData.address,
            land_size: formData.land_size,
            building_size: formData.building_size,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            category: formData.category,
            status: formData.status,
            featured: formData.featured,
            images: formData.images
          });
          
        if (error) throw error;
        
        toast({
          title: "Properti baru ditambahkan",
          description: "Properti baru telah berhasil ditambahkan",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
      }
      
      // Reload data dan tutup modal
      await fetchProperties();
      handleCloseModal();
    } catch (err: any) {
      console.error("Error saving property:", err);
      toast({
        title: "Gagal menyimpan properti",
        description: err.message || "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle hapus properti
  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus properti ini?")) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      await fetchProperties();
      
      toast({
        title: "Properti dihapus",
        description: "Properti telah berhasil dihapus",
        className: "bg-gray-900 text-white",
      });
    } catch (err: any) {
      console.error("Error deleting property:", err);
      toast({
        title: "Gagal menghapus properti",
        description: err.message || "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      });
    }
  };
  
  // Render status properti dengan warna yang sesuai
  const renderStatus = (status: string) => {
    switch(status) {
      case 'available':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Tersedia
          </Badge>
        );
      case 'sold':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Terjual
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };
  
  // Render kategori properti dengan icon
  const renderCategory = (category: string) => {
    switch(category) {
      case 'empty_lot':
        return (
          <div className="flex items-center">
            <Home className="mr-2 h-4 w-4 text-blue-500" />
            <span>Kavling Kosongan</span>
          </div>
        );
      case 'semi_finished':
        return (
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Kavling Bangunan</span>
          </div>
        );
      case 'ready_to_occupy':
        return (
          <div className="flex items-center">
            <Castle className="mr-2 h-4 w-4 text-green-500" />
            <span>Kavling Siap Huni</span>
          </div>
        );
      default:
        return category;
    }
  };
  
  // Komponen untuk modal form properti
  const renderPropertyModal = () => {
    if (!isModalOpen) return null;
    
    if (modalMode === 'view' && selectedProperty) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Detail Properti</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <PropertyDetail property={selectedProperty} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {modalMode === 'create' ? 'Tambah Properti Baru' : 'Edit Properti'}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <PropertyForm
                property={selectedProperty || undefined}
                onSubmit={handleSubmitProperty}
                onCancel={handleCloseModal}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-6 p-6">
      {/* Header dan Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Kelola Properti</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari properti..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
            onClick={handleCreateProperty}
          >
            <Plus size={16} className="mr-2" />
            Tambah Properti
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Daftar Properti</CardTitle>
          <CardDescription>
            Kelola semua properti yang ditampilkan di website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Memuat data properti...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Gagal memuat data</h3>
                <p className="text-red-700 text-sm">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={fetchProperties}
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="rounded-md border overflow-hidden mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Properti</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                            {property.images && property.images.length > 0 ? (
                              <img 
                                src={property.images[0]} 
                                alt={property.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                                <Home className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-xs text-gray-500">
                              {property.land_size && `${property.land_size} m² • `}
                              {property.bedrooms && `${property.bedrooms} kamar • `}
                              {property.featured && <span className="text-amber-500">Unggulan</span>}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>{renderCategory(property.category)}</TableCell>
                      <TableCell>Rp {formatCurrency(property.price)}</TableCell>
                      <TableCell>{renderStatus(property.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewProperty(property)}
                          >
                            <Eye size={14} className="mr-1" />
                            Lihat
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProperty(property)}
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteProperty(property.id)}
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm 
                ? "Tidak ada properti yang sesuai dengan pencarian" 
                : "Belum ada properti yang ditambahkan"}
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
      
      {/* Modal properti */}
      {renderPropertyModal()}
    </div>
  );
};

export default PropertyManagement;

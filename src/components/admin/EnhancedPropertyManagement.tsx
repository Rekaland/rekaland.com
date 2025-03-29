
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, Plus, Edit, Trash2, Eye, Upload, 
  MapPin, DollarSign, Home, Tag
} from "lucide-react";
import { toast } from "sonner";

// Mock data for property listings
const mockProperties = [
  { 
    id: 1, 
    title: 'Kavling Siap Bangun Citra Garden', 
    type: 'empty-lot',
    status: 'available', 
    price: 450000000, 
    location: 'Citra Garden, Jakarta Barat', 
    area: 120,
    featured: true,
    createdAt: '2023-08-12'
  },
  { 
    id: 2, 
    title: 'Hunian Siap Huni Sentul City', 
    type: 'ready-to-occupy',
    status: 'available', 
    price: 1250000000, 
    location: 'Sentul City, Bogor', 
    area: 150,
    featured: true,
    createdAt: '2023-07-15'
  },
  { 
    id: 3, 
    title: 'Kavling Setengah Jadi BSD', 
    type: 'semi-finished',
    status: 'pending', 
    price: 750000000, 
    location: 'BSD City, Tangerang', 
    area: 135,
    featured: false,
    createdAt: '2023-08-10'
  },
  { 
    id: 4, 
    title: 'Rumah Tipe 36 Serpong', 
    type: 'ready-to-occupy',
    status: 'sold', 
    price: 550000000, 
    location: 'Serpong, Tangerang Selatan', 
    area: 90,
    featured: false,
    createdAt: '2023-06-20'
  },
  { 
    id: 5, 
    title: 'Kavling Premium Lokasi Strategis', 
    type: 'empty-lot',
    status: 'available', 
    price: 850000000, 
    location: 'Alam Sutera, Tangerang', 
    area: 200,
    featured: true,
    createdAt: '2023-08-18'
  },
];

// Property categories
const propertyCategories = [
  { id: 1, name: 'Kavling Siap Bangun', slug: 'empty-lot', count: 24 },
  { id: 2, name: 'Kavling Setengah Jadi', slug: 'semi-finished', count: 15 },
  { id: 3, name: 'Hunian Siap Huni', slug: 'ready-to-occupy', count: 32 },
];

// Locations
const locations = [
  { id: 1, name: 'Jakarta', count: 28 },
  { id: 2, name: 'Bogor', count: 13 },
  { id: 3, name: 'Tangerang', count: 21 },
  { id: 4, name: 'Bekasi', count: 9 },
  { id: 5, name: 'Depok', count: 6 },
];

const statusColors = {
  available: "bg-green-100 text-green-800",
  sold: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  reserved: "bg-blue-100 text-blue-800"
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const EnhancedPropertyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const openPropertyEditor = (property = null) => {
    setCurrentProperty(property);
    setIsAddDialogOpen(true);
  };
  
  const handleSave = () => {
    toast.success("Properti berhasil disimpan!");
    setIsAddDialogOpen(false);
  };
  
  const handleDelete = (id) => {
    toast.success("Properti berhasil dihapus!");
  };
  
  const handlePreview = (id) => {
    toast.info("Membuka pratinjau properti dalam tab baru...");
  };
  
  const renderStatusBadge = (status) => {
    return (
      <Badge variant="outline" className={statusColors[status]}>
        {status === 'available' && 'Tersedia'}
        {status === 'sold' && 'Terjual'}
        {status === 'pending' && 'Tertahan'}
        {status === 'reserved' && 'Dipesan'}
      </Badge>
    );
  };

  const renderPropertyType = (type) => {
    switch(type) {
      case 'empty-lot':
        return 'Kavling Siap Bangun';
      case 'semi-finished':
        return 'Kavling Setengah Jadi';
      case 'ready-to-occupy':
        return 'Hunian Siap Huni';
      default:
        return type;
    }
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="listings" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="listings">Properti</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="locations">Lokasi</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari properti..."
                className="pl-8 w-full md:w-[200px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {activeTab === "listings" && (
              <>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="sold">Terjual</SelectItem>
                    <SelectItem value="pending">Tertahan</SelectItem>
                    <SelectItem value="reserved">Dipesan</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[170px]">
                    <SelectValue placeholder="Tipe Properti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="empty-lot">Kavling Siap Bangun</SelectItem>
                    <SelectItem value="semi-finished">Kavling Setengah Jadi</SelectItem>
                    <SelectItem value="ready-to-occupy">Hunian Siap Huni</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  Tambah {activeTab === "listings" ? "Properti" : 
                          activeTab === "categories" ? "Kategori" : 
                          "Lokasi"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {currentProperty ? "Edit" : "Tambah"} Properti
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nama Properti</label>
                      <Input placeholder="Masukkan nama properti" defaultValue={currentProperty?.title || ''} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tipe Properti</label>
                      <Select defaultValue={currentProperty?.type || "empty-lot"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empty-lot">Kavling Siap Bangun</SelectItem>
                          <SelectItem value="semi-finished">Kavling Setengah Jadi</SelectItem>
                          <SelectItem value="ready-to-occupy">Hunian Siap Huni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Harga (IDR)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Masukkan harga" 
                          className="pl-8" 
                          defaultValue={currentProperty?.price || ''} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Status</label>
                      <Select defaultValue={currentProperty?.status || "available"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Tersedia</SelectItem>
                          <SelectItem value="sold">Terjual</SelectItem>
                          <SelectItem value="pending">Tertahan</SelectItem>
                          <SelectItem value="reserved">Dipesan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Lokasi</label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Masukkan lokasi properti" 
                          className="pl-8" 
                          defaultValue={currentProperty?.location || ''} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Luas (m²)</label>
                      <Input 
                        placeholder="Masukkan luas lahan" 
                        defaultValue={currentProperty?.area || ''} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Deskripsi</label>
                    <Textarea 
                      placeholder="Masukkan deskripsi properti" 
                      className="min-h-[100px]" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Foto Properti</label>
                      <div className="border border-dashed rounded-md p-6 text-center">
                        <Upload className="h-6 w-6 mx-auto text-gray-400" />
                        <p className="text-sm mt-2">Klik untuk unggah atau seret file ke sini</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="featured" defaultChecked={currentProperty?.featured || false} />
                        <label htmlFor="featured" className="text-sm font-medium">
                          Tandai sebagai properti unggulan
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="promoted" />
                        <label htmlFor="promoted" className="text-sm font-medium">
                          Aktifkan promosi khusus
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="show_map" />
                        <label htmlFor="show_map" className="text-sm font-medium">
                          Tampilkan peta lokasi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleSave}>
                    Simpan Properti
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="listings" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Properti</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProperties
                .filter(property => 
                  (statusFilter === "all" || property.status === statusFilter) &&
                  (typeFilter === "all" || property.type === typeFilter) &&
                  (property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   searchTerm === "")
                )
                .map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {property.featured && (
                          <Badge variant="secondary" className="mr-2">Unggulan</Badge>
                        )}
                        {property.title}
                      </div>
                    </TableCell>
                    <TableCell>{renderPropertyType(property.type)}</TableCell>
                    <TableCell>{formatPrice(property.price)}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{renderStatusBadge(property.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(property.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openPropertyEditor(property)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Jumlah Properti</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertyCategories
                .filter(category => 
                  category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  searchTerm === ""
                )
                .map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.count} properti</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="locations" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lokasi</TableHead>
                <TableHead>Jumlah Properti</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations
                .filter(location => 
                  location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  searchTerm === ""
                )
                .map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {location.name}
                      </div>
                    </TableCell>
                    <TableCell>{location.count} properti</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedPropertyManagement;

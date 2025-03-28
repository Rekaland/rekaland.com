
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Upload, Save, Eye, FileText, Plus, Search, Filter } from "lucide-react";

const PropertyManagement = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState([
    { id: 1, title: "Vila Asri Bali", type: "Siap Huni", price: "Rp 1,2 M", status: "Aktif", views: 432 },
    { id: 2, title: "Kavling Premium Jakarta", type: "Kavling Kosongan", price: "Rp 800 Jt", status: "Aktif", views: 289 },
    { id: 3, title: "Rumah Type 45 Bandung", type: "Setengah Jadi", price: "Rp 500 Jt", status: "Aktif", views: 187 },
    { id: 4, title: "Apartemen Mewah Surabaya", type: "Siap Huni", price: "Rp 900 Jt", status: "Draft", views: 0 },
    { id: 5, title: "Kavling Strategis Yogyakarta", type: "Kavling Kosongan", price: "Rp 350 Jt", status: "Aktif", views: 145 }
  ]);
  
  const [activeProperty, setActiveProperty] = useState({
    id: 1,
    title: "Vila Asri Bali",
    type: "Siap Huni",
    price: "1200000000",
    location: "Bali",
    description: "Vila mewah di kawasan asri Bali dengan pemandangan sawah dan pegunungan. Dilengkapi dengan kolam renang pribadi dan berjarak 15 menit dari pantai."
  });

  const handleSaveProperty = () => {
    toast({
      title: "Properti tersimpan!",
      description: "Perubahan pada properti berhasil disimpan",
      duration: 1000,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleEditProperty = (id: number) => {
    // In a real app, this would fetch the property data
    const property = properties.find(p => p.id === id);
    toast({
      title: "Mengedit properti",
      description: `Membuka properti: ${property?.title}`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleDeleteProperty = (id: number) => {
    // In a real app, this would delete the property
    toast({
      title: "Menghapus properti",
      description: "Properti berhasil dihapus",
      duration: 1000,
      className: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
    setProperties(properties.filter(p => p.id !== id));
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Kelola Properti</h2>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
          <Plus size={16} className="mr-2" />
          Tambah Properti Baru
        </Button>
      </div>

      <Tabs defaultValue="list">
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
              <div className="rounded-md border overflow-hidden mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Properti</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map(property => (
                      <TableRow key={property.id} className="hover:bg-gray-50">
                        <TableCell>{property.id}</TableCell>
                        <TableCell>{property.title}</TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{property.price}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${property.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>{property.views}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Detail Properti</CardTitle>
              <CardDescription>Kelola informasi properti</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property-name">Nama Properti</Label>
                    <Input 
                      id="property-name" 
                      value={activeProperty.title}
                      onChange={(e) => setActiveProperty({...activeProperty, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-type">Tipe Properti</Label>
                    <select 
                      id="property-type" 
                      className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md"
                      value={activeProperty.type === "Siap Huni" ? "siap-huni" : 
                            activeProperty.type === "Setengah Jadi" ? "setengah-jadi" : "kavling"}
                      onChange={(e) => setActiveProperty({
                        ...activeProperty, 
                        type: e.target.value === "siap-huni" ? "Siap Huni" : 
                             e.target.value === "setengah-jadi" ? "Setengah Jadi" : "Kavling Kosongan"
                      })}
                    >
                      <option value="siap-huni">Siap Huni</option>
                      <option value="setengah-jadi">Setengah Jadi</option>
                      <option value="kavling">Kavling Kosongan</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="property-price">Harga (Rp)</Label>
                    <Input 
                      id="property-price" 
                      value={activeProperty.price}
                      onChange={(e) => setActiveProperty({...activeProperty, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-location">Lokasi</Label>
                    <Input 
                      id="property-location" 
                      value={activeProperty.location}
                      onChange={(e) => setActiveProperty({...activeProperty, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="property-description">Deskripsi</Label>
                  <Textarea 
                    id="property-description" 
                    rows={5}
                    value={activeProperty.description}
                    onChange={(e) => setActiveProperty({...activeProperty, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Foto Properti</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 mt-2 text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Drag & drop foto properti di sini, atau <span className="text-orange-500 cursor-pointer">Pilih File</span></p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Perubahan dibatalkan",
                        description: "Perubahan pada properti telah dibatalkan",
                        duration: 1000,
                        className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
                      });
                    }}
                  >
                    Batal
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveProperty();
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save size={16} className="mr-2" />
                    Simpan Perubahan
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

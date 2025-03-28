
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Upload } from "lucide-react";
import { Plus } from "@/components/admin/Icons";

const PropertyManagement = () => {
  const [properties] = useState([
    { id: 1, title: "Vila Asri Bali", type: "Siap Huni", price: "Rp 1,2 M", status: "Aktif", views: 432 },
    { id: 2, title: "Kavling Premium Jakarta", type: "Kavling Kosongan", price: "Rp 800 Jt", status: "Aktif", views: 289 },
    { id: 3, title: "Rumah Type 45 Bandung", type: "Setengah Jadi", price: "Rp 500 Jt", status: "Aktif", views: 187 },
    { id: 4, title: "Apartemen Mewah Surabaya", type: "Siap Huni", price: "Rp 900 Jt", status: "Draft", views: 0 },
    { id: 5, title: "Kavling Strategis Yogyakarta", type: "Kavling Kosongan", price: "Rp 350 Jt", status: "Aktif", views: 145 }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Kelola Properti</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Tambah Properti Baru
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow mb-6">
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
                    <Button variant="outline" size="sm">
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">Hapus</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Properti</CardTitle>
          <CardDescription>Kelola informasi properti</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property-name">Nama Properti</Label>
                <Input id="property-name" defaultValue="Vila Asri Bali" />
              </div>
              <div>
                <Label htmlFor="property-type">Tipe Properti</Label>
                <select id="property-type" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                  <option value="siap-huni">Siap Huni</option>
                  <option value="setengah-jadi">Setengah Jadi</option>
                  <option value="kavling">Kavling Kosongan</option>
                </select>
              </div>
              <div>
                <Label htmlFor="property-price">Harga</Label>
                <Input id="property-price" defaultValue="1200000000" />
              </div>
              <div>
                <Label htmlFor="property-location">Lokasi</Label>
                <Input id="property-location" defaultValue="Bali" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="property-description">Deskripsi</Label>
              <Textarea 
                id="property-description" 
                rows={5}
                defaultValue="Vila mewah di kawasan asri Bali dengan pemandangan sawah dan pegunungan. Dilengkapi dengan kolam renang pribadi dan berjarak 15 menit dari pantai."
              />
            </div>

            <div>
              <Label>Foto Properti</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-md p-6 mt-2 text-center">
                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Drag & drop foto properti di sini, atau <span className="text-rekaland-orange">Pilih File</span></p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Batal</Button>
              <Button>Simpan Perubahan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagement;

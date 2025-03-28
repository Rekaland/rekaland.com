
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // If not authenticated or not admin, don't render anything
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="properties">Properti</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <PropertyManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const PropertyManagement = () => {
  const [properties] = useState([
    { id: 1, title: "Vila Asri Bali", type: "Siap Huni", price: "Rp 1,2 M" },
    { id: 2, title: "Kavling Premium Jakarta", type: "Kavling Kosongan", price: "Rp 800 Jt" },
    { id: 3, title: "Rumah Type 45 Bandung", type: "Setengah Jadi", price: "Rp 500 Jt" }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Kelola Properti</h2>
        <Button>Tambah Properti Baru</Button>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama Properti</th>
              <th className="px-4 py-3 text-left">Tipe</th>
              <th className="px-4 py-3 text-left">Harga</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{property.id}</td>
                <td className="px-4 py-3">{property.title}</td>
                <td className="px-4 py-3">{property.type}</td>
                <td className="px-4 py-3">{property.price}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@example.com", role: "user" },
    { id: 2, name: "Admin User", email: "gueadmin", role: "admin" },
    { id: 3, name: "Siti Nurbaya", email: "siti@example.com", role: "user" }
  ]);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Kelola Pengguna</h2>
      
      <div className="bg-white rounded-md shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SettingsManagement = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Pengaturan Website</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informasi Website</CardTitle>
          <CardDescription>Ubah informasi umum tentang website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-title">Judul Website</Label>
              <Input id="site-title" defaultValue="REKALAND - Solusi Properti Anda" />
            </div>
            <div>
              <Label htmlFor="site-desc">Deskripsi</Label>
              <Textarea id="site-desc" defaultValue="REKALAND adalah solusi properti terbaik untuk keluarga Indonesia" />
            </div>
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Kontak & Media Sosial</CardTitle>
          <CardDescription>Kelola informasi kontak dan tautan media sosial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="info@rekaland.com" />
            </div>
            <div>
              <Label htmlFor="phone">Telepon</Label>
              <Input id="phone" defaultValue="021-123456" />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" defaultValue="@rekaland_id" />
            </div>
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;

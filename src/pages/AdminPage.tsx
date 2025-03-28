
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
import { 
  BarChart, 
  LineChart,
  Pencil, 
  Save, 
  Upload, 
  Users, 
  Home, 
  FileText, 
  Settings, 
  Database, 
  Globe, 
  ShoppingCart,
  Eye,
  Clock,
  ArrowUpRight,
  Activity
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="mb-6 flex flex-wrap bg-white p-1 border rounded-md">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-100">
              <Activity size={16} className="mr-2" />
              Analisis
            </TabsTrigger>
            <TabsTrigger value="properties" className="data-[state=active]:bg-gray-100">
              <Home size={16} className="mr-2" />
              Properti
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-100">
              <Users size={16} className="mr-2" />
              Pengguna
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-100">
              <FileText size={16} className="mr-2" />
              Konten
            </TabsTrigger>
            <TabsTrigger value="editor" className="data-[state=active]:bg-gray-100">
              <Pencil size={16} className="mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-gray-100">
              <ShoppingCart size={16} className="mr-2" />
              Penjualan
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100">
              <Settings size={16} className="mr-2" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="properties">
            <PropertyManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="editor">
            <WebsiteEditor />
          </TabsContent>

          <TabsContent value="sales">
            <SalesManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState("week");
  const [stats] = useState({
    totalVisitors: "12,456",
    pageViews: "45,893",
    conversionRate: "3.2%",
    avgTimeOnSite: "4:23",
    popularPages: [
      { page: "Beranda", views: 8324 },
      { page: "Produk - Siap Huni", views: 5621 },
      { page: "Informasi", views: 3254 },
      { page: "Tentang", views: 2109 },
      { page: "Produk - Kavling", views: 1875 },
    ],
    traffic: [
      { source: "Organic Search", percentage: "45%" },
      { source: "Direct", percentage: "23%" },
      { source: "Social Media", percentage: "18%" },
      { source: "Referral", percentage: "10%" },
      { source: "Other", percentage: "4%" },
    ]
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analisis Website</h2>
        <div className="flex gap-2">
          <Button 
            variant={period === "day" ? "default" : "outline"} 
            size="sm"
            onClick={() => setPeriod("day")}
          >
            Hari Ini
          </Button>
          <Button 
            variant={period === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setPeriod("week")}
          >
            Minggu Ini
          </Button>
          <Button 
            variant={period === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setPeriod("month")}
          >
            Bulan Ini
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Pengunjung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" />
              +12.5% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pageViews}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" />
              +8.3% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" />
              +1.2% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Time on Site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTimeOnSite}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" />
              +0:42 dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Grafik Pengunjung</CardTitle>
            <CardDescription>Jumlah pengunjung per hari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
              <LineChart className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Grafik Pengunjung Harian</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performa Halaman</CardTitle>
            <CardDescription>Halaman paling populer</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Halaman</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.popularPages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell>{page.page}</TableCell>
                    <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sumber Traffic</CardTitle>
            <CardDescription>Dari mana pengunjung website berasal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
              <BarChart className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Grafik Sumber Traffic</span>
            </div>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Sumber</TableHead>
                  <TableHead className="text-right">Persentase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.traffic.map((source, index) => (
                  <TableRow key={index}>
                    <TableCell>{source.source}</TableCell>
                    <TableCell className="text-right">{source.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Real-time</CardTitle>
            <CardDescription>Pengunjung aktif saat ini: 42</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <Eye size={16} className="text-gray-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm">Pengunjung melihat halaman <span className="font-medium">Produk - Siap Huni</span></p>
                  <p className="text-xs text-gray-500">Dari Jakarta, 24 detik yang lalu</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <Clock size={16} className="text-gray-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm">Pengunjung menghabiskan <span className="font-medium">5 menit</span> di halaman Beranda</p>
                  <p className="text-xs text-gray-500">Dari Surabaya, 2 menit yang lalu</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <ShoppingCart size={16} className="text-gray-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm">Pengunjung menambahkan properti ke <span className="font-medium">keranjang</span></p>
                  <p className="text-xs text-gray-500">Dari Bandung, 4 menit yang lalu</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <Users size={16} className="text-gray-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm">Pengguna baru <span className="font-medium">mendaftar</span></p>
                  <p className="text-xs text-gray-500">Dari Medan, 10 menit yang lalu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@example.com", role: "user", status: "Active", joined: "12 Apr 2023", transactions: 3 },
    { id: 2, name: "Admin User", email: "gueadmin", role: "admin", status: "Active", joined: "5 Jan 2023", transactions: 0 },
    { id: 3, name: "Siti Nurbaya", email: "siti@example.com", role: "user", status: "Active", joined: "23 May 2023", transactions: 1 },
    { id: 4, name: "Ahmad Hidayat", email: "ahmad@example.com", role: "user", status: "Inactive", joined: "7 Jun 2023", transactions: 0 },
    { id: 5, name: "Linda Wijaya", email: "linda@example.com", role: "user", status: "Active", joined: "19 Mar 2023", transactions: 2 }
  ]);
  
  const [transactionHistory] = useState([
    { id: 1, user: "Budi Santoso", property: "Vila Asri Bali", amount: "Rp 1,2 M", date: "15 Apr 2023", status: "Completed" },
    { id: 2, user: "Siti Nurbaya", property: "Kavling Premium Jakarta", amount: "Rp 800 Jt", date: "25 May 2023", status: "Processing" },
    { id: 3, user: "Budi Santoso", property: "Rumah Type 45 Bandung", amount: "Rp 500 Jt", date: "3 Jun 2023", status: "Completed" },
    { id: 4, user: "Linda Wijaya", property: "Kavling Strategis Yogyakarta", amount: "Rp 350 Jt", date: "22 Mar 2023", status: "Completed" },
    { id: 5, user: "Linda Wijaya", property: "Apartemen Mewah Surabaya", amount: "Rp 900 Jt", date: "8 Apr 2023", status: "Cancelled" },
    { id: 6, user: "Budi Santoso", property: "Rumah Minimalis Jakarta", amount: "Rp 750 Jt", date: "17 Jun 2023", status: "Processing" }
  ]);
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Kelola Pengguna</h2>
        
        <div className="bg-white rounded-md shadow mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead>Transaksi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.transactions}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Hapus</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h3 className="text-lg font-semibold mb-4">Riwayat Transaksi</h3>
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Properti</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map(transaction => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.property}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detail</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const ContentManagement = () => {
  const [pages] = useState([
    { id: 1, title: "Beranda", slug: "/", lastEdited: "12 Jun 2023", status: "Published" },
    { id: 2, title: "Tentang Kami", slug: "/tentang", lastEdited: "5 Jun 2023", status: "Published" },
    { id: 3, title: "Produk", slug: "/produk", lastEdited: "8 Jun 2023", status: "Published" },
    { id: 4, title: "Kavling Kosongan", slug: "/produk/kavling-kosongan", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 5, title: "Kavling Setengah Jadi", slug: "/produk/kavling-setengah-jadi", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 6, title: "Kavling Siap Huni", slug: "/produk/kavling-siap-huni", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 7, title: "Informasi", slug: "/informasi", lastEdited: "7 Jun 2023", status: "Published" }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Tambah Halaman Baru
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page.id} className="hover:bg-gray-50">
                <TableCell>{page.id}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.lastEdited}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {page.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye size={14} className="mr-1" />
                      Lihat
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Konten</CardTitle>
          <CardDescription>Sunting halaman website</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="page-title">Judul Halaman</Label>
              <Input id="page-title" defaultValue="Beranda" />
            </div>
            
            <div>
              <Label htmlFor="page-slug">URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
                  example.com/
                </span>
                <Input id="page-slug" className="rounded-l-none" defaultValue="" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="page-content">Konten</Label>
              <Textarea id="page-content" rows={10} defaultValue="Selamat datang di REKALAND, solusi properti terbaik untuk keluarga Indonesia. Kami menyediakan berbagai pilihan properti mulai dari kavling kosongan, setengah jadi, hingga siap huni dengan harga kompetitif dan lokasi strategis." />
            </div>
            
            <div>
              <Label>SEO Meta Description</Label>
              <Textarea rows={3} defaultValue="REKALAND - Solusi properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau." />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Batal</Button>
              <Button>Simpan & Publikasikan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const WebsiteEditor = () => {
  const [changeHistory] = useState([
    { id: 1, page: "Beranda", user: "Admin User", timestamp: "12 Jun 2023 09:15", type: "Konten Update" },
    { id: 2, page: "Tentang Kami", user: "Admin User", timestamp: "10 Jun 2023 14:30", type: "Layout Update" },
    { id: 3, page: "Produk", user: "Admin User", timestamp: "8 Jun 2023 11:20", type: "Konten Update" },
    { id: 4, page: "Beranda", user: "Admin User", timestamp: "5 Jun 2023 16:45", type: "Gambar Update" },
    { id: 5, page: "Informasi", user: "Admin User", timestamp: "3 Jun 2023 10:05", type: "Konten Update" }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Editor Website</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button>
            <Globe size={16} className="mr-2" />
            Publikasikan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Visual Editor</CardTitle>
              <CardDescription>Sunting tampilan website dengan drag and drop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-md p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Pencil className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Editor Visual sedang dimuat...</p>
                  <Button className="mt-4">Masuk ke Editor</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Editor Kode</CardTitle>
              <CardDescription>Sunting kode HTML, CSS, dan JavaScript</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-md h-60 overflow-auto">
                <pre>{`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REKALAND - Solusi Properti Anda</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header>
    <nav>
      <!-- Navigasi -->
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h1>REKALAND</h1>
      <p>Solusi properti terbaik untuk keluarga Indonesia</p>
      <button>Jelajahi Sekarang</button>
    </section>
    
    <!-- Konten lainnya -->
  </main>
  
  <footer>
    <!-- Footer -->
  </footer>
</body>
</html>`}</pre>
              </div>
              <div className="flex justify-end mt-4">
                <Button>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Opsi Publikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="publish-status">Status</Label>
                  <select id="publish-status" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="publish-date">Tanggal Publikasi</Label>
                  <Input id="publish-date" type="datetime-local" />
                </div>
                <Button className="w-full">Publikasikan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Perubahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {changeHistory.map(change => (
                  <div key={change.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{change.page}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{change.type}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">{change.user}</span>
                      <span className="text-gray-500">{change.timestamp}</span>
                    </div>
                    <div className="flex mt-2">
                      <Button variant="outline" size="sm" className="text-xs">Lihat Perubahan</Button>
                      <Button variant="ghost" size="sm" className="text-xs ml-2">Kembalikan</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SalesManagement = () => {
  const [salesData] = useState({
    totalSales: "Rp 4,5 M",
    monthlyTarget: "Rp 5 M",
    completionRate: "90%",
    topProperties: [
      { id: 1, title: "Vila Asri Bali", sales: "Rp 2,4 M", units: 2 },
      { id: 2, title: "Kavling Premium Jakarta", sales: "Rp 1,6 M", units: 2 },
      { id: 3, title: "Rumah Type 45 Bandung", sales: "Rp 500 Jt", units: 1 }
    ],
    monthlySales: [
      { month: "Jan", amount: "Rp 750 Jt" },
      { month: "Feb", amount: "Rp 520 Jt" },
      { month: "Mar", amount: "Rp 680 Jt" },
      { month: "Apr", amount: "Rp 920 Jt" },
      { month: "May", amount: "Rp 780 Jt" },
      { month: "Jun", amount: "Rp 850 Jt" }
    ]
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manajemen Penjualan</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Tambah Transaksi
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.totalSales}</div>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-rekaland-orange rounded-full" style={{width: salesData.completionRate}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{salesData.completionRate} dari target {salesData.monthlyTarget}</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Penjualan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-16 flex items-end justify-between">
              {salesData.monthlySales.map((month, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 bg-rekaland-orange rounded-t" style={{height: `${20 + Math.random() * 40}px`}}></div>
                  <span className="text-xs mt-1">{month.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Properti Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Properti</TableHead>
                  <TableHead>Total Penjualan</TableHead>
                  <TableHead>Unit Terjual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.topProperties.map(property => (
                  <TableRow key={property.id}>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.sales}</TableCell>
                    <TableCell>{property.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tambah Transaksi Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="customer">Pelanggan</Label>
                <select id="customer" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                  <option value="">Pilih Pelanggan</option>
                  <option value="1">Budi Santoso</option>
                  <option value="3">Siti Nurbaya</option>
                  <option value="4">Ahmad Hidayat</option>
                  <option value="5">Linda Wijaya</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="property">Properti</Label>
                <select id="property" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                  <option value="">Pilih Properti</option>
                  <option value="1">Vila Asri Bali</option>
                  <option value="2">Kavling Premium Jakarta</option>
                  <option value="3">Rumah Type 45 Bandung</option>
                  <option value="4">Apartemen Mewah Surabaya</option>
                  <option value="5">Kavling Strategis Yogyakarta</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="amount">Jumlah Transaksi</Label>
                <Input id="amount" placeholder="Rp" />
              </div>
              
              <div>
                <Label htmlFor="date">Tanggal Transaksi</Label>
                <Input id="date" type="date" />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <Button className="w-full">Simpan Transaksi</Button>
            </form>
          </CardContent>
        </Card>
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
            <div>
              <Label htmlFor="site-keywords">Keywords</Label>
              <Input id="site-keywords" defaultValue="properti, kavling, rumah, investasi, tanah" />
            </div>
            <div>
              <Label htmlFor="site-favicon">Favicon</Label>
              <div className="flex items-center mt-2">
                <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                  <img src="/favicon.ico" alt="Favicon" className="h-6 w-6" />
                </div>
                <Button variant="outline" size="sm">Ganti Favicon</Button>
              </div>
            </div>
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
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
              <Label htmlFor="address">Alamat</Label>
              <Textarea id="address" defaultValue="Jl. Properti No. 123, Jakarta 12345, Indonesia" />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" defaultValue="@rekaland_id" />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" defaultValue="facebook.com/rekaland" />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" defaultValue="+62812345678" />
            </div>
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Sistem</CardTitle>
          <CardDescription>Konfigurasi sistem dan keamanan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode Maintenance</p>
                <p className="text-sm text-gray-500">Mengaktifkan mode maintenance akan menonaktifkan akses publik</p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" id="maintenance-mode" className="h-4 w-4 rounded border-gray-300" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Aktifkan Backup Otomatis</p>
                <p className="text-sm text-gray-500">Backup database secara otomatis setiap hari</p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" id="auto-backup" className="h-4 w-4 rounded border-gray-300" checked />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode Debug</p>
                <p className="text-sm text-gray-500">Aktifkan mode debug untuk pengembangan</p>
              </div>
              <div className="flex items-center h-6">
                <input type="checkbox" id="debug-mode" className="h-4 w-4 rounded border-gray-300" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cache-time">Waktu Cache (menit)</Label>
              <Input id="cache-time" type="number" defaultValue="60" />
            </div>
            
            <Button>Simpan Pengaturan Sistem</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Missing component for the Plus icon
const Plus = ({ size = 24, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export default AdminPage;

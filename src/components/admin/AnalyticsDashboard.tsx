
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  BarChart,
  LineChart,
  Eye,
  Clock,
  ShoppingCart,
  Users,
  ArrowUpRight
} from "lucide-react";

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

export default AnalyticsDashboard;

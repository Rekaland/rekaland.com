
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "@/components/admin/Icons";

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

export default SalesManagement;

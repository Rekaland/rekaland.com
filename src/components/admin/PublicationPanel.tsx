import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Globe, 
  History, 
  Clock, 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  FileText
} from "lucide-react";

const PublicationPanel = () => {
  const { toast } = useToast();
  const [deploymentHistory] = useState([
    { id: 1, version: "v1.2.3", timestamp: "15 Jun 2023 13:45", status: "Sukses", author: "Admin User", changes: 15 },
    { id: 2, version: "v1.2.2", timestamp: "10 Jun 2023 09:20", status: "Sukses", author: "Admin User", changes: 8 },
    { id: 3, version: "v1.2.1", timestamp: "5 Jun 2023 14:30", status: "Gagal", author: "Admin User", changes: 12 },
    { id: 4, version: "v1.2.0", timestamp: "1 Jun 2023 10:15", status: "Sukses", author: "Admin User", changes: 23 },
  ]);

  const handlePublish = () => {
    toast({
      title: "Memulai publikasi website",
      description: "Website sedang dalam proses publikasi",
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
    
    // Simulate publication process
    setTimeout(() => {
      toast({
        title: "Publikasi Berhasil!",
        description: "Website telah berhasil dipublikasikan",
        duration: 1000,
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Publikasi Website</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Preview dibuka",
                description: "Membuka preview website di tab baru",
                duration: 1000,
                className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
              });
            }}
          >
            <Eye size={16} />
            Preview
          </Button>
          <Button 
            onClick={handlePublish}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
          >
            <Globe size={16} />
            Publikasikan Sekarang
          </Button>
        </div>
      </div>

      <Tabs defaultValue="deployment">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="deployment">Status Deployment</TabsTrigger>
          <TabsTrigger value="history">Riwayat Perubahan</TabsTrigger>
          <TabsTrigger value="connection">Koneksi Supabase</TabsTrigger>
        </TabsList>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Status Deployment Terkini</CardTitle>
              <CardDescription>Informasi mengenai deployment website saat ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={24} />
                  <div>
                    <p className="font-medium">Website Online</p>
                    <p className="text-sm text-gray-600">Terakhir dipublikasikan: 15 Jun 2023 13:45</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 border p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Domain</p>
                    <p className="font-medium">rekaland.com</p>
                  </div>
                  <div className="bg-gray-50 border p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Versi</p>
                    <p className="font-medium">v1.2.3</p>
                  </div>
                  <div className="bg-gray-50 border p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Lingkungan</p>
                    <p className="font-medium">Production</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Riwayat Deployment</CardTitle>
              <CardDescription>Daftar deployment terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left">Versi</th>
                      <th className="py-3 px-2 text-left">Waktu</th>
                      <th className="py-3 px-2 text-left">Status</th>
                      <th className="py-3 px-2 text-left">Penulis</th>
                      <th className="py-3 px-2 text-left">Perubahan</th>
                      <th className="py-3 px-2 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deploymentHistory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{item.version}</td>
                        <td className="py-3 px-2">{item.timestamp}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "Sukses" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">{item.author}</td>
                        <td className="py-3 px-2">{item.changes} perubahan</td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                            <RefreshCw size={14} className="mr-1" />
                            Rollback
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Perubahan</CardTitle>
              <CardDescription>Daftar perubahan yang sudah dilakukan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {deploymentHistory.map((item) => (
                  <div key={item.id} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange-500"></div>
                    <div className="mb-2">
                      <p className="font-medium">{item.version} - {item.timestamp}</p>
                      <p className="text-sm text-gray-500">Oleh: {item.author}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-50 border p-3 rounded">
                        <p className="text-sm"><span className="font-medium">Konten:</span> Perubahan pada halaman Tentang Kami</p>
                      </div>
                      <div className="bg-gray-50 border p-3 rounded">
                        <p className="text-sm"><span className="font-medium">Properti:</span> Penambahan 2 properti baru</p>
                      </div>
                      {item.status === "Gagal" && (
                        <div className="bg-red-50 border border-red-100 p-3 rounded">
                          <p className="text-sm text-red-800"><AlertCircle size={14} className="inline mr-1" /> Deployment gagal: Kesalahan konfigurasi database</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                        <Eye size={14} className="mr-1" />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Koneksi Supabase</CardTitle>
              <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
                  <p className="font-medium text-orange-800 flex items-center gap-2">
                    <Database size={18} />
                    Status koneksi: Terhubung
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Database aktif dan berfungsi dengan normal</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="project-id">Supabase Project ID</Label>
                    <Input id="project-id" value="rekaland-production-db" className="bg-gray-50" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="api-url">API URL</Label>
                    <Input id="api-url" value="https://xxxxxxxxxxxx.supabase.co" className="bg-gray-50" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input id="api-key" type="password" value="••••••••••••••••" className="rounded-r-none bg-gray-50" readOnly />
                      <Button className="rounded-l-none" variant="outline">
                        <Eye size={16} />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
                  </div>

                  <div>
                    <Label htmlFor="sync-status">Status Sinkronisasi</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Terakhir sinkronisasi: 15 Jun 2023 13:45</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tabel yang terhubung</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <span>properties</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <span>users</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <span>content</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw size={16} />
                    Sinkronisasi Ulang
                  </Button>
                  <Button variant="default" className="flex items-center gap-2">
                    <FileText size={16} />
                    Dokumentasi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Badge = ({ variant, className, children }: { variant: string, className?: string, children: React.ReactNode }) => {
  return (
    <span className={cn(
      "px-2 py-1 text-xs rounded-full",
      variant === "outline" ? "border" : "",
      className
    )}>
      {children}
    </span>
  );
};

export default PublicationPanel;

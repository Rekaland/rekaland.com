
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
              <Input id="site-title" defaultValue="Rekaland: Invest In Land, Invest In Tomorrow" />
            </div>
            <div>
              <Label htmlFor="site-desc">Deskripsi</Label>
              <Textarea id="site-desc" defaultValue="REKALAND adalah solusi properti terbaik untuk keluarga Indonesia" />
            </div>
            <div>
              <Label htmlFor="site-keywords">Keywords</Label>
              <Input id="site-keywords" defaultValue="properti, kavling, rumah, investasi, tanah, rekaland, lampung" />
            </div>
            <div>
              <Label htmlFor="site-favicon">Favicon</Label>
              <div className="flex items-center mt-2">
                <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                  <img src="/lovable-uploads/00cd7c13-64b6-4964-ab06-13691f814c9b.png" alt="Favicon" className="h-8 w-8" />
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
              <Input id="phone" defaultValue="+62 821-7796-8062" />
            </div>
            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea id="address" defaultValue="Cisarua, Lampung Selatan, Lampung" />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" defaultValue="@rekaland.idn" />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" defaultValue="facebook.com/rekaland" />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" defaultValue="+6282177968062" />
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

export default SettingsManagement;

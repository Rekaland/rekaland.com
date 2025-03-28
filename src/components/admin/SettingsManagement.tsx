
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Globe, Upload, Settings, Mail, Phone, MapPin, Database } from "lucide-react";

const SettingsManagement = () => {
  const { toast } = useToast();
  const [siteSettings, setSiteSettings] = useState({
    title: "Rekaland: Invest In Land, Invest In Tomorrow",
    description: "REKALAND adalah solusi properti terbaik untuk keluarga Indonesia",
    keywords: "properti, kavling, rumah, investasi, tanah, rekaland, lampung",
    email: "info@rekaland.com",
    phone: "+62 821-7796-8062",
    address: "Cisarua, Lampung Selatan, Lampung",
    instagram: "@rekaland.idn",
    facebook: "facebook.com/rekaland",
    whatsapp: "+6282177968062",
    cacheTime: "60"
  });

  const [toggles, setToggles] = useState({
    maintenance: false,
    backup: true,
    debug: false
  });

  const handleSave = (section: string) => {
    toast({
      title: "Pengaturan tersimpan!",
      description: `Perubahan pada ${section} berhasil disimpan`,
      duration: 1000,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleToggleChange = (key: keyof typeof toggles) => {
    setToggles({
      ...toggles,
      [key]: !toggles[key]
    });
    
    toast({
      title: `Mode ${key} ${!toggles[key] ? 'diaktifkan' : 'dinonaktifkan'}`,
      description: `Pengaturan telah diperbarui`,
      duration: 1000,
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Pengaturan Website</h2>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe size={16} />
            Umum
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail size={16} />
            Kontak
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings size={16} />
            Sistem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informasi Website</CardTitle>
              <CardDescription>Ubah informasi umum tentang website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="site-title">Judul Website</Label>
                  <Input 
                    id="site-title" 
                    value={siteSettings.title}
                    onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="site-desc">Deskripsi</Label>
                  <Textarea 
                    id="site-desc" 
                    value={siteSettings.description}
                    onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="site-keywords">Keywords</Label>
                  <Input 
                    id="site-keywords" 
                    value={siteSettings.keywords}
                    onChange={(e) => setSiteSettings({...siteSettings, keywords: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="site-favicon">Favicon</Label>
                  <div className="flex items-center mt-2">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                      <img src="/lovable-uploads/00cd7c13-64b6-4964-ab06-13691f814c9b.png" alt="Favicon" className="h-8 w-8" />
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload size={14} />
                      Ganti Favicon
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSave('informasi website')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Kontak & Media Sosial</CardTitle>
              <CardDescription>Kelola informasi kontak dan tautan media sosial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} />
                    Telepon
                  </Label>
                  <Input 
                    id="phone" 
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin size={16} />
                    Alamat
                  </Label>
                  <Textarea 
                    id="address" 
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    value={siteSettings.instagram}
                    onChange={(e) => setSiteSettings({...siteSettings, instagram: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    value={siteSettings.facebook}
                    onChange={(e) => setSiteSettings({...siteSettings, facebook: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input 
                    id="whatsapp" 
                    value={siteSettings.whatsapp}
                    onChange={(e) => setSiteSettings({...siteSettings, whatsapp: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={() => handleSave('kontak & media sosial')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database size={18} />
                Pengaturan Sistem
              </CardTitle>
              <CardDescription>Konfigurasi sistem dan keamanan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                  <div>
                    <p className="font-medium">Mode Maintenance</p>
                    <p className="text-sm text-gray-500">Mengaktifkan mode maintenance akan menonaktifkan akses publik</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox" 
                      id="maintenance-mode" 
                      className="h-4 w-4 rounded border-gray-300" 
                      checked={toggles.maintenance}
                      onChange={() => handleToggleChange('maintenance')}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                  <div>
                    <p className="font-medium">Aktifkan Backup Otomatis</p>
                    <p className="text-sm text-gray-500">Backup database secara otomatis setiap hari</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox" 
                      id="auto-backup" 
                      className="h-4 w-4 rounded border-gray-300" 
                      checked={toggles.backup}
                      onChange={() => handleToggleChange('backup')}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                  <div>
                    <p className="font-medium">Mode Debug</p>
                    <p className="text-sm text-gray-500">Aktifkan mode debug untuk pengembangan</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input 
                      type="checkbox" 
                      id="debug-mode" 
                      className="h-4 w-4 rounded border-gray-300" 
                      checked={toggles.debug}
                      onChange={() => handleToggleChange('debug')}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cache-time">Waktu Cache (menit)</Label>
                  <Input 
                    id="cache-time" 
                    type="number" 
                    value={siteSettings.cacheTime}
                    onChange={(e) => setSiteSettings({...siteSettings, cacheTime: e.target.value})}
                  />
                </div>
                
                <Button 
                  onClick={() => handleSave('pengaturan sistem')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save size={16} className="mr-2" />
                  Simpan Pengaturan Sistem
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;

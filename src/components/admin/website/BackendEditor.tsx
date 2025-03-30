
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackendEditorProps {
  settings: any;
  onConfigChange: (settings: any) => void;
}

const BackendEditor = ({ settings, onConfigChange }: BackendEditorProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  
  const handleChange = (section: string, field: string, value: string) => {
    if (section === 'root') {
      onConfigChange({
        ...settings,
        [field]: value
      });
    } else {
      onConfigChange({
        ...settings,
        [section]: {
          ...settings[section],
          [field]: value
        }
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="api">API & Database</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="social">Sosial Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div>
            <Label>Judul Website</Label>
            <Input 
              value={settings.siteTitle || ''} 
              onChange={(e) => handleChange('root', 'siteTitle', e.target.value)}
              placeholder="Rekaland"
            />
            <p className="text-xs text-gray-500 mt-1">Judul utama website yang akan ditampilkan di tab browser</p>
          </div>
          
          <div>
            <Label>Deskripsi Website</Label>
            <Input 
              value={settings.siteDescription || ''} 
              onChange={(e) => handleChange('root', 'siteDescription', e.target.value)}
              placeholder="Solusi properti terbaik untuk keluarga Indonesia"
            />
            <p className="text-xs text-gray-500 mt-1">Deskripsi singkat tentang website Anda</p>
          </div>
          
          <div>
            <Label>Tema Website</Label>
            <select 
              className="w-full rounded-md border border-input bg-background py-2 px-3"
              value={settings.siteTheme || 'light'}
              onChange={(e) => handleChange('root', 'siteTheme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (Mengikuti sistem)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Tema warna utama website</p>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <div>
            <Label>Supabase URL</Label>
            <Input 
              value={settings.supabaseUrl || ''} 
              onChange={(e) => handleChange('root', 'supabaseUrl', e.target.value)}
              placeholder="https://your-project-id.supabase.co"
            />
            <p className="text-xs text-gray-500 mt-1">URL project Supabase Anda</p>
          </div>
          
          <div>
            <Label>Supabase API Key</Label>
            <div className="flex">
              <Input 
                type={showApiKey ? "text" : "password"} 
                value={settings.supabaseKey || ''} 
                onChange={(e) => handleChange('root', 'supabaseKey', e.target.value)}
                placeholder="supabase-anon-key"
                className="rounded-r-none"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-l-none"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Public API key dari project Supabase</p>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          <div>
            <Label>Email Kontak</Label>
            <Input 
              type="email"
              value={settings.contactEmail || ''} 
              onChange={(e) => handleChange('root', 'contactEmail', e.target.value)}
              placeholder="contact@yourdomain.com"
            />
            <p className="text-xs text-gray-500 mt-1">Email untuk dihubungi oleh pelanggan</p>
          </div>
          
          <div>
            <Label>Nomor Telepon</Label>
            <Input 
              type="tel"
              value={settings.contactPhone || ''} 
              onChange={(e) => handleChange('root', 'contactPhone', e.target.value)}
              placeholder="+62812345678"
            />
            <p className="text-xs text-gray-500 mt-1">Nomor telepon untuk dihubungi</p>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div>
            <Label>Facebook</Label>
            <Input 
              value={settings.socialLinks?.facebook || ''} 
              onChange={(e) => handleChange('socialLinks', 'facebook', e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          
          <div>
            <Label>Instagram</Label>
            <Input 
              value={settings.socialLinks?.instagram || ''} 
              onChange={(e) => handleChange('socialLinks', 'instagram', e.target.value)}
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          
          <div>
            <Label>Twitter / X</Label>
            <Input 
              value={settings.socialLinks?.twitter || ''} 
              onChange={(e) => handleChange('socialLinks', 'twitter', e.target.value)}
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <p className="text-sm text-gray-500 mt-4">
        Pengaturan ini akan disimpan ke database Supabase Anda dan dapat digunakan oleh aplikasi frontend maupun backend.
      </p>
    </div>
  );
};

export default BackendEditor;

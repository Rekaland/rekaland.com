
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ui/color-picker";

interface FrontendEditorProps {
  settings: any;
  onConfigChange: (settings: any) => void;
}

const FrontendEditor = ({ settings, onConfigChange }: FrontendEditorProps) => {
  const [activeSection, setActiveSection] = useState("header");
  
  // Default frontend config jika belum tersedia
  const frontendConfig = settings.frontend || {
    header: {
      logo: '',
      navbarColor: 'light',
    },
    footer: {
      logo: '',
      copyright: '© 2023 Rekaland. All rights reserved.',
      showSocialLinks: true,
    },
    home: {
      heroTitle: 'Temukan Properti Impian Anda',
      heroSubtitle: 'Pilihan terbaik hunian dan kavling untuk keluarga Indonesia',
      showFeaturedProperties: true,
      showTestimonials: true,
    },
    primaryColor: '#FF6B35',
    secondaryColor: '#4F46E5',
    fontFamily: 'Inter',
  };
  
  // Handle perubahan pada pengaturan
  const handleChange = (key: string, value: any) => {
    const updatedConfig = {
      ...settings,
      frontend: {
        ...frontendConfig,
        [key]: value
      }
    };
    
    onConfigChange(updatedConfig);
  };
  
  // Handle perubahan pada pengaturan nested (header, footer, home)
  const handleNestedChange = (section: string, key: string, value: any) => {
    const updatedConfig = {
      ...settings,
      frontend: {
        ...frontendConfig,
        [section]: {
          ...frontendConfig[section],
          [key]: value
        }
      }
    };
    
    onConfigChange(updatedConfig);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-3 w-full md:w-fit">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="theme">Tema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="header" className="space-y-4">
          <div>
            <Label>Logo URL</Label>
            <Input 
              value={frontendConfig.header?.logo || ''} 
              onChange={(e) => handleNestedChange('header', 'logo', e.target.value)}
              placeholder="URL gambar logo"
            />
            <p className="text-xs text-gray-500 mt-1">Untuk hasil terbaik, gunakan logo dengan latar belakang transparan</p>
          </div>
          
          <div>
            <Label>Warna Navbar</Label>
            <select 
              className="w-full p-2 border rounded"
              value={frontendConfig.header?.navbarColor || 'light'}
              onChange={(e) => handleNestedChange('header', 'navbarColor', e.target.value)}
            >
              <option value="light">Light (Putih)</option>
              <option value="dark">Dark (Gelap)</option>
              <option value="transparent">Transparan</option>
            </select>
          </div>
        </TabsContent>
        
        <TabsContent value="footer" className="space-y-4">
          <div>
            <Label>Logo Footer</Label>
            <Input 
              value={frontendConfig.footer?.logo || ''} 
              onChange={(e) => handleNestedChange('footer', 'logo', e.target.value)}
              placeholder="URL gambar logo footer"
            />
          </div>
          
          <div>
            <Label>Copyright Text</Label>
            <Input 
              value={frontendConfig.footer?.copyright || '© 2023 Rekaland. All rights reserved.'} 
              onChange={(e) => handleNestedChange('footer', 'copyright', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="show-social-links"
              checked={frontendConfig.footer?.showSocialLinks || false}
              onChange={(e) => handleNestedChange('footer', 'showSocialLinks', e.target.checked)}
            />
            <Label htmlFor="show-social-links">Tampilkan tautan media sosial</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-4">
          <div>
            <Label>Warna Utama</Label>
            <ColorPicker 
              value={frontendConfig.primaryColor || '#FF6B35'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('primaryColor', e.target.value)}
            />
          </div>
          
          <div>
            <Label>Warna Sekunder</Label>
            <ColorPicker 
              value={frontendConfig.secondaryColor || '#4F46E5'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('secondaryColor', e.target.value)}
            />
          </div>
          
          <div>
            <Label>Font Family</Label>
            <select 
              className="w-full p-2 border rounded"
              value={frontendConfig.fontFamily || 'Inter'}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 bg-gray-50 rounded border border-gray-200">
        <h3 className="text-md font-medium mb-2">Pratinjau Konfigurasi</h3>
        <div className="text-sm bg-white p-3 rounded border border-gray-200 font-mono whitespace-pre overflow-x-auto">
          {JSON.stringify(frontendConfig, null, 2)}
        </div>
      </div>
    </div>
  );
};

export default FrontendEditor;

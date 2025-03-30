
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

// Komponen ColorPicker sederhana untuk contoh
const ColorPicker = ({ value, onChange }: any) => {
  return (
    <input 
      type="color" 
      value={value} 
      onChange={onChange} 
      className="w-full h-10 cursor-pointer"
    />
  );
};

const FrontendEditor = ({ settings, onConfigChange }: FrontendEditorProps) => {
  const [activeSection, setActiveSection] = useState("header");
  
  const handleChange = (field: string, value: any) => {
    onConfigChange({
      ...settings,
      frontendConfig: {
        ...settings.frontendConfig,
        [field]: value
      }
    });
  };
  
  // Memastikan objek frontendConfig tersedia
  const frontendConfig = settings.frontendConfig || {
    primaryColor: "#FF6B35",
    secondaryColor: "#4F46E5",
    fontFamily: "Inter, sans-serif",
    headerStyle: "default",
    footerStyle: "default",
    homepageLayout: "standard",
    customCSS: ""
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="theme">Tema</TabsTrigger>
          <TabsTrigger value="custom">Kustom CSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="header" className="space-y-4">
          <div>
            <Label>Gaya Header</Label>
            <select 
              className="w-full rounded-md border border-input bg-background py-2 px-3"
              value={frontendConfig.headerStyle || 'default'}
              onChange={(e) => handleChange('headerStyle', e.target.value)}
            >
              <option value="default">Default</option>
              <option value="centered">Centered</option>
              <option value="minimal">Minimal</option>
              <option value="transparent">Transparent</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Pilih gaya tampilan untuk header</p>
          </div>
          
          <div>
            <Label>Logo Text</Label>
            <Input 
              value={frontendConfig.logoText || 'REKALAND'} 
              onChange={(e) => handleChange('logoText', e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="footer" className="space-y-4">
          <div>
            <Label>Gaya Footer</Label>
            <select 
              className="w-full rounded-md border border-input bg-background py-2 px-3"
              value={frontendConfig.footerStyle || 'default'}
              onChange={(e) => handleChange('footerStyle', e.target.value)}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="detailed">Detailed</option>
              <option value="centered">Centered</option>
            </select>
          </div>
          
          <div>
            <Label>Footer Text</Label>
            <Textarea 
              value={frontendConfig.footerText || '© 2025 Rekaland. All rights reserved.'} 
              onChange={(e) => handleChange('footerText', e.target.value)}
              rows={2}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="homepage" className="space-y-4">
          <div>
            <Label>Layout Homepage</Label>
            <select 
              className="w-full rounded-md border border-input bg-background py-2 px-3"
              value={frontendConfig.homepageLayout || 'standard'}
              onChange={(e) => handleChange('homepageLayout', e.target.value)}
            >
              <option value="standard">Standard</option>
              <option value="hero-centered">Hero Centered</option>
              <option value="full-width">Full Width</option>
              <option value="property-focused">Property Focused</option>
            </select>
          </div>
          
          <div>
            <Label>Hero Title</Label>
            <Input 
              value={frontendConfig.heroTitle || 'Temukan Hunian Impian Anda'} 
              onChange={(e) => handleChange('heroTitle', e.target.value)}
            />
          </div>
          
          <div>
            <Label>Hero Subtitle</Label>
            <Textarea 
              value={frontendConfig.heroSubtitle || 'Kami menyediakan properti berkualitas di lokasi strategis dengan harga terbaik'} 
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              rows={2}
            />
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
              className="w-full rounded-md border border-input bg-background py-2 px-3"
              value={frontendConfig.fontFamily || 'Inter, sans-serif'}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
            </select>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div>
            <Label>Custom CSS</Label>
            <Textarea 
              value={frontendConfig.customCSS || ''} 
              onChange={(e) => handleChange('customCSS', e.target.value)}
              placeholder="/* Masukkan kode CSS kustom Anda di sini */"
              className="font-mono text-sm"
              rows={10}
            />
            <p className="text-xs text-gray-500 mt-1">Tambahkan CSS kustom untuk menyesuaikan tampilan website</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <p className="text-sm text-gray-500 mt-4">
        Pengaturan ini memengaruhi tampilan frontend website. Klik "Simpan Perubahan" di atas untuk menyimpan.
      </p>
    </div>
  );
};

export default FrontendEditor;

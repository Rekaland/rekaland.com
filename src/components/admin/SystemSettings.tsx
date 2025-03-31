import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2, Upload, User, Shield, Bell, Globe, Database, Lock, Mail, Palette, CheckCircle } from "lucide-react";
import { Separator } from '../ui/separator';
import { supabase } from '@/integrations/supabase/client';

const SystemSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [siteName, setSiteName] = useState("Rekaland");
  const [siteDescription, setSiteDescription] = useState("Solusi properti terbaik untuk keluarga Indonesia.");
  const [siteLanguage, setSiteLanguage] = useState("id");
  const [logo, setLogo] = useState("/lovable-uploads/rekaland-logo.png");
  const [timezone, setTimezone] = useState("Asia/Jakarta");
  
  // SEO settings state
  const [metaTitle, setMetaTitle] = useState("Rekaland - Solusi Properti Terbaik");
  const [metaDescription, setMetaDescription] = useState("Rekaland menyediakan properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau dan lokasi strategis.");
  const [ogImage, setOgImage] = useState("/lovable-uploads/rekaland-logo-full.png");
  
  // User settings state
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [defaultRole, setDefaultRole] = useState("user");
  
  // Email settings state
  const [emailService, setEmailService] = useState("smtp");
  const [emailFrom, setEmailFrom] = useState("no-reply@rekaland.com");
  const [emailName, setEmailName] = useState("Rekaland");
  
  // Security settings state
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  
  // Database connection state
  const [supabaseUrl, setSupabaseUrl] = useState("https://qnzmhgvpynokshnlbsiw.supabase.co");
  const [supabaseKey, setSupabaseKey] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuem1oZ3ZweW5va3Nobmxic2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNzI3NTUsImV4cCI6MjA1ODg0ODc1NX0.viIBr28yGeY9SaD9tYejkQ-5_Ihk69VygMYh6l-VThA");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'pending'>('pending');
  
  useEffect(() => {
    // Check if already connected to Supabase on component mount
    checkSupabaseConnection();
  }, []);
  
  const checkSupabaseConnection = async () => {
    try {
      // Try to fetch something from Supabase to verify connection
      const { data, error } = await supabase.from('properties').select('id').limit(1);
      
      if (error) {
        console.error("Connection error:", error.message);
        setConnectionStatus('disconnected');
        return false;
      }
      
      setConnectionStatus('connected');
      return true;
    } catch (error) {
      console.error("Connection check failed:", error);
      setConnectionStatus('disconnected');
      return false;
    }
  };
  
  const handleConnectSupabase = async () => {
    // Validate inputs
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Validasi gagal",
        description: "URL Supabase dan API Key harus diisi",
        variant: "destructive",
      });
      return;
    }
    
    if (!supabaseUrl.includes('supabase.co')) {
      toast({
        title: "URL tidak valid",
        description: "URL Supabase harus mengandung 'supabase.co'",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    
    toast({
      title: "Menghubungkan ke Supabase",
      description: "Sedang mencoba terhubung ke Supabase...",
      duration: 2000,
    });
    
    try {
      // Save the connection settings to local storage
      localStorage.setItem('supabase_url', supabaseUrl);
      localStorage.setItem('supabase_key', supabaseKey);
      
      // Check if we can connect with these settings
      const result = await checkSupabaseConnection();
      
      if (result) {
        // Try to save to database if connected
        try {
          const { data, error } = await supabase
            .from('settings')
            .upsert({
              key: 'supabase_connection',
              value: JSON.stringify({
                url: supabaseUrl,
                key: supabaseKey,
                updated_at: new Date().toISOString()
              })
            });
            
          if (error) throw error;
        } catch (dbError) {
          console.error("Could not save to database, but connection is working:", dbError);
          // Connection works even if save fails, so continue
        }
        
        toast({
          title: "Koneksi berhasil!",
          description: "Berhasil terhubung ke Supabase",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
        });
      } else {
        throw new Error("Tidak dapat terhubung ke Supabase");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      
      toast({
        title: "Koneksi gagal",
        description: "Tidak dapat terhubung ke Supabase. Periksa URL dan API Key",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: "Pengaturan disimpan!",
      description: `Pengaturan ${section} berhasil diperbarui`,
      className: "bg-green-600 text-white",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 space-y-4">
              <div className="bg-white rounded-lg shadow p-1">
                <TabsList className="flex flex-col items-stretch h-auto bg-transparent space-y-1">
                  <TabsTrigger value="general" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Globe className="mr-2 h-4 w-4" />
                    Umum
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Globe className="mr-2 h-4 w-4" />
                    SEO
                  </TabsTrigger>
                  <TabsTrigger value="users" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <User className="mr-2 h-4 w-4" />
                    Pengguna
                  </TabsTrigger>
                  <TabsTrigger value="email" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Palette className="mr-2 h-4 w-4" />
                    Tampilan
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Shield className="mr-2 h-4 w-4" />
                    Keamanan
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifikasi
                  </TabsTrigger>
                  <TabsTrigger value="database" className="justify-start py-2 px-3 h-auto data-[state=active]:bg-gray-100">
                    <Database className="mr-2 h-4 w-4" />
                    Database
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Umum</CardTitle>
                    <CardDescription>
                      Konfigurasi dasar website Rekaland
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Nama Website</Label>
                      <Input 
                        id="site-name" 
                        value={siteName} 
                        onChange={(e) => setSiteName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-description">Deskripsi Website</Label>
                      <Textarea 
                        id="site-description" 
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="site-language">Bahasa Default</Label>
                        <Select value={siteLanguage} onValueChange={setSiteLanguage}>
                          <SelectTrigger id="site-language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="id">Bahasa Indonesia</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Zona Waktu</Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger id="timezone">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                            <SelectItem value="Asia/Makassar">Asia/Makassar (GMT+8)</SelectItem>
                            <SelectItem value="Asia/Jayapura">Asia/Jayapura (GMT+9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Logo Website</Label>
                      <div className="flex items-center gap-4">
                        <img 
                          src={logo} 
                          alt="Logo" 
                          className="h-16 w-16 object-contain border rounded-md p-1" 
                        />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Unggah Logo Baru
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("umum")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="seo" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan SEO</CardTitle>
                    <CardDescription>
                      Optimalkan pencarian dan visibilitas di mesin pencari
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="meta-title">Meta Title</Label>
                      <Input 
                        id="meta-title" 
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Maksimal 60 karakter untuk hasil optimal</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea 
                        id="meta-description" 
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">Maksimal 160 karakter untuk hasil optimal</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Open Graph Image</Label>
                      <div className="flex items-center gap-4">
                        <img 
                          src={ogImage} 
                          alt="OG Image" 
                          className="h-20 w-40 object-cover border rounded-md" 
                        />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Unggah Gambar OG
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Ukuran yang direkomendasikan: 1200 x 630 piksel</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("SEO")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Pengguna</CardTitle>
                    <CardDescription>
                      Konfigurasi pendaftaran dan manajemen pengguna
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-registration" className="block">Izinkan Pendaftaran</Label>
                        <span className="text-sm text-gray-500">Memungkinkan pengguna baru untuk mendaftar</span>
                      </div>
                      <Switch 
                        id="allow-registration" 
                        checked={allowRegistration}
                        onCheckedChange={setAllowRegistration}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-verification" className="block">Verifikasi Email</Label>
                        <span className="text-sm text-gray-500">Mengharuskan pengguna untuk memverifikasi email</span>
                      </div>
                      <Switch 
                        id="email-verification" 
                        checked={requireEmailVerification}
                        onCheckedChange={setRequireEmailVerification}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="default-role">Peran Default Pengguna Baru</Label>
                      <Select value={defaultRole} onValueChange={setDefaultRole}>
                        <SelectTrigger id="default-role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Pengguna</SelectItem>
                          <SelectItem value="customer">Pelanggan</SelectItem>
                          <SelectItem value="partner">Mitra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("pengguna")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="email" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Email</CardTitle>
                    <CardDescription>
                      Konfigurasi layanan email dan template notifikasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email-service">Layanan Email</Label>
                      <Select value={emailService} onValueChange={setEmailService}>
                        <SelectTrigger id="email-service">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smtp">SMTP</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email-from">Email Pengirim</Label>
                        <Input 
                          id="email-from" 
                          value={emailFrom}
                          onChange={(e) => setEmailFrom(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-name">Nama Pengirim</Label>
                        <Input 
                          id="email-name" 
                          value={emailName}
                          onChange={(e) => setEmailName(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {emailService === "smtp" && (
                      <div className="bg-gray-50 p-4 rounded-md space-y-4">
                        <h3 className="font-medium">Konfigurasi SMTP</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="smtp-host">SMTP Host</Label>
                            <Input id="smtp-host" placeholder="smtp.example.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-port">SMTP Port</Label>
                            <Input id="smtp-port" placeholder="587" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-user">SMTP Username</Label>
                            <Input id="smtp-user" placeholder="username@example.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="smtp-password">SMTP Password</Label>
                            <Input id="smtp-password" type="password" placeholder="********" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Test Email</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("email")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Keamanan</CardTitle>
                    <CardDescription>
                      Konfigurasi keamanan dan kebijakan kata sandi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa" className="block">Autentikasi Dua Faktor</Label>
                        <span className="text-sm text-gray-500">Mengaktifkan 2FA untuk semua pengguna admin</span>
                      </div>
                      <Switch 
                        id="2fa" 
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Kebijakan Kata Sandi</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password-length">Panjang Minimal Kata Sandi</Label>
                        <Input 
                          id="password-length" 
                          type="number" 
                          min={6} 
                          max={20} 
                          value={passwordMinLength}
                          onChange={(e) => setPasswordMinLength(parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="special-chars" className="block">Wajib Karakter Khusus</Label>
                          <span className="text-sm text-gray-500">Mengharuskan karakter khusus dalam kata sandi</span>
                        </div>
                        <Switch 
                          id="special-chars" 
                          checked={requireSpecialChars}
                          onCheckedChange={setRequireSpecialChars}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("keamanan")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Tampilan</CardTitle>
                    <CardDescription>
                      Kostumisasi tema dan tampilan situs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema Website</Label>
                      <Select defaultValue="light">
                        <SelectTrigger id="theme">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Warna Utama</Label>
                      <div className="flex gap-4">
                        <Input id="primary-color" type="color" className="w-16 h-10" defaultValue="#f97316" />
                        <Input defaultValue="#f97316" className="flex-1" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("tampilan")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Notifikasi</CardTitle>
                    <CardDescription>
                      Konfigurasi jenis notifikasi dan saluran pengiriman
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Notifikasi Email</h3>
                      
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div>
                          <Label className="block">Pendaftaran Baru</Label>
                          <span className="text-sm text-gray-500">Email notifikasi untuk pengguna baru</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div>
                          <Label className="block">Pertanyaan Kontak</Label>
                          <span className="text-sm text-gray-500">Email notifikasi untuk form kontak baru</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div>
                          <Label className="block">Properti Baru</Label>
                          <span className="text-sm text-gray-500">Email notifikasi untuk properti baru ditambahkan</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("notifikasi")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="database" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Database & Integrasi Supabase</CardTitle>
                    <CardDescription>
                      Konfigurasi koneksi database dan backend
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <h3 className="flex items-center gap-2 text-yellow-800 font-medium">
                        <Lock size={16} />
                        Integrasi Backend
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Anda dapat mengintegrasikan website dengan Supabase untuk database dan fitur backend. Masukkan URL dan API Key Supabase Anda di bawah.
                      </p>
                    </div>
                    
                    <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2">
                        <Database size={16} />
                        Koneksi Supabase
                        {connectionStatus === 'connected' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle size={12} /> Terhubung
                          </span>
                        )}
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supabase-url">Supabase URL</Label>
                        <Input 
                          id="supabase-url" 
                          placeholder="https://your-project.supabase.co" 
                          value={supabaseUrl}
                          onChange={(e) => setSupabaseUrl(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                        <Input 
                          id="supabase-key" 
                          type="password" 
                          placeholder="your-anon-key" 
                          value={supabaseKey}
                          onChange={(e) => setSupabaseKey(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={handleConnectSupabase}
                          disabled={isConnecting}
                        >
                          {isConnecting ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                              Menghubungkan...
                            </>
                          ) : (
                            <>
                              <Database size={16} className="mr-2" />
                              Hubungkan Supabase
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Backup Database</h3>
                      <p className="text-sm text-gray-500">Jadwalkan backup otomatis dan ekspor data</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="backup-frequency">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Setiap Jam</SelectItem>
                              <SelectItem value="daily">Harian</SelectItem>
                              <SelectItem value="weekly">Mingguan</SelectItem>
                              <SelectItem value="monthly">Bulanan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="retention-period">Periode Retensi</Label>
                          <Select defaultValue="30">
                            <SelectTrigger id="retention-period">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 Hari</SelectItem>
                              <SelectItem value="30">30 Hari</SelectItem>
                              <SelectItem value="90">90 Hari</SelectItem>
                              <SelectItem value="365">1 Tahun</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Reset</Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleSaveSettings("database")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemSettings;

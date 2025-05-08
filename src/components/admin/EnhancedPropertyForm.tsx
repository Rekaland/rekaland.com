
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/ui/image-uploader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Save,
  X,
  PlusCircle,
  MinusCircle,
  AlertCircle
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Definisi tipe untuk properti
interface Property {
  id?: string;
  title: string;
  description?: string | null;
  price: number;
  location: string;
  address?: string | null;
  land_size?: number | null;
  building_size?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  category: 'empty_lot' | 'semi_finished' | 'ready_to_occupy';
  status: 'available' | 'sold' | 'pending';
  featured: boolean;
  images?: string[] | null;
  specifications?: Record<string, any> | null;
  features?: string[] | null;
  virtual_tour_url?: string | null;
  location_map_url?: string | null;
  meta_description?: string | null;
  floor_plan_images?: string[] | null;
  faqs?: { question: string; answer: string }[] | null;
  amenities?: string[] | null;
  payment_options?: string[] | null;
  contact_person?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
}

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: Property) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const propertySchema = z.object({
  title: z.string().min(1, "Judul properti wajib diisi"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().positive("Harga harus berupa angka positif"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  address: z.string().optional().nullable(),
  land_size: z.coerce.number().positive("Luas tanah harus berupa angka positif").optional().nullable(),
  building_size: z.coerce.number().positive("Luas bangunan harus berupa angka positif").optional().nullable(),
  bedrooms: z.coerce.number().int().min(0).optional().nullable(),
  bathrooms: z.coerce.number().int().min(0).optional().nullable(),
  category: z.enum(['empty_lot', 'semi_finished', 'ready_to_occupy']),
  status: z.enum(['available', 'sold', 'pending']).default('available'),
  featured: z.boolean().default(false),
  images: z.array(z.string()).optional().nullable(),
  specifications: z.record(z.any()).optional().nullable(),
  features: z.array(z.string()).optional().nullable(),
  virtual_tour_url: z.string().url("URL tidak valid").optional().nullable(),
  location_map_url: z.string().url("URL tidak valid").optional().nullable(),
  meta_description: z.string().max(160, "Maksimal 160 karakter").optional().nullable(),
  floor_plan_images: z.array(z.string()).optional().nullable(),
  amenities: z.array(z.string()).optional().nullable(),
  payment_options: z.array(z.string()).optional().nullable(),
  contact_person: z.string().optional().nullable(),
  contact_phone: z.string().optional().nullable(),
  contact_email: z.string().email("Email tidak valid").optional().nullable(),
});

const EnhancedPropertyForm: React.FC<PropertyFormProps> = ({ property, onSubmit, onCancel, isSubmitting }) => {
  const [images, setImages] = useState<string[]>(property?.images || []);
  const [floorPlanImages, setFloorPlanImages] = useState<string[]>(property?.floor_plan_images || []);
  const [features, setFeatures] = useState<string[]>(property?.features || []);
  const [amenities, setAmenities] = useState<string[]>(property?.amenities || []);
  const [paymentOptions, setPaymentOptions] = useState<string[]>(property?.payment_options || []);
  const [specs, setSpecs] = useState<Record<string, any>>(property?.specifications || {});
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(property?.faqs || []);
  const { toast } = useToast();

  // Inisialisasi form dengan data properti yang ada (jika edit) atau nilai default (jika baru)
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      price: property?.price || 0,
      location: property?.location || "",
      address: property?.address || "",
      land_size: property?.land_size || undefined,
      building_size: property?.building_size || undefined,
      bedrooms: property?.bedrooms || undefined,
      bathrooms: property?.bathrooms || undefined,
      category: property?.category || "empty_lot",
      status: property?.status || "available",
      featured: property?.featured || false,
      images: property?.images || [],
      specifications: property?.specifications || {},
      features: property?.features || [],
      virtual_tour_url: property?.virtual_tour_url || "",
      location_map_url: property?.location_map_url || "",
      meta_description: property?.meta_description || "",
      floor_plan_images: property?.floor_plan_images || [],
      amenities: property?.amenities || [],
      payment_options: property?.payment_options || [],
      contact_person: property?.contact_person || "",
      contact_phone: property?.contact_phone || "",
      contact_email: property?.contact_email || "",
    },
  });

  // Update form value saat images berubah
  useEffect(() => {
    form.setValue("images", images);
    form.setValue("floor_plan_images", floorPlanImages);
    form.setValue("features", features);
    form.setValue("amenities", amenities);
    form.setValue("payment_options", paymentOptions);
    form.setValue("specifications", specs);
  }, [images, floorPlanImages, features, amenities, paymentOptions, specs, form]);

  // Handle submit form
  const handleFormSubmit = (data: z.infer<typeof propertySchema>) => {
    // Ensure all required fields are explicitly included
    const formData: Property = {
      title: data.title, // Explicitly include required fields
      description: data.description,
      price: data.price,
      location: data.location,
      category: data.category,
      status: data.status,
      featured: data.featured,
      // Include optional fields
      address: data.address,
      land_size: data.land_size,
      building_size: data.building_size,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      images: images,
      floor_plan_images: floorPlanImages,
      features: features,
      specifications: specs,
      virtual_tour_url: data.virtual_tour_url,
      location_map_url: data.location_map_url,
      meta_description: data.meta_description,
      amenities: amenities,
      payment_options: paymentOptions,
      faqs: faqs,
      contact_person: data.contact_person,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
    };
    
    if (property?.id) {
      // Edit properti
      onSubmit({ ...formData, id: property.id });
    } else {
      // Tambah properti baru
      onSubmit(formData);
    }
  };

  // Handle tambah feature
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  // Handle update feature
  const handleUpdateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Handle hapus feature
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  // Handle tambah amenity
  const handleAddAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  // Handle update amenity
  const handleUpdateAmenity = (index: number, value: string) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };

  // Handle hapus amenity
  const handleRemoveAmenity = (index: number) => {
    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);
  };

  // Handle tambah payment option
  const handleAddPaymentOption = () => {
    setPaymentOptions([...paymentOptions, ""]);
  };

  // Handle update payment option
  const handleUpdatePaymentOption = (index: number, value: string) => {
    const newPaymentOptions = [...paymentOptions];
    newPaymentOptions[index] = value;
    setPaymentOptions(newPaymentOptions);
  };

  // Handle hapus payment option
  const handleRemovePaymentOption = (index: number) => {
    const newPaymentOptions = [...paymentOptions];
    newPaymentOptions.splice(index, 1);
    setPaymentOptions(newPaymentOptions);
  };

  // Handle tambah spec
  const handleAddSpec = () => {
    const newKey = `spec_${Object.keys(specs).length + 1}`;
    setSpecs({ ...specs, [newKey]: "" });
  };

  // Handle update spec
  const handleUpdateSpec = (key: string, newKey: string, value: string) => {
    const newSpecs = { ...specs };
    if (key !== newKey) {
      delete newSpecs[key];
    }
    newSpecs[newKey] = value;
    setSpecs(newSpecs);
  };

  // Handle hapus spec
  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  };

  // Handle tambah FAQ
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  // Handle update FAQ
  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  // Handle hapus FAQ
  const handleRemoveFaq = (index: number) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full flex flex-wrap overflow-x-auto">
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="details">Detail Properti</TabsTrigger>
            <TabsTrigger value="images">Foto Properti</TabsTrigger>
            <TabsTrigger value="features">Fitur & Keunggulan</TabsTrigger>
            <TabsTrigger value="specifications">Spesifikasi Teknis</TabsTrigger>
            <TabsTrigger value="visual">Visual & Peta</TabsTrigger>
            <TabsTrigger value="marketing">Info Marketing</TabsTrigger>
            <TabsTrigger value="contact">Kontak & FAQ</TabsTrigger>
          </TabsList>
          
          {/* Tab Informasi Dasar */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Properti</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul properti" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan deskripsi properti" 
                      {...field} 
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Deskripsi (SEO)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan meta deskripsi untuk SEO (maks. 160 karakter)" 
                      {...field} 
                      value={field.value || ""}
                      rows={2}
                      className="resize-none"
                      maxLength={160}
                    />
                  </FormControl>
                  <FormDescription>
                    Deskripsi singkat untuk SEO, akan muncul di hasil pencarian Google. Maks. 160 karakter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (Rp)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan harga properti" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan lokasi properti" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan alamat lengkap" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Tab Detail Properti */}
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="land_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas Tanah (m²)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan luas tanah" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="building_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas Bangunan (m²)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan luas bangunan" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Kamar Tidur</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan jumlah kamar tidur" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Kamar Mandi</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan jumlah kamar mandi" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="empty_lot">Kavling Kosongan</option>
                        <option value="semi_finished">Kavling Bangunan</option>
                        <option value="ready_to_occupy">Kavling Siap Huni</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="available">Tersedia</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Terjual</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Tampilkan di Beranda</FormLabel>
                    <FormDescription>
                      Properti ini akan ditampilkan di bagian properti unggulan pada halaman beranda
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Tab Gambar */}
          <TabsContent value="images" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Foto Properti</h3>
                <ImageUploader
                  initialImages={images}
                  onImagesChange={setImages}
                  folder={`properties/${property?.id || 'new'}`}
                  maxImages={15}
                  title="Foto Properti"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Unggah foto properti untuk ditampilkan kepada calon pembeli (maks. 15 foto)
                </p>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-2">Denah Rumah (Floor Plan)</h3>
                <ImageUploader
                  initialImages={floorPlanImages}
                  onImagesChange={setFloorPlanImages}
                  folder={`properties/${property?.id || 'new'}/floorplans`}
                  maxImages={5}
                  title="Denah Rumah"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Unggah gambar denah rumah untuk memudahkan calon pembeli memahami layout properti (maks. 5 foto)
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab Fitur & Keunggulan */}
          <TabsContent value="features" className="pt-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Fitur Properti</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddFeature}
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Fitur
                </Button>
              </div>
              
              <div className="space-y-2">
                {features.length > 0 ? features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleUpdateFeature(index, e.target.value)}
                      placeholder={`Fitur #${index + 1}`}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                      disabled={isSubmitting}
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    Belum ada fitur yang ditambahkan. Klik "Tambah Fitur" untuk menambahkan.
                  </div>
                )}
              </div>
              <FormDescription className="mt-2">
                Fitur adalah keunggulan utama properti yang menjadi daya tarik bagi pembeli
              </FormDescription>
            </div>
            
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Fasilitas & Amenitas</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddAmenity}
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Fasilitas
                </Button>
              </div>
              
              <div className="space-y-2">
                {amenities.length > 0 ? amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={amenity}
                      onChange={(e) => handleUpdateAmenity(index, e.target.value)}
                      placeholder={`Fasilitas #${index + 1}`}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAmenity(index)}
                      disabled={isSubmitting}
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    Belum ada fasilitas yang ditambahkan. Klik "Tambah Fasilitas" untuk menambahkan.
                  </div>
                )}
              </div>
              <FormDescription className="mt-2">
                Fasilitas adalah fitur tambahan seperti taman bermain, area olahraga, dll.
              </FormDescription>
            </div>
          </TabsContent>
          
          {/* Tab Spesifikasi Teknis */}
          <TabsContent value="specifications" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Spesifikasi Teknis</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddSpec}
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Spesifikasi
                </Button>
              </div>
              
              <div className="space-y-4">
                {Object.keys(specs).length > 0 ? Object.entries(specs).map(([key, value], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="md:col-span-1">
                      <Input
                        value={key}
                        onChange={(e) => handleUpdateSpec(key, e.target.value, value as string)}
                        placeholder="Nama Spesifikasi"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        value={value as string}
                        onChange={(e) => handleUpdateSpec(key, key, e.target.value)}
                        placeholder="Nilai Spesifikasi"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSpec(key)}
                        disabled={isSubmitting}
                        className="h-10 w-10"
                      >
                        <MinusCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    Belum ada spesifikasi yang ditambahkan. Klik "Tambah Spesifikasi" untuk menambahkan.
                  </div>
                )}
              </div>
              <FormDescription>
                Detail teknis properti seperti tipe pondasi, material dinding, jenis atap, material lantai, dll.
              </FormDescription>
            </div>
          </TabsContent>
          
          {/* Tab Visual & Peta */}
          <TabsContent value="visual" className="pt-4 space-y-6">
            <FormField
              control={form.control}
              name="virtual_tour_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Virtual Tour (360°)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Masukkan URL virtual tour (dari YouTube, Matterport, dll)" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Link ke virtual tour 360° dari YouTube atau platform lain
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location_map_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Peta Lokasi</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Masukkan URL Google Maps" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Link Google Maps untuk menampilkan lokasi properti pada peta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Tab Marketing */}
          <TabsContent value="marketing" className="pt-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Opsi Pembayaran</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddPaymentOption}
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Opsi Pembayaran
                </Button>
              </div>
              
              <div className="space-y-2">
                {paymentOptions.length > 0 ? paymentOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleUpdatePaymentOption(index, e.target.value)}
                      placeholder={`Opsi Pembayaran #${index + 1}`}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemovePaymentOption(index)}
                      disabled={isSubmitting}
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    Belum ada opsi pembayaran yang ditambahkan. Klik "Tambah Opsi Pembayaran" untuk menambahkan.
                  </div>
                )}
              </div>
              <FormDescription className="mt-2">
                Contoh: "Cash Keras", "KPR Bank", "Cicilan Developer 12x", dll.
              </FormDescription>
            </div>
          </TabsContent>
          
          {/* Tab Kontak & FAQ */}
          <TabsContent value="contact" className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_person"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kontak Person</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Masukkan nama kontak person" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telepon Kontak</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Masukkan nomor telepon kontak" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Kontak</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Masukkan email kontak" 
                      type="email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Pertanyaan Umum (FAQ)</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddFaq}
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah FAQ
                </Button>
              </div>
              
              <div className="space-y-4">
                {faqs.length > 0 ? faqs.map((faq, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">FAQ #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFaq(index)}
                        disabled={isSubmitting}
                      >
                        <MinusCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor={`faq-question-${index}`}>Pertanyaan</Label>
                        <Input
                          id={`faq-question-${index}`}
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                          placeholder="Masukkan pertanyaan"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`faq-answer-${index}`}>Jawaban</Label>
                        <Textarea
                          id={`faq-answer-${index}`}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                          placeholder="Masukkan jawaban"
                          disabled={isSubmitting}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-muted-foreground">
                    Belum ada FAQ yang ditambahkan. Klik "Tambah FAQ" untuk menambahkan.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6 flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="mr-2 h-4 w-4" />
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Properti
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EnhancedPropertyForm;


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
import { Loader2, Save, X } from "lucide-react";
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
  map_url?: string | null;
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
  land_size: z.coerce.number().min(1, "Luas tanah harus lebih dari 0 m²").optional().nullable(),
  building_size: z.coerce.number().min(1, "Luas bangunan harus lebih dari 0 m²").optional().nullable(),
  bedrooms: z.coerce.number().int().min(0).optional().nullable(),
  bathrooms: z.coerce.number().int().min(0).optional().nullable(),
  category: z.enum(['empty_lot', 'semi_finished', 'ready_to_occupy']),
  status: z.enum(['available', 'sold', 'pending']).default('available'),
  featured: z.boolean().default(false),
  images: z.array(z.string()).optional().nullable(),
  map_url: z.string().optional().nullable(),
});

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSubmit, onCancel, isSubmitting }) => {
  const [images, setImages] = useState<string[]>(property?.images || []);
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
      map_url: property?.map_url || "",
    },
  });

  // Update form value saat images berubah
  useEffect(() => {
    form.setValue("images", images);
  }, [images, form]);

  // Handle submit form
  const handleFormSubmit = (data: z.infer<typeof propertySchema>) => {
    // Pastikan images tersimpan di form data
    const formData: Property = {
      title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      address: data.address,
      land_size: data.land_size,
      building_size: data.building_size,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      category: data.category,
      status: data.status,
      featured: data.featured,
      images: images,
      map_url: data.map_url,
    };
    
    if (property?.id) {
      // Edit properti
      onSubmit({ ...formData, id: property.id });
    } else {
      // Tambah properti baru
      onSubmit(formData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="details">Detail Properti</TabsTrigger>
            <TabsTrigger value="images">Gambar</TabsTrigger>
          </TabsList>
          
          {/* Tab Informasi Dasar */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Properti <span className="text-red-500">*</span></FormLabel>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (Rp) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Masukkan harga properti" 
                        {...field}
                        min="1"
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
                    <FormLabel>Lokasi <span className="text-red-500">*</span></FormLabel>
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
                    <Textarea 
                      placeholder="Masukkan alamat lengkap properti" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan alamat lengkap properti yang akan ditampilkan pada halaman detail
                  </FormDescription>
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
                        min="1"
                        step="0.01"
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
                        min="1"
                        step="0.01"
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
                        min="0"
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
                        min="0"
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
                    <FormLabel>Kategori <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
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
            
            <FormField
              control={form.control}
              name="map_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Embed Peta</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan URL embed Google Maps atau peta lainnya" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Salin URL embed dari Google Maps untuk menampilkan lokasi properti
                    (contoh: https://www.google.com/maps/embed?pb=... atau https://maps.app.goo.gl/...)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Tab Gambar */}
          <TabsContent value="images" className="pt-4">
            <ImageUploader
              initialImages={images}
              onImagesChange={setImages}
              folder={`properties/${property?.id || 'new'}`}
              maxImages={10}
              title="Foto Properti"
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Unggah foto properti untuk ditampilkan kepada calon pembeli <span className="text-red-500">*</span>
            </p>
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

export default PropertyForm;

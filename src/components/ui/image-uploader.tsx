
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, CardContent, 
  CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { uploadImage, deleteImage } from '@/integrations/supabase/storage';
import { Image, UploadCloud, X, Edit2, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  initialImages?: string[];
  maxImages?: number;
  folder?: string;
  onImagesChange?: (images: string[]) => void;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImages = [],
  maxImages = 10,
  folder = '',
  onImagesChange,
  title = 'Upload Gambar',
  disabled = false,
  className = '',
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sinkronisasi state dengan prop initialImages
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  // Handler saat gambar berubah
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  // Simulasi upload progress
  useEffect(() => {
    if (uploading) {
      const intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
      
      return () => clearInterval(intervalId);
    } else {
      setProgress(0);
    }
  }, [uploading]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Validasi apakah sudah mencapai batas gambar
    if (images.length + files.length > maxImages) {
      toast({
        title: "Batas maksimum gambar",
        description: `Anda hanya dapat mengunggah maksimal ${maxImages} gambar`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);
    
    try {
      const newImages = [...images];
      
      // Upload satu per satu
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File terlalu besar",
            description: `${file.name} melebihi batas ukuran 5MB`,
            variant: "destructive",
          });
          continue;
        }
        
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Format file tidak didukung",
            description: "Hanya file gambar yang didukung",
            variant: "destructive",
          });
          continue;
        }
        
        // Upload ke Supabase
        const url = await uploadImage(file, folder);
        if (url) {
          newImages.push(url);
        }
      }
      
      setImages(newImages);
      
      if (onImagesChange) {
        onImagesChange(newImages);
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast({
        title: "Upload berhasil",
        description: "Gambar telah diunggah dengan sukses",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Gagal mengunggah",
        description: "Terjadi kesalahan saat mengunggah gambar",
        variant: "destructive",
      });
    } finally {
      setProgress(100);
      setTimeout(() => {
        setUploading(false);
      }, 500);
    }
  };

  const handleRemoveImage = async (url: string) => {
    if (deleteInProgress) return;
    
    setDeleteInProgress(url);
    
    try {
      const success = await deleteImage(url);
      
      if (success) {
        const newImages = images.filter(img => img !== url);
        setImages(newImages);
        
        if (onImagesChange) {
          onImagesChange(newImages);
        }
        
        toast({
          title: "Gambar dihapus",
          description: "Gambar telah berhasil dihapus",
          variant: "default",
        });
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Gagal menghapus",
        description: "Terjadi kesalahan saat menghapus gambar",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress bar saat upload berlangsung */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Mengupload... ({progress}%)
              </p>
            </div>
          )}
          
          {/* Grid tampilan gambar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {images.map((url, index) => (
              <div 
                key={`${url}-${index}`} 
                className="relative aspect-square rounded-md overflow-hidden border border-border bg-muted"
              >
                <img 
                  src={url} 
                  alt={`Uploaded image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {!disabled && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-sm"
                    onClick={() => handleRemoveImage(url)}
                    disabled={deleteInProgress === url}
                  >
                    {deleteInProgress === url ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            ))}
            
            {/* Tombol tambah gambar jika belum mencapai maksimum */}
            {images.length < maxImages && !disabled && (
              <button
                type="button"
                onClick={handleClickUpload}
                disabled={uploading}
                className="border-2 border-dashed border-border rounded-md aspect-square flex flex-col items-center justify-center p-4 hover:bg-muted transition-colors"
              >
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Klik untuk upload
                </span>
              </button>
            )}
          </div>
          
          {/* Input file tersembunyi */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading || disabled || images.length >= maxImages}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <p className="text-sm text-muted-foreground">
          {images.length} dari {maxImages} gambar
        </p>
        {!disabled && (
          <Button
            type="button"
            onClick={handleClickUpload}
            disabled={uploading || images.length >= maxImages}
            variant="outline"
            className="flex items-center"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mengupload...
              </>
            ) : (
              <>
                <Image className="h-4 w-4 mr-2" />
                Pilih Gambar
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

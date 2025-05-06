
import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'product_images';

/**
 * Upload gambar ke Supabase Storage
 * @param file File yang akan diupload
 * @param folder Folder dalam bucket (optional)
 * @returns URL gambar yang diupload jika berhasil, null jika gagal
 */
export const uploadImage = async (file: File, folder: string = ''): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);
    
    return publicUrl;
  } catch (err) {
    console.error('Failed to upload image:', err);
    return null;
  }
};

/**
 * Menghapus gambar dari Supabase Storage
 * @param imagePath Path gambar yang akan dihapus
 * @returns true jika berhasil, false jika gagal
 */
export const deleteImage = async (imagePath: string): Promise<boolean> => {
  try {
    // Ekstrak path dari URL publik
    const path = imagePath.split(`${BUCKET_NAME}/`).pop();
    
    if (!path) {
      console.error('Invalid image path');
      return false;
    }
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Failed to delete image:', err);
    return false;
  }
};

/**
 * Mendapatkan URL publik dari path file
 * @param filePath Path file dalam storage
 * @returns URL publik dari file
 */
export const getPublicUrl = (filePath: string): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  
  return publicUrl;
};

/**
 * Mengkonversi URL publik ke path storage
 * @param publicUrl URL publik dari Supabase Storage
 * @returns Path storage
 */
export const getPathFromUrl = (publicUrl: string): string | null => {
  try {
    const url = new URL(publicUrl);
    const pathMatch = url.pathname.match(new RegExp(`/object/public/${BUCKET_NAME}/(.*)`));
    
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]);
    }
    
    return null;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
};

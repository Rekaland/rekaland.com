
import { createClient } from '@supabase/supabase-js';

// URL Supabase dan kunci API publik
const supabaseUrl = 'https://qnzmhgvpynokshnlbsiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuem1oZ3ZweW5va3Nobmxic2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNzI3NTUsImV4cCI6MjA1ODg0ODc1NX0.viIBr28yGeY9SaD9tYejkQ-5_Ihk69VygMYh6l-VThA';

// Membuat client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'rekaland-auth-storage',
  },
});

// Tipe untuk properti
export type Property = {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  address?: string;
  land_size?: number;
  building_size?: number;
  bedrooms?: number;
  bathrooms?: number;
  category: 'empty_lot' | 'semi_finished' | 'ready_to_occupy';
  status: 'available' | 'sold' | 'pending';
  featured: boolean;
  images?: string[];
  created_at: string;
  updated_at: string;
};

// Tipe untuk testimoni
export type Testimonial = {
  id: string;
  name: string;
  avatar_url?: string;
  testimonial: string;
  rating: number;
  position?: string;
  company?: string;
  created_at: string;
};

// Tipe untuk inquiry/pesan
export type Inquiry = {
  id: string;
  user_id?: string;
  property_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

// Tipe untuk profil pengguna
export type Profile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
};


import { supabase } from "@/integrations/supabase/client";

// Data konten website yang akan diimpor ke Supabase
export const websiteContents = [
  {
    title: "Beranda",
    slug: "home",
    content: `
      <section class="hero">
        <h1>REKALAND - Solusi Properti untuk Keluarga Indonesia</h1>
        <p>Temukan properti impian Anda dengan berbagai pilihan mulai dari kavling kosongan, setengah jadi, hingga siap huni dengan harga kompetitif dan lokasi strategis.</p>
      </section>
      <section class="about">
        <h2>Tentang Kami</h2>
        <p>REKALAND adalah penyedia properti terpercaya dengan pengalaman di industri properti Indonesia, berfokus pada kebutuhan keluarga Indonesia.</p>
      </section>
    `,
    meta_description: "REKALAND - Solusi properti terbaik untuk keluarga Indonesia dengan pilihan kavling dan properti di lokasi strategis."
  },
  {
    title: "Tentang Kami",
    slug: "about",
    content: `
      <section class="about-hero">
        <h1>Tentang REKALAND</h1>
        <p>Mengenal lebih dekat dengan REKALAND, penyedia solusi properti untuk keluarga Indonesia</p>
      </section>
      <section class="vision-mission">
        <h2>Visi & Misi</h2>
        <p>Menjadi perusahaan properti terdepan yang memberikan solusi hunian berkualitas untuk seluruh masyarakat Indonesia</p>
        <p>Menyediakan properti berkualitas dengan harga kompetitif dan lokasi strategis untuk memenuhi kebutuhan konsumen</p>
      </section>
    `,
    meta_description: "Tentang REKALAND - Penyedia properti terpercaya dengan pengalaman di industri properti Indonesia."
  },
  {
    title: "Produk",
    slug: "products",
    content: `
      <section class="products-hero">
        <h1>Produk REKALAND</h1>
        <p>Pilihan properti untuk kebutuhan Anda mulai dari kavling kosongan, setengah jadi, hingga siap huni</p>
      </section>
      <section class="product-categories">
        <h2>Kategori Produk</h2>
        <ul>
          <li>Kavling Kosongan - Tanah kavling siap bangun untuk rumah impian Anda</li>
          <li>Kavling Setengah Jadi - Rumah setengah jadi yang bisa disesuaikan</li>
          <li>Kavling Siap Huni - Rumah siap huni dengan desain modern</li>
        </ul>
      </section>
    `,
    meta_description: "Produk REKALAND - Kavling, rumah dan properti dengan berbagai pilihan sesuai kebutuhan Anda."
  },
  {
    title: "Kontak",
    slug: "contact",
    content: `
      <section class="contact-hero">
        <h1>Hubungi Kami</h1>
        <p>Tim kami siap membantu Anda menemukan properti ideal untuk keluarga Anda</p>
      </section>
      <section class="contact-info">
        <h2>Informasi Kontak</h2>
        <p>Email: info@rekaland.com</p>
        <p>Telepon: +62 812-3456-7890</p>
        <p>Alamat: Jl. Properti No. 123, Jakarta Selatan</p>
      </section>
    `,
    meta_description: "Hubungi REKALAND - Dapatkan informasi lebih lanjut tentang properti kami dan jadwalkan konsultasi dengan tim ahli kami."
  }
];

// Fungsi untuk mengimpor konten ke Supabase
export const importContentsToSupabase = async () => {
  console.log("Mulai mengimpor konten ke Supabase...");
  
  try {
    for (const content of websiteContents) {
      // Cek apakah konten dengan slug ini sudah ada
      const { data: existingContent } = await supabase
        .from("contents")
        .select("id")
        .eq("slug", content.slug)
        .maybeSingle();
      
      if (existingContent) {
        // Update konten yang sudah ada
        const { error: updateError } = await supabase
          .from("contents")
          .update({
            title: content.title,
            content: content.content,
            meta_description: content.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingContent.id);
        
        if (updateError) throw updateError;
        console.log(`Konten '${content.title}' berhasil diperbarui.`);
      } else {
        // Buat konten baru
        const { error: insertError } = await supabase
          .from("contents")
          .insert({
            title: content.title,
            slug: content.slug,
            content: content.content,
            meta_description: content.meta_description
          });
        
        if (insertError) throw insertError;
        console.log(`Konten '${content.title}' berhasil ditambahkan.`);
      }
    }
    
    return { success: true, message: "Semua konten berhasil diimpor ke Supabase" };
  } catch (error) {
    console.error("Error mengimpor konten:", error);
    return { success: false, message: "Gagal mengimpor konten", error };
  }
};

// Data produk properti untuk diimpor ke Supabase
export const propertyProducts = [
  {
    title: "Kavling Premium Jakarta",
    category: "empty_lot",
    location: "Jakarta Selatan",
    price: 350000000,
    land_size: 120,
    featured: true,
    description: "Kavling premium berlokasi strategis di Jakarta Selatan, bebas banjir, dengan akses mudah ke jalan tol dan fasilitas publik.",
    status: "available"
  },
  {
    title: "Rumah Setengah Jadi Bekasi",
    category: "semi_finished",
    location: "Bekasi",
    price: 450000000,
    land_size: 150,
    building_size: 100,
    bedrooms: 2,
    bathrooms: 1,
    featured: true,
    description: "Rumah setengah jadi dengan struktur kokoh, dapat disesuaikan dengan kebutuhan Anda. Lokasi strategis di Bekasi.",
    status: "available"
  },
  {
    title: "Rumah Siap Huni BSD",
    category: "ready_to_occupy",
    location: "Tangerang Selatan",
    price: 650000000,
    land_size: 180,
    building_size: 140,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
    description: "Rumah siap huni dengan desain modern, 3 kamar tidur, 2 kamar mandi, berlokasi di kawasan premium BSD City.",
    status: "available"
  }
];

// Fungsi untuk mengimpor properti ke Supabase
export const importPropertiesToSupabase = async () => {
  console.log("Mulai mengimpor properti ke Supabase...");
  
  try {
    for (const property of propertyProducts) {
      // Cek apakah properti dengan judul ini sudah ada
      const { data: existingProperty } = await supabase
        .from("properties")
        .select("id")
        .eq("title", property.title)
        .maybeSingle();
      
      if (existingProperty) {
        // Update properti yang sudah ada
        const { error: updateError } = await supabase
          .from("properties")
          .update({
            ...property,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingProperty.id);
        
        if (updateError) throw updateError;
        console.log(`Properti '${property.title}' berhasil diperbarui.`);
      } else {
        // Buat properti baru
        const { error: insertError } = await supabase
          .from("properties")
          .insert(property);
        
        if (insertError) throw insertError;
        console.log(`Properti '${property.title}' berhasil ditambahkan.`);
      }
    }
    
    return { success: true, message: "Semua properti berhasil diimpor ke Supabase" };
  } catch (error) {
    console.error("Error mengimpor properti:", error);
    return { success: false, message: "Gagal mengimpor properti", error };
  }
};

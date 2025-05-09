import React, { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import ContentDisplay from "@/components/content/ContentDisplay";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentBySlug } from "@/hooks/useContentBySlug";
import { Clock, MapPin } from "lucide-react";

// Data untuk konten sampel jika data dari database tidak ditemukan
const sampleContents = {
  "pertumbuhan-properti-lampung": {
    title: "Pertumbuhan Properti di Lampung Meningkat",
    content: `
      <div class="prose max-w-none">
        <p>Pasar properti di Lampung telah menunjukkan peningkatan yang signifikan dalam 6 bulan terakhir. Berdasarkan data dari Asosiasi Real Estate Indonesia (REI) cabang Lampung, transaksi properti meningkat hingga 25% dibandingkan periode yang sama tahun lalu.</p>
        
        <p>Kavling-kavling strategis menjadi primadona dan incaran investor, terutama di kawasan Lampung Selatan dan sekitar Bandara Radin Inten II. Lokasinya yang strategis dan potensi pengembangan infrastruktur membuat nilai properti di kawasan ini diprediksi akan terus naik.</p>
        
        <h2>Faktor Pendorong Pertumbuhan</h2>
        
        <p>Beberapa faktor yang mendorong peningkatan pasar properti di Lampung antara lain:</p>
        
        <ul>
          <li>Pengembangan infrastruktur seperti perluasan bandara dan pembangunan jalan tol</li>
          <li>Relokasi beberapa kantor pemerintahan ke wilayah Lampung Selatan</li>
          <li>Meningkatnya minat investasi dari luar daerah, terutama Jakarta dan Bandung</li>
          <li>Harga properti yang masih relatif terjangkau dibandingkan kota besar lainnya</li>
        </ul>
        
        <h2>Proyeksi ke Depan</h2>
        
        <p>Para analis properti memprediksi tren peningkatan ini akan berlanjut hingga 5 tahun ke depan, dengan estimasi kenaikan harga 10-15% per tahun di lokasi-lokasi strategis. Hal ini menjadikan Lampung sebagai salah satu destinasi investasi properti yang menjanjikan di luar Jawa.</p>
        
        <p>Rekaland sebagai salah satu pengembang terkemuka di Lampung telah mengantisipasi peningkatan ini dengan membuka beberapa kawasan pengembangan baru dengan berbagai pilihan properti, mulai dari kavling siap bangun hingga rumah siap huni.</p>
      </div>
    `,
    date: "21 Mei 2023",
    author: "Tim Rekaland"
  },
  "kavling-baru-cisarua": {
    title: "Rekaland Membuka Kavling Baru di Cisarua",
    content: `
      <div class="prose max-w-none">
        <p>Rekaland Indonesia dengan bangga mengumumkan pembukaan area pengembangan baru di kawasan Cisarua dengan nama "Cisarua Hills". Kavling baru ini menawarkan pemandangan alam pegunungan yang indah dan udara yang sejuk, cocok untuk hunian keluarga yang nyaman.</p>
        
        <h2>Lokasi Strategis</h2>
        
        <p>Cisarua Hills terletak hanya:</p>
        <ul>
          <li>15 menit dari pusat kota</li>
          <li>5 menit dari fasilitas pendidikan terkemuka</li>
          <li>10 menit dari pusat perbelanjaan</li>
          <li>20 menit dari rumah sakit</li>
        </ul>
        
        <p>Dengan akses jalan yang mudah dan infrastruktur yang lengkap, Cisarua Hills menawarkan kenyamanan tinggal dengan tetap dekat dengan berbagai fasilitas penting.</p>
        
        <h2>Fasilitas Unggulan</h2>
        
        <p>Cisarua Hills dilengkapi dengan berbagai fasilitas unggulan seperti:</p>
        <ul>
          <li>Taman bermain anak</li>
          <li>Jogging track</li>
          <li>Area komunal</li>
          <li>Keamanan 24 jam</li>
          <li>Sistem drainase modern</li>
          <li>Jaringan listrik bawah tanah</li>
        </ul>
        
        <h2>Penawaran Khusus</h2>
        
        <p>Untuk pembeli pertama, Rekaland menawarkan harga khusus mulai dari Rp 500 juta untuk kavling standar dengan luas 200m². Tersedia juga skema pembayaran fleksibel dengan uang muka ringan dan cicilan hingga 5 tahun.</p>
        
        <p>Jumlah unit terbatas hanya 50 kavling untuk fase pertama. Hubungi marketing Rekaland sekarang untuk informasi lebih lanjut dan pemesanan.</p>
      </div>
    `,
    date: "10 April 2023",
    author: "Marketing Rekaland"
  },
  "tips-memilih-kavling-investasi": {
    title: "Tips Memilih Kavling Untuk Investasi",
    content: `
      <div class="prose max-w-none">
        <p>Investasi properti, khususnya kavling tanah, masih menjadi pilihan investasi yang menjanjikan dengan potensi kenaikan nilai yang stabil. Namun, memilih kavling untuk investasi memerlukan pertimbangan yang matang agar investasi yang dilakukan benar-benar menguntungkan di masa depan.</p>
        
        <h2>1. Lokasi Adalah Kunci Utama</h2>
        <p>Seperti mantra dalam dunia properti, "location, location, location" tetap menjadi faktor terpenting. Pilih kavling di lokasi dengan potensi perkembangan yang baik, seperti:</p>
        <ul>
          <li>Dekat dengan rencana pembangunan infrastruktur (jalan tol, bandara, stasiun)</li>
          <li>Kawasan dengan masterplan pengembangan kota yang jelas</li>
          <li>Area dengan pertumbuhan ekonomi yang baik</li>
          <li>Dekat dengan fasilitas publik (sekolah, rumah sakit, mal)</li>
        </ul>
        
        <h2>2. Periksa Status Legalitas</h2>
        <p>Pastikan kavling yang akan dibeli memiliki legalitas yang jelas dan lengkap:</p>
        <ul>
          <li>Sertifikat Hak Milik (SHM) atau Hak Guna Bangunan (HGB)</li>
          <li>Izin Mendirikan Bangunan (IMB) jika akan dibangun</li>
          <li>Tidak dalam sengketa atau dijaminkan ke bank</li>
          <li>Sesuai dengan Rencana Tata Ruang Wilayah (RTRW)</li>
        </ul>
        
        <h2>3. Analisis Potensi Nilai Tambah</h2>
        <p>Nilai investasi akan meningkat jika ada potensi pengembangan di masa depan:</p>
        <ul>
          <li>Rencana pembangunan fasilitas publik di sekitarnya</li>
          <li>Pertumbuhan populasi di kawasan tersebut</li>
          <li>Tren bisnis dan ekonomi yang berkembang</li>
          <li>Kondisi geografis yang menguntungkan (bebas banjir, tanah yang stabil)</li>
        </ul>
        
        <h2>4. Pertimbangkan Developer</h2>
        <p>Jika membeli dari pengembang, pertimbangkan rekam jejak dan reputasinya:</p>
        <ul>
          <li>Sejarah penyelesaian proyek tepat waktu</li>
          <li>Kualitas pengembangan sebelumnya</li>
          <li>Kesehatan finansial perusahaan</li>
          <li>Layanan purna jual yang ditawarkan</li>
        </ul>
        
        <h2>5. Hitung Potensi ROI</h2>
        <p>Lakukan perhitungan Return on Investment (ROI) dengan mempertimbangkan:</p>
        <ul>
          <li>Rata-rata kenaikan harga tanah di kawasan tersebut per tahun</li>
          <li>Biaya pajak dan pemeliharaan tahunan</li>
          <li>Estimasi waktu yang dibutuhkan untuk mencapai target keuntungan</li>
          <li>Likuiditas atau kemudahan menjual kembali</li>
        </ul>
        
        <p>Dengan mempertimbangkan faktor-faktor di atas, investor dapat membuat keputusan yang lebih informasi dalam memilih kavling untuk investasi. Konsultasikan juga dengan ahli properti atau agen terpercaya untuk mendapatkan informasi pasar terkini.</p>
      </div>
    `,
    date: "5 Maret 2023",
    author: "Konsultan Properti Rekaland"
  },
  "open-house-kavling-cisarua": {
    title: "Open House Kavling Cisarua",
    content: `
      <div class="prose max-w-none">
        <p>Rekaland dengan bangga mengundang Anda untuk menghadiri acara Open House peresmian kavling-kavling terbaru di kawasan premium Cisarua. Acara ini merupakan kesempatan emas untuk melihat langsung lokasi dan potensi investasi properti terbaik di Lampung Selatan.</p>
        
        <h2>Waktu dan Tempat</h2>
        <ul>
          <li><strong>Tanggal:</strong> 15 Juni 2023</li>
          <li><strong>Waktu:</strong> 09.00 - 17.00 WIB</li>
          <li><strong>Lokasi:</strong> Marketing Gallery Cisarua Hills, Jl. Raya Cisarua No. 88, Lampung Selatan</li>
        </ul>
        
        <h2>Acara dan Fasilitas</h2>
        <ul>
          <li>Tour lokasi kavling dengan shuttle</li>
          <li>Presentasi investasi properti</li>
          <li>Konsultasi one-on-one dengan tim ahli properti</li>
          <li>Pameran desain rumah</li>
          <li>Diskon khusus hanya di hari H</li>
          <li>Doorprize menarik</li>
          <li>Refreshment</li>
        </ul>
        
        <h2>Penawaran Khusus</h2>
        <p>Bagi pengunjung yang melakukan booking fee pada saat acara Open House, akan mendapatkan keuntungan:</p>
        <ul>
          <li>Diskon hingga 15% untuk pembelian kavling</li>
          <li>Free biaya administrasi</li>
          <li>Cashback hingga Rp 10 juta</li>
          <li>Bonus furniture untuk pembelian rumah siap huni</li>
        </ul>
        
        <h2>Pendaftaran</h2>
        <p>Untuk kenyamanan Anda, kami membatasi jumlah pengunjung. Silakan mendaftar melalui:</p>
        <ul>
          <li>WhatsApp: 081234567890</li>
          <li>Email: marketing@rekaland.com</li>
          <li>Website: www.rekaland.com/open-house</li>
        </ul>
        
        <p>Jangan lewatkan kesempatan ini untuk memiliki properti impian di lokasi strategis dengan harga terbaik! Ajak keluarga dan kerabat Anda untuk hadir dan nikmati pengalaman properti yang tidak terlupakan bersama Rekaland.</p>
      </div>
    `,
    date: "15 Juni 2023",
    location: "Cisarua, Lampung Selatan"
  },
  "seminar-investasi-properti": {
    title: "Seminar Investasi Properti",
    content: `
      <div class="prose max-w-none">
        <p>Rekaland Indonesia bekerjasama dengan Asosiasi Real Estate Indonesia (REI) cabang Lampung akan menyelenggarakan seminar investasi properti dengan tema "Strategi Investasi Properti di Era Digital". Seminar ini didesain untuk para investor pemula maupun berpengalaman yang ingin memaksimalkan potensi investasi properti di era digital.</p>
        
        <h2>Detail Acara</h2>
        <ul>
          <li><strong>Tanggal:</strong> 22 Juni 2023</li>
          <li><strong>Waktu:</strong> 13.00 - 17.00 WIB</li>
          <li><strong>Tempat:</strong> Ballroom Hotel Grand Lampung, Lantai 5</li>
          <li><strong>Biaya:</strong> Rp 150.000/orang (termasuk sertifikat, makan siang, dan materi)</li>
        </ul>
        
        <h2>Pembicara</h2>
        <ul>
          <li><strong>Dr. Budi Santoso</strong> - Pakar Ekonomi dan Properti Nasional</li>
          <li><strong>Ir. Hendra Wijaya</strong> - Ketua REI Lampung</li>
          <li><strong>Nina Kartika, S.E., M.M.</strong> - Property Investment Consultant</li>
          <li><strong>Agus Purnomo</strong> - Direktur Utama Rekaland Indonesia</li>
        </ul>
        
        <h2>Materi Seminar</h2>
        <ul>
          <li>Tren Pasar Properti 2023-2025</li>
          <li>Analisis Lokasi dan ROI Properti</li>
          <li>Strategi Marketing Properti di Era Digital</li>
          <li>Aspek Legal dalam Investasi Properti</li>
          <li>Tips dan Trik Investasi Properti Menguntungkan</li>
          <li>Studi Kasus: Sukses Berinvestasi di Properti Rekaland</li>
        </ul>
        
        <h2>Fasilitas</h2>
        <ul>
          <li>Sertifikat digital</li>
          <li>Coffee break dan makan siang</li>
          <li>Materi presentasi digital</li>
          <li>Networking session dengan para profesional properti</li>
          <li>Konsultasi gratis pasca seminar</li>
        </ul>
        
        <h2>Pendaftaran</h2>
        <p>Kuota terbatas untuk 100 peserta. Daftar segera melalui:</p>
        <ul>
          <li>WhatsApp: 081234567890</li>
          <li>Email: seminar@rekaland.com</li>
          <li>Website: www.rekaland.com/seminar-properti</li>
        </ul>
        
        <p>Investasi properti yang tepat bisa memberikan keuntungan yang maksimal. Ikuti seminar ini untuk memperluas wawasan dan jaringan Anda di bidang properti!</p>
      </div>
    `,
    date: "22 Juni 2023",
    location: "Hotel Grand Lampung"
  },
  "promo-akhir-tahun": {
    title: "Promo Akhir Tahun",
    content: `
      <div class="prose max-w-none">
        <p>Menjelang penutupan tahun 2023, Rekaland Indonesia menghadirkan promo spesial akhir tahun untuk semua produk properti kami. Ini adalah kesempatan terbaik untuk memiliki properti impian dengan berbagai keuntungan dan bonus menarik!</p>
        
        <h2>Periode Promo</h2>
        <p>1 Desember 2023 - 31 Desember 2023</p>
        
        <h2>Promo Kavling Kosongan</h2>
        <ul>
          <li>Diskon hingga 25% untuk pembelian cash keras</li>
          <li>Diskon 15% untuk pembelian cash bertahap</li>
          <li>DP mulai 10% dengan cicilan hingga 60 bulan</li>
          <li>Free biaya administrasi dan balik nama</li>
          <li>Bonus fence block untuk setiap pembelian kavling di Cisarua Hills dan Green Valley</li>
        </ul>
        
        <h2>Promo Kavling Setengah Jadi</h2>
        <ul>
          <li>Diskon hingga 20% untuk pembelian cash keras</li>
          <li>DP mulai 15% dengan cicilan hingga 10 tahun</li>
          <li>Free upgrade material finishing (lantai, plafon, dll)</li>
          <li>Bonus carport dan taman</li>
          <li>Gratis desain interior untuk 1 ruangan</li>
        </ul>
        
        <h2>Promo Rumah Siap Huni</h2>
        <ul>
          <li>Diskon hingga 15% untuk pembelian cash keras</li>
          <li>DP mulai 20% dengan KPR hingga 15 tahun</li>
          <li>Free AC 1 PK untuk 2 kamar</li>
          <li>Free water heater dan kitchen set</li>
          <li>Free iuran maintenance selama 1 tahun</li>
          <li>Bonus elektronik senilai hingga Rp 25 juta</li>
        </ul>
        
        <h2>Cara Mendapatkan Promo</h2>
        <p>Kunjungi kantor pemasaran Rekaland di:</p>
        <ul>
          <li>Kantor Pusat: Jl. Raya Utama No. 123, Bandar Lampung</li>
          <li>Kantor Cabang Cisarua: Jl. Raya Cisarua No. 88, Lampung Selatan</li>
          <li>Kantor Cabang Green Valley: Jl. Terusan Ryacudu No. 45, Lampung Timur</li>
        </ul>
        
        <p>Atau hubungi marketing kami di:</p>
        <ul>
          <li>Telepon/WhatsApp: 081234567890</li>
          <li>Email: marketing@rekaland.com</li>
        </ul>
        
        <h2>Syarat dan Ketentuan</h2>
        <ul>
          <li>Promo berlaku untuk pembelian selama periode promo</li>
          <li>Pembayaran booking fee harus dilakukan sebelum 31 Desember 2023</li>
          <li>Tidak dapat digabungkan dengan promo lainnya</li>
          <li>Syarat dan ketentuan lengkap berlaku</li>
        </ul>
        
        <p>Jangan lewatkan kesempatan emas ini! Miliki properti impian Anda sekarang dengan harga terbaik dan bonus melimpah dari Rekaland Indonesia.</p>
      </div>
    `,
    date: "1 Desember 2023",
    location: "Seluruh Cabang Rekaland"
  }
};

const ContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { content, loading, error } = useContentBySlug(slug || "");
  
  // Gunakan data sampel jika konten dari database tidak ditemukan
  const sampleContent = slug ? sampleContents[slug] : null;
  
  // Redirect jika slug tidak ada
  useEffect(() => {
    if (!slug) {
      navigate('/informasi', { replace: true });
    }
  }, [slug, navigate]);

  if (!slug) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Slug halaman tidak ditemukan
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : content ? (
          <ContentDisplay 
            slug={slug} 
            fallbackContent={null} 
          />
        ) : sampleContent ? (
          <div>
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/informasi')}
                className="mb-6"
              >
                &larr; Kembali ke Informasi
              </Button>
              <h1 className="text-3xl font-bold mb-2">{sampleContent.title}</h1>
              {sampleContent.date && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {sampleContent.date}
                </div>
              )}
              {sampleContent.location && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {sampleContent.location}
                </div>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: sampleContent.content }} />
            <div className="mt-8 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => navigate('/informasi')}
              >
                &larr; Kembali ke Informasi
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Konten Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-8">
              Halaman yang Anda cari tidak tersedia. Silakan kembali ke halaman informasi.
            </p>
            <Button onClick={() => navigate('/informasi')}>
              Kembali ke Halaman Informasi
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ContentPage;

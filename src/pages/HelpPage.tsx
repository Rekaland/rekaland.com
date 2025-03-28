
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const HelpPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Pusat Bantuan</h1>
          <p className="text-gray-600 mb-8">Temukan jawaban atas pertanyaan umum tentang REKALAND</p>
          
          <div className="relative mb-12">
            <Input 
              placeholder="Cari pertanyaan atau topik..." 
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Kategori Bantuan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Akun Pengguna</span>
                <span className="text-sm text-gray-500">Pengaturan akun & profil</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Produk</span>
                <span className="text-sm text-gray-500">Informasi tentang kavling</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Pembelian</span>
                <span className="text-sm text-gray-500">Proses transaksi properti</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Pembayaran</span>
                <span className="text-sm text-gray-500">Metode & ketentuan pembayaran</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Dokumen</span>
                <span className="text-sm text-gray-500">Informasi legalitas</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-lg font-medium">Lainnya</span>
                <span className="text-sm text-gray-500">Bantuan umum</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Bagaimana cara mendaftar akun di REKALAND?</AccordionTrigger>
                <AccordionContent>
                  Untuk mendaftar akun di REKALAND, klik tombol "Daftar" di pojok kanan atas halaman. Isi formulir pendaftaran dengan nama lengkap, email, dan password. Setelah itu, Anda akan menerima email konfirmasi untuk verifikasi akun.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Apa saja jenis properti yang ditawarkan REKALAND?</AccordionTrigger>
                <AccordionContent>
                  REKALAND menawarkan tiga jenis properti utama: Kavling Kosongan (tanah siap bangun), Kavling Setengah Jadi (tanah dengan pondasi atau struktur awal), dan Kavling Siap Huni (properti yang sudah terbangun dan siap ditempati).
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Bagaimana cara melakukan pembelian properti di REKALAND?</AccordionTrigger>
                <AccordionContent>
                  Untuk membeli properti, pertama pilih properti yang diminati, lalu klik tombol "Pesan Sekarang". Anda akan diarahkan ke halaman pemesanan di mana Anda dapat melihat detail harga dan pembayaran. Setelah melengkapi informasi pembayaran, tim kami akan menghubungi Anda untuk proses selanjutnya.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Apa metode pembayaran yang tersedia di REKALAND?</AccordionTrigger>
                <AccordionContent>
                  REKALAND menerima berbagai metode pembayaran termasuk transfer bank, pembayaran melalui kartu kredit/debit, dan cicilan KPR melalui bank partner kami. Detail lebih lanjut dapat dilihat pada halaman metode pembayaran atau saat proses checkout.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Apa saja dokumen yang saya terima setelah membeli properti?</AccordionTrigger>
                <AccordionContent>
                  Setelah pembelian, Anda akan menerima bukti pembayaran, Perjanjian Jual Beli (PJB), dan dokumen kepemilikan sesuai dengan jenis properti yang dibeli. Untuk tanah kavling, Anda akan menerima Sertifikat Hak Milik (SHM) atau Sertifikat Hak Guna Bangunan (SHGB).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Masih Memiliki Pertanyaan?</h3>
            <p className="text-gray-600 mb-4">Tim dukungan kami siap membantu Anda</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>Hubungi Kami</Button>
              <Button variant="outline">Kirim Email</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;

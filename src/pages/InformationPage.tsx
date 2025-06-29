import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Newspaper, BadgeInfo, Clock, MapPin, ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useContentBySlug } from "@/hooks/useContentBySlug";
import { useToast } from "@/hooks/use-toast";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import { supabase } from "@/integrations/supabase/client";

// Interface untuk struktur data
interface News {
  id: number;
  title: string;
  date: string;
  slug: string;
  summary: string;
  image: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  slug: string;
  description: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const InformationPage = () => {
  const [activeTab, setActiveTab] = useState("news");
  const { toast } = useToast();
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Define loadContents as useCallback to prevent linting warnings
  const loadContents = useCallback(async () => {
    try {
      setLoading(true);
      
      // Di masa depan, kita akan mengambil data dari tabel contents
      // dan memisahkannya berdasarkan kategori (news, events, faq)
      
      // Untuk saat ini, kita gunakan data sampel
      setNews([
        {
          id: 1,
          title: "Pertumbuhan Properti di Lampung Meningkat",
          date: "21 Mei 2023",
          slug: "pertumbuhan-properti-lampung",
          summary: "Pasar properti di Lampung menunjukkan peningkatan yang signifikan dalam 6 bulan terakhir. Kavling-kavling strategis menjadi incaran investor.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUzMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        },
        {
          id: 2,
          title: "Rekaland Membuka Kavling Baru di Cisarua",
          date: "10 April 2023",
          slug: "kavling-baru-cisarua",
          summary: "Rekaland Indonesia membuka area pengembangan baru di kawasan Cisarua dengan harga penawaran khusus untuk pembeli pertama.",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        },
        {
          id: 3,
          title: "Tips Memilih Kavling Untuk Investasi",
          date: "5 Maret 2023",
          slug: "tips-memilih-kavling-investasi",
          summary: "Memilih kavling untuk investasi memerlukan pertimbangan yang matang. Berikut beberapa tips dari para pakar properti.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMjg1MTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        }
      ]);
      
      setEvents([
        {
          id: 1,
          title: "Open House Kavling Cisarua",
          date: "15 Juni 2023",
          location: "Cisarua, Lampung Selatan",
          slug: "open-house-kavling-cisarua",
          description: "Acara open house untuk memperkenalkan kavling-kavling terbaru di kawasan Cisarua."
        },
        {
          id: 2,
          title: "Seminar Investasi Properti",
          date: "22 Juni 2023",
          location: "Hotel Grand Lampung",
          slug: "seminar-investasi-properti",
          description: "Seminar tentang strategi investasi properti di masa kini dengan pembicara para pakar properti nasional."
        },
        {
          id: 3,
          title: "Promo Akhir Tahun",
          date: "1 Desember 2023",
          location: "Seluruh Cabang Rekaland",
          slug: "promo-akhir-tahun",
          description: "Dapatkan harga spesial dan bonus menarik untuk pembelian kavling di akhir tahun."
        }
      ]);
      
      setFAQs([
        {
          id: 1,
          question: "Bagaimana cara memulai investasi di Rekaland?",
          answer: "Anda bisa menghubungi tim marketing kami melalui WhatsApp, atau datang langsung ke kantor kami. Tim kami akan membantu memberikan konsultasi dan pilihan properti sesuai kebutuhan Anda."
        },
        {
          id: 2,
          question: "Apakah legalitas properti di Rekaland terjamin?",
          answer: "Ya, semua properti di Rekaland sudah memiliki dokumen legal yang jelas seperti Sertifikat Hak Milik (SHM) atau Hak Guna Bangunan (HGB). Kami juga membantu pengurusan dokumen yang dibutuhkan."
        },
        {
          id: 3,
          question: "Apakah ada cicilan untuk pembelian properti?",
          answer: "Ya, Rekaland menawarkan skema pembayaran yang fleksibel mulai dari tunai keras, tunai bertahap, hingga cicilan. Kami juga bekerjasama dengan beberapa bank untuk KPR."
        },
        {
          id: 4,
          question: "Berapa lama proses serah terima properti?",
          answer: "Proses serah terima bergantung pada jenis properti yang Anda beli. Untuk kavling kosongan biasanya bisa langsung setelah pembayaran pertama, sedangkan untuk properti siap huni membutuhkan waktu untuk pengurusan dokumen."
        },
        {
          id: 5,
          question: "Apakah ada biaya perawatan tambahan?",
          answer: "Untuk kavling siap huni dan beberapa lokasi tertentu, ada biaya maintenance yang dikelola oleh manajemen estate untuk menjaga fasilitas umum dan keamanan."
        }
      ]);
    } catch (error: any) {
      console.error('Error loading content:', error);
      toast({
        title: "Gagal memuat konten",
        description: "Terjadi kesalahan saat memuat konten informasi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Setup real-time sync untuk konten
  const { isSubscribed } = useRealTimeSync('contents', loadContents);
  
  // Load konten saat komponen dimuat
  useEffect(() => {
    loadContents();
  }, [loadContents]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Informasi</h1>
        <p className="text-gray-600 text-center mb-10">Berita terbaru, event, dan informasi penting lainnya</p>
        
        <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="news" className="flex items-center justify-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Berita Terbaru</span>
              <span className="sm:hidden">Berita</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Acara Mendatang</span>
              <span className="sm:hidden">Acara</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center justify-center gap-2">
              <BadgeInfo className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-600 text-sm">{item.summary}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link to={`/konten/${item.slug}`} className="w-full">
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center text-sm text-rekaland-orange font-medium mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/konten/${event.slug}`} className="w-full">
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        Detail Acara
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-rekaland-orange" />
                  Pertanyaan Umum
                </CardTitle>
                <CardDescription>
                  Pertanyaan yang sering ditanyakan oleh klien kami
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InformationPage;

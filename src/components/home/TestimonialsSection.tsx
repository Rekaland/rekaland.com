
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Testimonial data type
interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const TestimonialsSection = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Dian Sastro",
      role: "Pengusaha",
      text: "Membeli tanah kavling melalui Rekaland adalah keputusan terbaik saya. Prosesnya cepat, transparan, dan mereka membantu dengan semua dokumen yang diperlukan.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Rizky Febian",
      role: "Musisi",
      text: "Sebagai investor properti pemula, saya sangat terbantu dengan konsultasi yang diberikan tim Rekaland. Mereka memberikan pilihan investasi yang sesuai dengan budget saya.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Maudy Ayunda",
      role: "Akademisi",
      text: "Lokasi kavling yang ditawarkan Rekaland sangat strategis dan memiliki potensi kenaikan nilai yang menjanjikan. Sangat direkomendasikan!",
      image: "https://i.pravatar.cc/150?img=3"
    }
  ];

  // Auto-scroll testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialRef.current) {
        testimonialRef.current.scrollBy({
          left: testimonialRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Apa Kata <span className="text-rekaland-orange">Klien Kami</span></h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">Pengalaman dan cerita sukses dari klien yang telah berinvestasi bersama Rekaland</p>
        </div>
        
        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent ref={testimonialRef}>
            {testimonials.map(testimonial => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="text-center p-6 border-0 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 h-full">
                  <div className="mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="inline-block w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm italic line-clamp-3">"{testimonial.text}"</p>
                  <div className="flex items-center justify-center mt-auto">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div className="text-left">
                      <div className="font-bold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex items-center justify-center mt-4">
            <CarouselPrevious className="relative -left-0 top-0 translate-y-0 mx-1" />
            <CarouselNext className="relative -right-0 top-0 translate-y-0 mx-1" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;

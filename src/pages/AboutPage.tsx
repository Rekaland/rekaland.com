
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="py-16 bg-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-rekaland-black">
              Tentang REKA<span className="text-rekaland-orange">LAND</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform terdepan di Indonesia yang menyediakan kavling tanah berkualitas 
              untuk investasi dan tempat tinggal impian Anda.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16 border-t">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
              <p className="text-gray-600 mb-4">
                Didirikan pada tahun 2015, REKALAND berawal dari visi sederhana untuk menyediakan properti tanah 
                berkualitas yang dapat diakses oleh semua kalangan. Kami percaya bahwa memiliki sebidang tanah adalah 
                fondasi yang kuat untuk masa depan yang lebih baik.
              </p>
              <p className="text-gray-600">
                Dengan pengalaman lebih dari 8 tahun dalam industri properti, 
                tim kami telah membantu ribuan keluarga menemukan tanah kavling sempurna untuk 
                membangun rumah impian mereka atau sebagai investasi jangka panjang yang menguntungkan.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                alt="REKALAND Office" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Misi Kami</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Memberikan solusi properti tanah terbaik dengan integritas, transparansi, dan layanan profesional 
                untuk membangun masa depan yang lebih baik bagi masyarakat Indonesia.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rekaland-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 12 15c-2.795 0-5.3-1.275-6.989-3.276A8.993 8.993 0 0 0 6 19.5a9.005 9.005 0 0 0 9.932 8.612A8.993 8.993 0 0 1 12 21" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Keberlanjutan</h3>
                <p className="text-gray-600 text-center">
                  Kami berkomitmen untuk mengembangkan properti yang ramah lingkungan dan berkelanjutan 
                  untuk generasi masa depan.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rekaland-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Komunitas</h3>
                <p className="text-gray-600 text-center">
                  Kami membangun lebih dari sekadar properti; kami menciptakan komunitas yang tumbuh 
                  bersama dan saling mendukung.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rekaland-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Keluarga</h3>
                <p className="text-gray-600 text-center">
                  Dengan fokus pada kebutuhan keluarga Indonesia, kami menyediakan kavling yang aman, 
                  strategis, dan ideal untuk rumah idaman.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Didukung oleh profesional berpengalaman yang berkomitmen untuk memberikan layanan terbaik.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {name: "Budi Santoso", position: "CEO & Founder", image: "https://i.pravatar.cc/300?img=10"},
              {name: "Dian Purnama", position: "Chief Marketing Officer", image: "https://i.pravatar.cc/300?img=24"},
              {name: "Andi Pratama", position: "Head of Operations", image: "https://i.pravatar.cc/300?img=12"},
              {name: "Siti Rahayu", position: "Customer Relations", image: "https://i.pravatar.cc/300?img=33"}
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 rounded-full overflow-hidden inline-block">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-40 h-40 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Siap untuk memulai perjalanan mencari kavling impian Anda? Tim kami siap membantu.
            </p>
            <Link to="/tentang#kontak">
              <Button className="bg-rekaland-orange hover:bg-orange-600 text-white">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;

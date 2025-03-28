
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-rekaland-orange">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link to="/">
          <Button className="bg-rekaland-orange hover:bg-orange-600 text-white">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;

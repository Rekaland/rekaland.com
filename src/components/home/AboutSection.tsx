
import React from "react";
import ContentDisplay from "@/components/content/ContentDisplay";
import { Button } from "@/components/ui/button";

const fallbackContent = (
  <>
    <h1 className="text-3xl font-bold mb-6">Tentang REKALAND</h1>
    <div className="prose max-w-none">
      <p className="text-lg mb-4">
        REKALAND adalah penyedia properti terpercaya dengan pengalaman di industri properti Indonesia, berfokus pada kebutuhan keluarga Indonesia.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Visi & Misi</h2>
      <p className="mb-4">
        <strong>Visi:</strong> Menjadi perusahaan properti terdepan yang memberikan solusi hunian berkualitas untuk seluruh masyarakat Indonesia.
      </p>
      <p>
        <strong>Misi:</strong> Menyediakan properti berkualitas dengan harga kompetitif dan lokasi strategis untuk memenuhi kebutuhan konsumen.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Mengapa Memilih Kami</h2>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Lokasi strategis dengan akses mudah</li>
        <li className="mb-2">Legalitas properti yang jelas dan aman</li>
        <li className="mb-2">Konsultasi gratis dengan tim ahli properti</li>
        <li className="mb-2">Fleksibilitas pembayaran dengan cicilan</li>
        <li>Pelayanan purna jual yang memuaskan</li>
      </ul>
    </div>
    
    <div className="mt-8">
      <Button className="bg-rekaland-orange hover:bg-orange-600">Hubungi Kami</Button>
    </div>
  </>
);

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ContentDisplay slug="about" fallbackContent={fallbackContent} />
      </div>
    </section>
  );
};

export default AboutSection;

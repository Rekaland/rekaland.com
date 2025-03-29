
import React from "react";
import { ArrowRight, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ConnectionHelp = () => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Info size={16} className="text-blue-500" />
        Petunjuk Koneksi Supabase
      </h4>
      
      <Alert className="bg-blue-50 border-blue-200 mb-3">
        <AlertDescription className="text-blue-800 text-sm">
          Website sudah dikonfigurasi untuk terhubung ke Supabase. Anda hanya perlu mengklik tombol "Hubungkan ke Supabase" di atas untuk mengaktifkan koneksi.
        </AlertDescription>
      </Alert>
      
      <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-2">
        <li className="flex items-start">
          <span className="mr-2">1.</span>
          <div>
            <span className="font-medium">Koneksi Otomatis:</span> Klik tombol "Hubungkan ke Supabase" di atas untuk menghubungkan langsung ke project yang sudah dikonfigurasi
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-2">2.</span>
          <div>
            <span className="font-medium">Verifikasi Koneksi:</span> Setelah terhubung, periksa status tabel untuk memastikan semua tabel tersedia
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-2">3.</span>
          <div>
            <span className="font-medium">Sinkronisasi Data:</span> Klik "Sinkronisasi Ulang" setelah terhubung untuk memastikan data terintegrasi
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-2">4.</span>
          <div>
            <span className="font-medium">Publikasi:</span> Setelah terhubung, kembali ke tab "Status" dan klik "Publikasikan Sekarang"
          </div>
        </li>
      </ol>
      
      <div className="mt-4 text-sm text-gray-700">
        <p className="font-medium mb-1">Status saat ini:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Website sudah dikonfigurasi dengan kredensial Supabase yang benar</li>
          <li>Struktur database dan tabel sudah siap digunakan</li>
          <li>Hanya perlu mengaktifkan koneksi melalui tombol "Hubungkan"</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionHelp;

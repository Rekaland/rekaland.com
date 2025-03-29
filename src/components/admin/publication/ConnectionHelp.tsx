
import React from "react";

const ConnectionHelp = () => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-semibold mb-2">Petunjuk Koneksi Supabase</h4>
      <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
        <li>Buat akun di Supabase.com jika belum punya</li>
        <li>Buat project baru di dashboard Supabase</li>
        <li>Salin Project ID dari URL dashboard Supabase</li>
        <li>Salin API URL dari halaman Settings &gt; API</li>
        <li>Salin anon/public API key dari halaman yang sama</li>
        <li>Masukkan informasi di atas dan klik "Hubungkan ke Supabase"</li>
      </ol>
    </div>
  );
};

export default ConnectionHelp;

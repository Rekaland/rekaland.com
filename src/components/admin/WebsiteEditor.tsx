
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Globe, Pencil } from "lucide-react";

const WebsiteEditor = () => {
  const [changeHistory] = useState([
    { id: 1, page: "Beranda", user: "Admin User", timestamp: "12 Jun 2023 09:15", type: "Konten Update" },
    { id: 2, page: "Tentang Kami", user: "Admin User", timestamp: "10 Jun 2023 14:30", type: "Layout Update" },
    { id: 3, page: "Produk", user: "Admin User", timestamp: "8 Jun 2023 11:20", type: "Konten Update" },
    { id: 4, page: "Beranda", user: "Admin User", timestamp: "5 Jun 2023 16:45", type: "Gambar Update" },
    { id: 5, page: "Informasi", user: "Admin User", timestamp: "3 Jun 2023 10:05", type: "Konten Update" }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Editor Website</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button>
            <Globe size={16} className="mr-2" />
            Publikasikan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Visual Editor</CardTitle>
              <CardDescription>Sunting tampilan website dengan drag and drop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-md p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Pencil className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Editor Visual sedang dimuat...</p>
                  <Button className="mt-4">Masuk ke Editor</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Editor Kode</CardTitle>
              <CardDescription>Sunting kode HTML, CSS, dan JavaScript</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-md h-60 overflow-auto">
                <pre>{`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REKALAND - Solusi Properti Anda</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header>
    <nav>
      <!-- Navigasi -->
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h1>REKALAND</h1>
      <p>Solusi properti terbaik untuk keluarga Indonesia</p>
      <button>Jelajahi Sekarang</button>
    </section>
    
    <!-- Konten lainnya -->
  </main>
  
  <footer>
    <!-- Footer -->
  </footer>
</body>
</html>`}</pre>
              </div>
              <div className="flex justify-end mt-4">
                <Button>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Opsi Publikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="publish-status">Status</Label>
                  <select id="publish-status" className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="publish-date">Tanggal Publikasi</Label>
                  <Input id="publish-date" type="datetime-local" />
                </div>
                <Button className="w-full">Publikasikan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Perubahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {changeHistory.map(change => (
                  <div key={change.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{change.page}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{change.type}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">{change.user}</span>
                      <span className="text-gray-500">{change.timestamp}</span>
                    </div>
                    <div className="flex mt-2">
                      <Button variant="outline" size="sm" className="text-xs">Lihat Perubahan</Button>
                      <Button variant="ghost" size="sm" className="text-xs ml-2">Kembalikan</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;

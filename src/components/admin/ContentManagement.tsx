
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Eye } from "lucide-react";
import { Plus } from "@/components/admin/Icons";

const ContentManagement = () => {
  const [pages] = useState([
    { id: 1, title: "Beranda", slug: "/", lastEdited: "12 Jun 2023", status: "Published" },
    { id: 2, title: "Tentang Kami", slug: "/tentang", lastEdited: "5 Jun 2023", status: "Published" },
    { id: 3, title: "Produk", slug: "/produk", lastEdited: "8 Jun 2023", status: "Published" },
    { id: 4, title: "Kavling Kosongan", slug: "/produk/kavling-kosongan", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 5, title: "Kavling Setengah Jadi", slug: "/produk/kavling-setengah-jadi", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 6, title: "Kavling Siap Huni", slug: "/produk/kavling-siap-huni", lastEdited: "10 Jun 2023", status: "Published" },
    { id: 7, title: "Informasi", slug: "/informasi", lastEdited: "7 Jun 2023", status: "Published" }
  ]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Kelola Konten</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Tambah Halaman Baru
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page.id} className="hover:bg-gray-50">
                <TableCell>{page.id}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.lastEdited}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {page.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye size={14} className="mr-1" />
                      Lihat
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Konten</CardTitle>
          <CardDescription>Sunting halaman website</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="page-title">Judul Halaman</Label>
              <Input id="page-title" defaultValue="Beranda" />
            </div>
            
            <div>
              <Label htmlFor="page-slug">URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-sm">
                  example.com/
                </span>
                <Input id="page-slug" className="rounded-l-none" defaultValue="" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="page-content">Konten</Label>
              <Textarea id="page-content" rows={10} defaultValue="Selamat datang di REKALAND, solusi properti terbaik untuk keluarga Indonesia. Kami menyediakan berbagai pilihan properti mulai dari kavling kosongan, setengah jadi, hingga siap huni dengan harga kompetitif dan lokasi strategis." />
            </div>
            
            <div>
              <Label>SEO Meta Description</Label>
              <Textarea rows={3} defaultValue="REKALAND - Solusi properti terbaik untuk keluarga Indonesia. Kavling kosongan, setengah jadi, siap huni dengan harga terjangkau." />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Batal</Button>
              <Button>Simpan & Publikasikan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;

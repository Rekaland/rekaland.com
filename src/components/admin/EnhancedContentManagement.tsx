
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Plus, Edit, Trash2, Eye, 
  FileText, Image, Link, ArrowDownUp 
} from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockPages = [
  { id: 1, title: 'Beranda', status: 'published', lastUpdated: '2023-08-15', type: 'page' },
  { id: 2, title: 'Tentang Kami', status: 'published', lastUpdated: '2023-07-22', type: 'page' },
  { id: 3, title: 'Properti Terbaru', status: 'draft', lastUpdated: '2023-08-10', type: 'list' },
  { id: 4, title: 'Kontak', status: 'published', lastUpdated: '2023-08-05', type: 'page' },
  { id: 5, title: 'Blog: Tips Investasi', status: 'draft', lastUpdated: '2023-08-18', type: 'article' },
  { id: 6, title: 'Testimoni', status: 'scheduled', lastUpdated: '2023-08-20', type: 'component' },
];

const mockArticles = [
  { id: 1, title: 'Cara Investasi Properti untuk Pemula', status: 'published', lastUpdated: '2023-08-12', author: 'Ahmad' },
  { id: 2, title: 'Tips Memilih Lokasi Strategis', status: 'published', lastUpdated: '2023-07-15', author: 'Budi' },
  { id: 3, title: '5 Kesalahan Investor Properti', status: 'draft', lastUpdated: '2023-08-17', author: 'Citra' },
  { id: 4, title: 'Panduan KPR untuk Milenial', status: 'scheduled', lastUpdated: '2023-08-22', author: 'Dani' },
];

const mockComponents = [
  { id: 1, title: 'Hero Banner', status: 'published', lastUpdated: '2023-08-01', type: 'global' },
  { id: 2, title: 'Featured Properties', status: 'published', lastUpdated: '2023-08-05', type: 'list' },
  { id: 3, title: 'Testimonial Slider', status: 'published', lastUpdated: '2023-07-28', type: 'dynamic' },
  { id: 4, title: 'Newsletter Form', status: 'draft', lastUpdated: '2023-08-15', type: 'form' },
];

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800",
  archived: "bg-gray-100 text-gray-800"
};

const EnhancedContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [contentFilter, setContentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const openEditor = (item) => {
    setCurrentItem(item);
    setIsEditorOpen(true);
  };
  
  const handleSave = () => {
    toast.success("Konten berhasil disimpan!");
    setIsEditorOpen(false);
  };
  
  const handlePublish = (id) => {
    toast.success("Konten berhasil dipublikasikan!");
  };
  
  const handleDelete = (id) => {
    toast.success("Konten berhasil dihapus!");
  };
  
  const handlePreview = (id) => {
    toast.info("Membuka pratinjau dalam tab baru...");
  };

  const renderStatusBadge = (status) => {
    return (
      <Badge variant="outline" className={statusColors[status]}>
        {status === 'published' && 'Dipublikasikan'}
        {status === 'draft' && 'Draf'}
        {status === 'scheduled' && 'Terjadwal'}
        {status === 'archived' && 'Diarsipkan'}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="pages">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="pages">Halaman</TabsTrigger>
            <TabsTrigger value="articles">Artikel</TabsTrigger>
            <TabsTrigger value="components">Komponen</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari konten..."
                className="pl-8 w-full md:w-[200px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="published">Dipublikasikan</SelectItem>
                <SelectItem value="draft">Draf</SelectItem>
                <SelectItem value="scheduled">Terjadwal</SelectItem>
                <SelectItem value="archived">Diarsipkan</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  Tambah Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Editor Konten</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 overflow-auto p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Judul</label>
                      <Input placeholder="Masukkan judul" defaultValue={currentItem?.title || ''} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select defaultValue="draft">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Dipublikasikan</SelectItem>
                          <SelectItem value="draft">Draf</SelectItem>
                          <SelectItem value="scheduled">Terjadwal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Konten</label>
                    <div className="border rounded-md p-1">
                      <div className="flex items-center border-b p-2 gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Image size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Link size={16} />
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Tulis konten Anda di sini..."
                        className="min-h-[300px] border-0 focus-visible:ring-0 resize-none"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                    Batal
                  </Button>
                  <Button variant="default" onClick={handleSave}>
                    Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="pages" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Judul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPages
                .filter(page => 
                  (statusFilter === "all" || page.status === statusFilter) &&
                  (page.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "")
                )
                .map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{renderStatusBadge(page.status)}</TableCell>
                    <TableCell>{page.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {page.type === 'page' && 'Halaman'}
                        {page.type === 'list' && 'Daftar'}
                        {page.type === 'article' && 'Artikel'}
                        {page.type === 'component' && 'Komponen'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(page.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditor(page)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="articles" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Judul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockArticles
                .filter(article => 
                  (statusFilter === "all" || article.status === statusFilter) &&
                  (article.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "")
                )
                .map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{renderStatusBadge(article.status)}</TableCell>
                    <TableCell>{article.lastUpdated}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(article.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditor(article)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="components" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nama Komponen</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockComponents
                .filter(component => 
                  (statusFilter === "all" || component.status === statusFilter) &&
                  (component.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "")
                )
                .map((component) => (
                  <TableRow key={component.id}>
                    <TableCell className="font-medium">{component.title}</TableCell>
                    <TableCell>{renderStatusBadge(component.status)}</TableCell>
                    <TableCell>{component.lastUpdated}</TableCell>
                    <TableCell>{component.type}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(component.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditor(component)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(component.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedContentManagement;

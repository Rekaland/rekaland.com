
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  X,
  MoveUp,
  MoveDown
} from "lucide-react";

type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
};

const ProjectKnowledge = () => {
  const { toast } = useToast();
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: "1",
      title: "Informasi Properti",
      content: "Rekaland menyediakan tiga jenis properti: kavling kosongan, kavling setengah jadi, dan kavling siap huni."
    },
    {
      id: "2",
      title: "Kontak",
      content: "Untuk pertanyaan lebih lanjut, hubungi kami di info@rekaland.com atau +62 821-7796-8062."
    }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingTitle("");
    setEditingContent("");
    setEditingId(null);
  };
  
  const handleEdit = (item: KnowledgeItem) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
    setEditingContent(item.content);
    setIsAddingNew(false);
  };
  
  const handleDelete = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id));
    toast({
      title: "Item dihapus",
      description: "Item pengetahuan proyek berhasil dihapus",
      duration: 1000,
      className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0",
    });
  };
  
  const handleSave = () => {
    if (!editingTitle.trim() || !editingContent.trim()) {
      toast({
        title: "Error",
        description: "Judul dan konten tidak boleh kosong",
        duration: 1000,
        variant: "destructive"
      });
      return;
    }
    
    if (isAddingNew) {
      const newItem: KnowledgeItem = {
        id: `knowledge-${Date.now()}`,
        title: editingTitle,
        content: editingContent
      };
      setKnowledgeItems([...knowledgeItems, newItem]);
      toast({
        title: "Item ditambahkan",
        description: "Item pengetahuan proyek baru berhasil ditambahkan",
        duration: 1000,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0",
      });
    } else if (editingId) {
      setKnowledgeItems(knowledgeItems.map(item => 
        item.id === editingId 
          ? { ...item, title: editingTitle, content: editingContent } 
          : item
      ));
      toast({
        title: "Item diperbarui",
        description: "Item pengetahuan proyek berhasil diperbarui",
        duration: 1000,
        className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0",
      });
    }
    
    setIsAddingNew(false);
    setEditingId(null);
  };
  
  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
  };
  
  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = knowledgeItems.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === knowledgeItems.length - 1)
    ) {
      return;
    }
    
    const newItems = [...knowledgeItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setKnowledgeItems(newItems);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Pengetahuan Proyek
            </CardTitle>
            <CardDescription>
              Tambahkan pengetahuan khusus untuk proyek ini
            </CardDescription>
          </div>
          <Button 
            onClick={handleAddNew}
            className="gap-1"
            disabled={isAddingNew || editingId !== null}
          >
            <Plus className="h-4 w-4" />
            Tambah Baru
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {(isAddingNew || editingId !== null) ? (
          <div className="border rounded-md p-4 mb-4">
            <h3 className="font-medium text-lg mb-2">
              {isAddingNew ? "Tambah Pengetahuan Baru" : "Edit Pengetahuan"}
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="knowledge-title" className="block text-sm font-medium mb-1">
                  Judul
                </label>
                <Input
                  id="knowledge-title"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  placeholder="Masukkan judul pengetahuan"
                />
              </div>
              <div>
                <label htmlFor="knowledge-content" className="block text-sm font-medium mb-1">
                  Konten
                </label>
                <Textarea
                  id="knowledge-content"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={6}
                  placeholder="Masukkan konten pengetahuan"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Batal
                </Button>
                <Button
                  onClick={handleSave}
                  className="gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Save className="h-4 w-4" />
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {knowledgeItems.length === 0 ? (
              <div className="text-center py-8">
                <Book className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">Belum ada pengetahuan proyek yang ditambahkan</p>
                <Button 
                  variant="outline" 
                  onClick={handleAddNew}
                  className="mt-4"
                >
                  Tambah Pengetahuan Pertama
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {knowledgeItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={knowledgeItems.indexOf(item) === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                          <span className="sr-only">Pindah ke atas</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={knowledgeItems.indexOf(item) === knowledgeItems.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                          <span className="sr-only">Pindah ke bawah</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0 text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectKnowledge;

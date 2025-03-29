
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, Plus, Move, Edit, Copy } from 'lucide-react';

interface PageEditorProps {
  pageId: string;
  device: string;
}

interface ElementProps {
  id: string;
  type: string;
  content: string;
  styles?: any;
}

const PageEditor: React.FC<PageEditorProps> = ({ pageId, device }) => {
  const { toast } = useToast();
  const [elements, setElements] = useState<ElementProps[]>([
    { 
      id: 'header-1',
      type: 'header',
      content: 'REKALAND',
      styles: { 
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF' 
      }
    },
    { 
      id: 'paragraph-1',
      type: 'paragraph',
      content: 'Solusi properti terbaik untuk keluarga Indonesia',
      styles: { 
        fontSize: '18px', 
        textAlign: 'center',
        marginTop: '16px',
        color: '#FFFFFF'
      }
    },
    { 
      id: 'button-1',
      type: 'button',
      content: 'Jelajahi Sekarang',
      styles: { 
        padding: '10px 20px',
        backgroundColor: '#f97316',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginTop: '24px',
        cursor: 'pointer'
      }
    }
  ]);
  
  const [activeElement, setActiveElement] = useState<string | null>(null);
  
  const handleElementClick = (id: string) => {
    setActiveElement(id);
    toast({
      title: "Elemen dipilih",
      description: `Anda dapat mengedit elemen ini sekarang`,
      duration: 1500,
    });
  };
  
  const handleElementDelete = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setActiveElement(null);
    toast({
      title: "Elemen dihapus",
      description: `Elemen berhasil dihapus dari halaman`,
      duration: 1500,
    });
  };
  
  const handleElementDuplicate = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = { 
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}` 
      };
      setElements([...elements, newElement]);
      toast({
        title: "Elemen diduplikasi",
        description: `Elemen berhasil diduplikasi`,
        duration: 1500,
      });
    }
  };

  if (elements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <AlertCircle size={40} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">Halaman Kosong</h3>
        <p className="text-gray-500 mb-4">
          Halaman ini belum memiliki elemen. Tambahkan elemen dari panel sebelah kanan.
        </p>
        <Button>
          <Plus size={16} className="mr-2" />
          Tambah Elemen
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px] overflow-hidden">
      {/* Mock Hero Section Background */}
      <div 
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/placeholder.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          position: 'relative'
        }}
      >
        {/* Editable Elements */}
        {elements.map(element => (
          <div 
            key={element.id}
            onClick={() => handleElementClick(element.id)}
            className={`relative ${activeElement === element.id ? 'outline outline-2 outline-blue-500' : ''}`}
            style={{ cursor: 'pointer', maxWidth: '100%' }}
          >
            {/* Element Content */}
            {element.type === 'header' && (
              <h1 style={element.styles}>{element.content}</h1>
            )}
            {element.type === 'paragraph' && (
              <p style={element.styles}>{element.content}</p>
            )}
            {element.type === 'button' && (
              <button style={element.styles}>{element.content}</button>
            )}
            
            {/* Edit Controls - Show only when element is active */}
            {activeElement === element.id && (
              <div className="absolute -top-4 right-0 flex bg-white shadow-sm border rounded">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Move size={14} />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Edit size={14} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementDuplicate(element.id);
                  }}
                >
                  <Copy size={14} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-red-500 hover:text-red-600" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementDelete(element.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Drop Indicator - Only visible when dragging */}
      <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-dashed border-blue-400 pointer-events-none opacity-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded text-sm">
          Drop Here
        </div>
      </div>
    </div>
  );
};

export default PageEditor;

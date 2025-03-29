
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Archive, CheckCircle2, MessageSquare, Pencil, Plus, Search, Send, Star, Trash2, Users } from "lucide-react";
import { Separator } from '../ui/separator';

const MessagingCenter = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  
  const [messages] = useState([
    { 
      id: 1, 
      sender: "Budi Santoso", 
      email: "budi@example.com", 
      subject: "Pertanyaan tentang Kavling Premium",
      content: "Selamat pagi, saya tertarik dengan Kavling Premium di lokasi Jakarta Selatan. Bisa minta informasi lebih lanjut tentang harga dan cara pembayarannya?",
      date: "12 Jun 2023",
      time: "09:15",
      read: true,
      starred: false,
    },
    { 
      id: 2, 
      sender: "Siti Nurbaya", 
      email: "siti@example.com", 
      subject: "Status pembayaran properti",
      content: "Halo admin, saya sudah melakukan pembayaran DP untuk properti di Bandung. Boleh saya mendapatkan konfirmasi bahwa pembayaran sudah diterima dan apa langkah selanjutnya? Terima kasih.",
      date: "10 Jun 2023", 
      time: "14:30",
      read: false,
      starred: true,
    },
    { 
      id: 3, 
      sender: "Ahmad Hidayat", 
      email: "ahmad@example.com", 
      subject: "Jadwal survei lokasi",
      content: "Selamat siang, saya ingin membuat jadwal untuk survei lokasi properti di Yogyakarta minggu depan. Apakah ada slot yang tersedia? Saya fleksibel dari hari Senin sampai Jumat.",
      date: "8 Jun 2023", 
      time: "11:20",
      read: false,
      starred: false,
    },
    { 
      id: 4, 
      sender: "Linda Wijaya", 
      email: "linda@example.com", 
      subject: "Informasi fasilitas perumahan",
      content: "Halo, saya ingin menanyakan detail fasilitas untuk perumahan Green Valley. Apakah ada taman, kolam renang, atau fasilitas olahraga lainnya? Juga, apakah ada biaya maintenance bulanan? Terima kasih.",
      date: "5 Jun 2023", 
      time: "16:45",
      read: true,
      starred: false,
    },
    { 
      id: 5, 
      sender: "Dimas Permana", 
      email: "dimas@example.com", 
      subject: "Konsultasi investasi properti",
      content: "Selamat sore, saya tertarik untuk investasi properti di area Bali. Apakah bisa melakukan konsultasi dengan tim pemasaran Rekaland untuk diskusi lebih lanjut? Saya ingin mendiskusikan potensi ROI dan proyeksi nilai properti untuk 5 tahun ke depan.",
      date: "3 Jun 2023", 
      time: "10:05",
      read: true,
      starred: true,
    }
  ]);
  
  const handleClickMessage = (id: number) => {
    setSelectedMessage(id);
    
    // Mark message as read in a real app you would update this to your API
    // For now, we'll just show a toast to simulate the action
    if (messages.find(m => m.id === id)?.read === false) {
      toast({
        title: "Pesan ditandai telah dibaca",
        duration: 1500,
      });
    }
  };
  
  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Pesan kosong",
        description: "Silakan tulis balasan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Balasan terkirim!",
      description: "Pesan balasan berhasil dikirim",
      className: "bg-green-600 text-white",
    });
    
    setReplyText("");
  };
  
  const handleNewMessage = () => {
    toast({
      title: "Membuat pesan baru",
      description: "Form pesan baru telah dibuka",
    });
  };
  
  const handleDeleteMessage = (id: number) => {
    toast({
      title: "Pesan dihapus",
      description: "Pesan telah dihapus dari sistem",
      variant: "destructive",
    });
    
    if (selectedMessage === id) {
      setSelectedMessage(null);
    }
  };
  
  const handleStarMessage = (id: number) => {
    toast({
      title: "Status bintang diubah",
      description: "Status bintang pesan telah diperbarui",
    });
  };
  
  return (
    <div className="bg-white rounded-md shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px]">
        {/* Message Sidebar */}
        <div className="col-span-1 border-r">
          <div className="p-4">
            <Button 
              onClick={handleNewMessage}
              className="w-full mb-4 bg-green-600 hover:bg-green-700"
            >
              <Plus size={16} className="mr-2" />
              Pesan Baru
            </Button>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari pesan..." 
                className="pl-9 w-full bg-gray-50"
              />
            </div>
            
            <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                <TabsTrigger value="sent">Terkirim</TabsTrigger>
                <TabsTrigger value="drafts">Draft</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="overflow-auto h-[calc(600px-140px)]">
            {messages.map(message => (
              <div 
                key={message.id}
                onClick={() => handleClickMessage(message.id)}
                className={`p-3 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedMessage === message.id ? 'bg-gray-100' : ''
                } ${!message.read ? 'font-medium' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{message.sender}</h3>
                  <span className="text-xs text-gray-500">{message.date}</span>
                </div>
                <p className="text-sm truncate">{message.subject}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{message.content.substring(0, 50)}...</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Content */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {messages.find(m => m.id === selectedMessage)?.subject}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Dari: <span className="font-medium">{messages.find(m => m.id === selectedMessage)?.sender}</span> 
                      <span className="text-gray-400"> ({messages.find(m => m.id === selectedMessage)?.email})</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {messages.find(m => m.id === selectedMessage)?.date} | {messages.find(m => m.id === selectedMessage)?.time}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleStarMessage(selectedMessage)}
                    >
                      <Star 
                        size={18} 
                        className={messages.find(m => m.id === selectedMessage)?.starred ? "fill-yellow-400 text-yellow-400" : ""} 
                      />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteMessage(selectedMessage)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Message Body */}
              <div className="p-6 flex-grow overflow-auto">
                <p className="whitespace-pre-line">
                  {messages.find(m => m.id === selectedMessage)?.content}
                </p>
              </div>
              
              {/* Reply Box */}
              <div className="p-4 border-t">
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm font-medium mb-2">Balas:</p>
                  <Textarea
                    placeholder="Tulis balasan Anda disini..."
                    className="bg-white mb-3 min-h-[100px]"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSendReply}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send size={16} className="mr-2" />
                      Kirim Balasan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <MessageSquare size={48} className="mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">Pilih pesan</h3>
              <p className="text-gray-500">
                Silakan pilih pesan dari daftar di sebelah kiri untuk melihat detailnya
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingCenter;

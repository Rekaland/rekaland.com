
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const quickQuestions = [
  "Bagaimana cara membeli properti?",
  "Berapa uang muka minimal?",
  "Dimana lokasi properti saat ini?",
  "Apakah tersedia cicilan?",
  "Berapa lama proses pembelian?"
];

const aiResponses: Record<string, string> = {
  "Bagaimana cara membeli properti?": "Untuk membeli properti di Rekaland, Anda dapat memilih properti yang diminati dan klik 'Pesan Sekarang'. Selanjutnya isi formulir pemesanan, lakukan pembayaran booking fee, dan tim kami akan menghubungi untuk proses lebih lanjut.",
  "Berapa uang muka minimal?": "Uang muka minimal untuk properti Rekaland bervariasi mulai dari 20-30% dari harga jual, tergantung jenis properti dan promo yang sedang berjalan. Kami juga menyediakan skema pembayaran fleksibel.",
  "Dimana lokasi properti saat ini?": "Saat ini Rekaland memiliki properti di beberapa lokasi strategis seperti Bogor, Depok, Bekasi, dan Tangerang. Untuk informasi lebih detail, silahkan lihat halaman Produk atau konsultasikan dengan tim marketing kami via WhatsApp.",
  "Apakah tersedia cicilan?": "Ya, Rekaland menyediakan opsi cicilan melalui KPR bank mitra kami seperti BCA, Mandiri, BTN, dan bank lainnya. Kami juga memiliki skema cicilan developer untuk beberapa properti tertentu.",
  "Berapa lama proses pembelian?": "Proses pembelian dari booking hingga serah terima kunci umumnya memerlukan waktu 1-3 bulan untuk kavling siap bangun, dan 6-12 bulan untuk rumah siap huni, tergantung pada kondisi properti dan metode pembayaran."
};

const adminWhatsapp = "+6281234567890";

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Halo! Selamat datang di Rekaland. Ada yang bisa saya bantu?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Generate response (simple pattern matching)
    setTimeout(() => {
      let responseText = '';
      
      // Check if input matches any predefined questions
      const lowerInput = input.toLowerCase();
      let matched = false;
      
      for (const [question, answer] of Object.entries(aiResponses)) {
        if (lowerInput.includes(question.toLowerCase())) {
          responseText = answer;
          matched = true;
          break;
        }
      }
      
      // Default response for unmatched questions
      if (!matched) {
        if (lowerInput.includes('harga') || lowerInput.includes('biaya')) {
          responseText = "Untuk informasi harga spesifik, silahkan lihat halaman Produk kami atau konsultasikan langsung dengan tim marketing kami melalui WhatsApp di " + adminWhatsapp;
        } else if (lowerInput.includes('lokasi') || lowerInput.includes('alamat')) {
          responseText = "Lokasi properti kami tersebar di beberapa area strategis. Silahkan lihat detail di halaman Produk atau hubungi tim marketing untuk informasi lebih lanjut.";
        } else if (lowerInput.includes('whatsapp') || lowerInput.includes('kontak') || lowerInput.includes('hubungi')) {
          responseText = `Anda dapat menghubungi tim marketing kami melalui WhatsApp di ${adminWhatsapp} untuk konsultasi lebih lanjut.`;
        } else {
          responseText = "Terima kasih atas pertanyaan Anda. Untuk informasi yang lebih spesifik, silakan hubungi tim marketing kami via WhatsApp di " + adminWhatsapp;
        }
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSend();
  };

  const handleContactAdmin = () => {
    window.open(`https://wa.me/${adminWhatsapp}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg mb-4 w-[350px] max-w-[calc(100vw-2rem)] overflow-hidden border"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="bg-rekaland-orange p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-orange-700">
                  <AvatarImage src="/lovable-uploads/00cd7c13-64b6-4964-ab06-13691f814c9b.png" alt="Rekaland" />
                  <AvatarFallback>RL</AvatarFallback>
                </Avatar>
                <span className="font-medium">Rekaland Assistant</span>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-orange-600" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </Button>
            </div>
            
            <ScrollArea className="h-[320px] p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-orange-100 text-gray-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {messages.length <= 2 && (
              <div className="p-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Pertanyaan umum:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-3 border-t flex items-center gap-2">
              <Input 
                placeholder="Tulis pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button size="icon" className="bg-rekaland-orange hover:bg-orange-600" onClick={handleSend}>
                <Send size={18} />
              </Button>
            </div>
            
            <div className="p-3 border-t">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-rekaland-orange hover:text-orange-600"
                onClick={handleContactAdmin}
              >
                Hubungi Admin <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          className={`rounded-full w-14 h-14 shadow-lg ${isOpen ? 'bg-gray-600' : 'bg-rekaland-orange'} hover:${isOpen ? 'bg-gray-700' : 'bg-orange-600'}`}
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </div>
  );
};

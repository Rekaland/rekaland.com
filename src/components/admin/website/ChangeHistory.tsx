
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, History } from "lucide-react";

interface ChangeHistoryProps {
  onRestore: (version: number) => void;
}

const ChangeHistory: React.FC<ChangeHistoryProps> = ({ onRestore }) => {
  const changeHistory = [
    { id: 1, page: "Beranda", user: "Admin User", timestamp: "12 Jun 2023 09:15", type: "Konten Update", version: 5 },
    { id: 2, page: "Tentang Kami", user: "Admin User", timestamp: "10 Jun 2023 14:30", type: "Layout Update", version: 4 },
    { id: 3, page: "Produk", user: "Admin User", timestamp: "8 Jun 2023 11:20", type: "Konten Update", version: 3 },
    { id: 4, page: "Beranda", user: "Admin User", timestamp: "5 Jun 2023 16:45", type: "Gambar Update", version: 2 },
    { id: 5, page: "Informasi", user: "Admin User", timestamp: "3 Jun 2023 10:05", type: "Konten Update", version: 1 }
  ];

  return (
    <div className="space-y-4">
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
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
            >
              <Eye size={12} className="mr-1" />
              Lihat
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => onRestore(change.version)}
            >
              <History size={12} className="mr-1" />
              Kembalikan
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangeHistory;

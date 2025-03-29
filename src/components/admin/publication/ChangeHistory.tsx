
import { AlertCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DeploymentRecord {
  id: number;
  version: string;
  timestamp: string;
  status: string;
  author: string;
  changes: number;
}

interface ChangeHistoryProps {
  deploymentHistory: DeploymentRecord[];
}

const ChangeHistory = ({ deploymentHistory }: ChangeHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Perubahan</CardTitle>
        <CardDescription>Daftar perubahan yang sudah dilakukan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {deploymentHistory.map((item) => (
            <div key={item.id} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0 last:pb-0">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange-500"></div>
              <div className="mb-2">
                <p className="font-medium">{item.version} - {item.timestamp}</p>
                <p className="text-sm text-gray-500">Oleh: {item.author}</p>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-50 border p-3 rounded">
                  <p className="text-sm"><span className="font-medium">Konten:</span> Perubahan pada halaman Tentang Kami</p>
                </div>
                <div className="bg-gray-50 border p-3 rounded">
                  <p className="text-sm"><span className="font-medium">Properti:</span> Penambahan 2 properti baru</p>
                </div>
                {item.status === "Gagal" && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded">
                    <p className="text-sm text-red-800"><AlertCircle size={14} className="inline mr-1" /> Deployment gagal: Kesalahan konfigurasi database</p>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                  <Eye size={14} className="mr-1" />
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangeHistory;

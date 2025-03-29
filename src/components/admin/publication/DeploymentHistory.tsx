
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DeploymentRecord {
  id: number;
  version: string;
  timestamp: string;
  status: string;
  author: string;
  changes: number;
}

interface DeploymentHistoryProps {
  deploymentHistory: DeploymentRecord[];
}

const DeploymentHistory = ({ deploymentHistory }: DeploymentHistoryProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Riwayat Deployment</CardTitle>
        <CardDescription>Daftar deployment terbaru</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-2 text-left">Versi</th>
                <th className="py-3 px-2 text-left">Waktu</th>
                <th className="py-3 px-2 text-left">Status</th>
                <th className="py-3 px-2 text-left">Penulis</th>
                <th className="py-3 px-2 text-left">Perubahan</th>
                <th className="py-3 px-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {deploymentHistory.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{item.version}</td>
                  <td className="py-3 px-2">{item.timestamp}</td>
                  <td className="py-3 px-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs", 
                      item.status === "Sukses" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{item.author}</td>
                  <td className="py-3 px-2">{item.changes} perubahan</td>
                  <td className="py-3 px-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      <RefreshCw size={14} className="mr-1" />
                      Rollback
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;

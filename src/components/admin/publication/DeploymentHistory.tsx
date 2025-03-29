
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DeploymentRecord {
  id: number;
  version: string;
  timestamp: string;
  status: string;
  author: string;
  changes: number;
}

export interface DeploymentHistoryProps {
  deploymentHistory?: DeploymentRecord[];
}

// Sample data for deployment history
const defaultDeploymentHistory: DeploymentRecord[] = [
  {
    id: 1,
    version: "v1.2.0",
    timestamp: "15 Jun 2023 13:45",
    status: "Sukses",
    author: "Admin",
    changes: 12
  },
  {
    id: 2,
    version: "v1.1.5",
    timestamp: "10 Jun 2023 09:20",
    status: "Sukses",
    author: "Admin",
    changes: 5
  },
  {
    id: 3,
    version: "v1.1.0",
    timestamp: "05 Jun 2023 16:30",
    status: "Sukses",
    author: "Admin",
    changes: 8
  }
];

const DeploymentHistory = ({ deploymentHistory = defaultDeploymentHistory }: DeploymentHistoryProps) => {
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

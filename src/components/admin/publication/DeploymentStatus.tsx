
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertTriangle, Database, Globe } from "lucide-react";

interface DeploymentStatusProps {
  isConnected?: boolean;
  lastSaved?: string | null;
}

const DeploymentStatus = ({ isConnected, lastSaved }: DeploymentStatusProps) => {
  const [lastDeployTime] = useState("15 Jun 2023 13:45");
  
  // Status deployment yang berbeda berdasarkan koneksi
  const getDeploymentStatus = () => {
    if (!isConnected) {
      return {
        status: "warning",
        message: "Belum terhubung ke Supabase",
        description: "Koneksi ke Supabase diperlukan untuk publikasi",
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        badgeLabel: "Memerlukan koneksi",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-200"
      };
    }
    
    if (!lastSaved) {
      return {
        status: "pending",
        message: "Siap untuk publikasi",
        description: "Tidak ada perubahan yang perlu dipublikasikan",
        icon: <Clock className="h-8 w-8 text-blue-500" />,
        badgeLabel: "Siap",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-200"
      };
    }
    
    return {
      status: "ready",
      message: "Siap untuk publikasi",
      description: "Perubahan terakhir sudah disimpan dan siap untuk publikasi",
      icon: <Check className="h-8 w-8 text-green-500" />,
      badgeLabel: "Siap publikasi",
      badgeClass: "bg-green-100 text-green-800 border-green-200"
    };
  };
  
  const deploymentStatus = getDeploymentStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Status Deployment</span>
          <Badge className={deploymentStatus.badgeClass}>
            {deploymentStatus.badgeLabel}
          </Badge>
        </CardTitle>
        <CardDescription>Informasi status publikasi website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-gray-100">
            {deploymentStatus.icon}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">{deploymentStatus.message}</h3>
            <p className="text-gray-600">{deploymentStatus.description}</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <span className="font-medium">Deployment terakhir</span>
                <span>{lastDeployTime}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <span className="font-medium">Status koneksi Supabase</span>
                <Badge variant={isConnected ? "outline" : "destructive"} className={isConnected ? "bg-green-50" : ""}>
                  {isConnected ? "Terhubung" : "Tidak terhubung"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <span className="font-medium">Perubahan terakhir disimpan</span>
                <span>{lastSaved || "Belum ada"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentStatus;


import React from "react";
import { Database, Check, X, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'pending';
  onTestConnection: () => void;
  onRetryConnection: () => void;
}

const ConnectionStatus = ({ 
  status,
  onTestConnection,
  onRetryConnection
}: ConnectionStatusProps) => {
  if (status === 'pending') {
    return null;
  }
  
  if (status === 'connected') {
    return (
      <div className="border p-4 rounded-lg bg-green-50 border-green-100">
        <p className="font-medium flex items-center gap-2">
          <Database size={18} className="text-green-800" />
          Status koneksi: <span className="text-green-800">Terhubung</span>
          <Badge variant="outline" className="bg-green-50 ml-2">
            <Check size={12} className="mr-1" />
            Aktif
          </Badge>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Database aktif dan berfungsi dengan normal
        </p>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2" 
          onClick={onTestConnection}
        >
          <RefreshCw size={14} className="mr-1" />
          Uji Koneksi
        </Button>
      </div>
    );
  }
  
  return (
    <div className="border p-4 rounded-lg bg-red-50 border-red-100">
      <p className="font-medium flex items-center gap-2">
        <Database size={18} className="text-red-800" />
        Status koneksi: <span className="text-red-800">Terputus</span>
        <Badge variant="destructive" className="ml-2">
          <X size={12} className="mr-1" />
          Tidak Aktif
        </Badge>
      </p>
      <p className="text-sm text-red-700 mt-1">
        Tidak dapat terhubung ke database, periksa pengaturan
      </p>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2" 
        onClick={onRetryConnection}
      >
        <RefreshCw size={14} className="mr-1" />
        Coba Sambungkan Kembali
      </Button>
    </div>
  );
};

export default ConnectionStatus;

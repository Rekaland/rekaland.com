
import React, { useState } from "react";
import { Eye, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ConnectionFormProps {
  projectId: string;
  apiUrl: string;
  apiKey: string;
  onProjectIdChange: (value: string) => void;
  onApiUrlChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
  onConnect: () => void;
  formErrors: {
    projectId: boolean;
    apiUrl: boolean;
    apiKey: boolean;
  };
  connectionInProgress: boolean;
}

const ConnectionForm = ({
  projectId,
  apiUrl,
  apiKey,
  onProjectIdChange,
  onApiUrlChange,
  onApiKeyChange,
  onConnect,
  formErrors,
  connectionInProgress
}: ConnectionFormProps) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-4">
      <Alert className="bg-gray-50 border-gray-200">
        <Database className="h-4 w-4 text-gray-500" />
        <AlertTitle className="text-gray-800">Belum terhubung</AlertTitle>
        <AlertDescription className="text-gray-600">
          Silakan masukkan informasi koneksi Supabase dan klik tombol "Hubungkan".
        </AlertDescription>
      </Alert>

      <div>
        <Label htmlFor="project-id">Supabase Project ID</Label>
        <Input 
          id="project-id" 
          value={projectId} 
          onChange={(e) => onProjectIdChange(e.target.value)}
          placeholder="Masukkan ID project Supabase" 
          className={formErrors.projectId ? "border-red-300" : ""}
        />
        {formErrors.projectId && (
          <p className="text-sm text-red-500 mt-1">Project ID diperlukan</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="api-url">API URL</Label>
        <Input 
          id="api-url" 
          value={apiUrl} 
          onChange={(e) => onApiUrlChange(e.target.value)}
          placeholder="https://[your-project].supabase.co" 
          className={formErrors.apiUrl ? "border-red-300" : ""}
        />
        {formErrors.apiUrl && (
          <p className="text-sm text-red-500 mt-1">URL API Supabase tidak valid</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex">
          <Input 
            id="api-key" 
            type={showApiKey ? "text" : "password"} 
            value={apiKey} 
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Supabase anon/public API key" 
            className={cn("rounded-r-none", formErrors.apiKey ? "border-red-300" : "")}
          />
          <Button 
            className="rounded-l-none" 
            variant="outline"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            <Eye size={16} />
          </Button>
        </div>
        {formErrors.apiKey && (
          <p className="text-sm text-red-500 mt-1">API key diperlukan</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
      </div>
      
      <Button 
        onClick={onConnect}
        disabled={connectionInProgress}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {connectionInProgress ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            Menghubungkan...
          </>
        ) : (
          <>
            <Database size={16} className="mr-2" />
            Hubungkan ke Supabase
          </>
        )}
      </Button>
      
      <p className="text-sm text-gray-500 mt-2">
        Konfigurasi ini digunakan untuk menghubungkan aplikasi ke database Supabase Anda.
        Pastikan API key dan URL sudah benar.
      </p>
    </div>
  );
};

export default ConnectionForm;

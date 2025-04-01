
import React from "react";
import { Eye, Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConnectedTablesStatus, { TableInfo } from "./ConnectedTablesStatus";

interface ConnectedDetailsProps {
  projectId: string;
  apiUrl: string;
  apiKey: string;
  lastSync: string;
  tables: TableInfo[];
  isSyncing: boolean;
  onSync: () => void;
  onShowApiKeyToggle: () => void;
  showApiKey: boolean;
}

const ConnectedDetails = ({
  projectId,
  apiUrl,
  apiKey,
  lastSync,
  tables,
  isSyncing,
  onSync,
  onShowApiKeyToggle,
  showApiKey
}: ConnectedDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="project-id">Supabase Project ID</Label>
        <Input id="project-id" value={projectId} className="bg-gray-50" readOnly />
      </div>
      
      <div>
        <Label htmlFor="api-url">API URL</Label>
        <Input id="api-url" value={apiUrl} className="bg-gray-50" readOnly />
      </div>
      
      <div>
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex">
          <Input 
            id="api-key" 
            type={showApiKey ? "text" : "password"} 
            value={showApiKey ? apiKey : '••••••••••••••••'} 
            className="rounded-r-none bg-gray-50" 
            readOnly 
          />
          <Button 
            className="rounded-l-none" 
            variant="outline"
            onClick={onShowApiKeyToggle}
          >
            <Eye size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
      </div>

      <div>
        <Label htmlFor="sync-status">Status Sinkronisasi</Label>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Terakhir sinkronisasi: {lastSync}</span>
        </div>
      </div>

      <ConnectedTablesStatus 
        tables={tables} 
        isSyncing={isSyncing} 
        onSync={onSync} 
      />

      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onSync}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : (
          <RefreshCw size={16} className="mr-2" />
        )}
        Sinkronisasi Ulang
      </Button>
    </div>
  );
};

export default ConnectedDetails;

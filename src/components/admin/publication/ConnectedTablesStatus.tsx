
import { Database, Check, X, RefreshCw } from "lucide-react";

export interface TableInfo {
  name: string;
  status: 'synced' | 'pending' | 'error';
  lastSync?: string;
}

interface ConnectedTablesStatusProps {
  tables: TableInfo[];
  isSyncing: boolean;
  onSync: () => void;
}

const ConnectedTablesStatus = ({ tables, isSyncing, onSync }: ConnectedTablesStatusProps) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Status Tabel:</div>
      <div className="grid grid-cols-1 gap-2">
        {tables.map((table, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded border">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-gray-600" />
              <span className="text-sm font-medium">{table.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                table.status === 'synced' ? 'bg-green-500' : 
                table.status === 'error' ? 'bg-red-500' : 'bg-amber-500'
              }`}></div>
              <span className={`text-xs ${
                table.status === 'synced' ? 'text-green-600' : 
                table.status === 'error' ? 'text-red-600' : 'text-amber-600'
              }`}>
                {table.status === 'synced' ? 'Tersinkronisasi' : 
                 table.status === 'error' ? 'Gagal' : 'Tertunda'}
              </span>
              {table.lastSync && table.status === 'synced' && (
                <span className="text-xs text-gray-500">
                  {table.lastSync}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button 
        className="text-sm flex items-center gap-1 text-blue-500 hover:text-blue-700"
        onClick={onSync}
        disabled={isSyncing}
      >
        <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
        {isSyncing ? "Menyinkronkan..." : "Sinkronkan ulang semua tabel"}
      </button>
    </div>
  );
};

export default ConnectedTablesStatus;

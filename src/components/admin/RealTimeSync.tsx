
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RealTimeSyncProps {
  onInitialSync?: () => void;
}

const RealTimeSync: React.FC<RealTimeSyncProps> = ({ onInitialSync }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [syncedTables, setSyncedTables] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check connection and initialize
  useEffect(() => {
    const checkConnection = async () => {
      setIsInitializing(true);
      try {
        // Get all tables from the database
        const { data: tableData, error: tableError } = await supabase
          .from('properties')
          .select('id')
          .limit(1);
          
        if (tableError) throw tableError;
        
        // If we got here, we're connected
        setIsConnected(true);
        
        // Define our key tables
        const keyTables = ['properties', 'inquiries', 'contents', 'profiles', 'product_contents'];
        setTables(keyTables);
        
        // Initialize subscriptions for all tables
        keyTables.forEach(table => {
          setupTableSync(table);
        });
        
        // Trigger the onInitialSync callback after a short delay
        if (onInitialSync) {
          setTimeout(() => {
            onInitialSync();
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to initialize real-time sync:", error);
        setIsConnected(false);
      } finally {
        setIsInitializing(false);
      }
    };
    
    checkConnection();
    
    // Cleanup function
    return () => {
      // We'll handle channel cleanup in the setupTableSync function
    };
  }, [onInitialSync]);
  
  // Set up real-time sync for a specific table
  const setupTableSync = (table: string) => {
    const channelName = `${table}-realtime-sync`;
    
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: table }, (payload) => {
        console.log(`Real-time event on ${table}:`, payload);
        // Add this table to the list of synced tables if it's not already there
        setSyncedTables(prev => 
          prev.includes(table) ? prev : [...prev, table]
        );
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${table} changes`);
          // Mark this table as synced
          setSyncedTables(prev => 
            prev.includes(table) ? prev : [...prev, table]
          );
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Error subscribing to ${table} changes`);
          // Remove this table from the synced list
          setSyncedTables(prev => prev.filter(t => t !== table));
        }
      });
      
    return () => {
      supabase.removeChannel(channel);
    };
  };
  
  // Handle manual reconnection
  const handleReconnect = () => {
    setIsInitializing(true);
    // Re-initialize all subscriptions
    tables.forEach(table => {
      setupTableSync(table);
    });
    setIsInitializing(false);
  };

  if (isInitializing) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Initializing real-time sync...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-amber-500 font-medium">Tidak terhubung ke database</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReconnect}
          className="text-xs"
        >
          Coba Hubungkan Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Terhubung
          </Badge>
          <span className="text-xs text-muted-foreground">
            {syncedTables.length}/{tables.length} tabel tersinkronisasi
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-1 mt-1">
        {tables.map(table => (
          <div key={table} className="flex items-center space-x-1">
            <div 
              className={`h-2 w-2 rounded-full ${syncedTables.includes(table) 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-gray-300'}`} 
            />
            <span className="text-xs text-muted-foreground capitalize">
              {table.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeSync;


import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';
import { CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealTimeSyncProps {
  onInitialSync?: () => void;
}

const TABLES = [
  'properties',
  'profiles',
  'inquiries',
  'settings',
  'testimonials',
  'contents',
  'product_contents'
];

const RealTimeSync = ({ onInitialSync }: RealTimeSyncProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState<{[key: string]: boolean}>({
    properties: false,
    profiles: false,
    inquiries: false,
    settings: false,
    testimonials: false,
    contents: false,
    product_contents: false
  });
  const { toast } = useToast();
  const initialSyncCalled = useRef(false);
  const syncAllTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create stable refs to store sync handlers
  const syncHandlers = useRef<{[key: string]: ReturnType<typeof useRealTimeSync>}>({});

  // Setup individual sync handlers for each table
  TABLES.forEach(table => {
    // Using a stable identifier pattern
    syncHandlers.current[table] = useRealTimeSync(table);
  });

  // Optimize status update by using a single effect for all statuses
  useEffect(() => {
    const newStatus: {[key: string]: boolean} = {};
    
    // Check connection status for each table
    Object.entries(syncHandlers.current).forEach(([table, handler]) => {
      newStatus[table] = handler.isSubscribed;
    });
    
    // Only update state if there's a change
    const statusChanged = Object.entries(newStatus).some(
      ([key, value]) => status[key] !== value
    );
    
    if (statusChanged) {
      setStatus(newStatus);
    }

    // Call onInitialSync only once when all tables are successfully synced
    const allSynced = Object.values(newStatus).every(Boolean);
    
    if (allSynced && onInitialSync && !initialSyncCalled.current) {
      initialSyncCalled.current = true;
      onInitialSync();
    }
  }, [
    onInitialSync,
    status,
    syncHandlers.current
  ]);

  // Enhanced enableRealtimeForTable with improved stability
  const enableRealtimeForTable = async (tableName: string) => {
    try {
      // Create a stable channel name
      const channelName = `${tableName}-changes-stable`;
      
      // Remove any existing channel first to prevent duplication
      const existingChannels = supabase.getChannels();
      const existingChannel = existingChannels.find(ch => ch.name === channelName);
      if (existingChannel) {
        supabase.removeChannel(existingChannel);
      }
      
      // Create and subscribe to the channel
      const channel = supabase
        .channel(channelName)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: tableName }, 
          (payload) => {
            console.log(`Real-time update for ${tableName}:`, payload);
          }
        )
        .subscribe((status) => {
          console.log(`Channel ${channelName} status:`, status);
          if (status === 'SUBSCRIBED') {
            setStatus(prev => ({
              ...prev,
              [tableName]: true
            }));
          }
        });
      
      if (channel) {
        return { success: true, data: { table: tableName, status: "enabled" } };
      } else {
        throw new Error(`Failed to create channel for ${tableName}`);
      }
    } catch (error) {
      console.error(`Failed to enable realtime for table ${tableName}:`, error);
      return { success: false, error };
    }
  };

  const syncAll = async () => {
    // Prevent multiple clicks
    if (isSyncing) return;
    
    setIsSyncing(true);
    
    // Clear any existing timeout
    if (syncAllTimeoutRef.current) {
      clearTimeout(syncAllTimeoutRef.current);
    }
    
    try {
      let successCount = 0;
      
      // Process tables sequentially with increasing delays
      for (let i = 0; i < TABLES.length; i++) {
        const table = TABLES[i];
        
        // Add increasing delay between subscriptions to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, i * 300));
        
        const result = await enableRealtimeForTable(table);
        if (result.success) {
          successCount++;
        }
      }
      
      if (successCount > 0) {
        toast({
          title: "Sinkronisasi berhasil",
          description: `${successCount} dari ${TABLES.length} tabel telah diaktifkan untuk sinkronisasi real-time`,
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
        });
      } else {
        toast({
          title: "Sinkronisasi gagal",
          description: "Tidak ada tabel yang berhasil diaktifkan. Periksa konsol untuk detail.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to sync all tables:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mencoba sinkronisasi tabel",
        variant: "destructive",
      });
    } finally {
      // Set timeout before allowing another sync to prevent rapid re-clicks
      syncAllTimeoutRef.current = setTimeout(() => {
        setIsSyncing(false);
      }, 3000);
    }
  };

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      if (syncAllTimeoutRef.current) {
        clearTimeout(syncAllTimeoutRef.current);
      }
    };
  }, []);

  // Hitung jumlah tabel yang tersinkronisasi
  const connectedCount = Object.values(status).filter(Boolean).length;
  const totalTables = Object.keys(status).length;
  
  // Format persentase
  const percentage = Math.round((connectedCount / totalTables) * 100);

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">{percentage}%</span>
            <span className="text-gray-500 ml-2">
              ({connectedCount}/{totalTables} tabel)
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={syncAll}
            disabled={isSyncing}
            className="flex gap-2 items-center"
          >
            {isSyncing ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Menyinkronkan...</span>
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                <span>Sinkronkan Ulang Semua</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-rekaland-orange to-amber-500 transition-all duration-300" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(status).map(([table, isConnected]) => (
          <div key={table} className="flex items-center gap-2 p-1.5">
            {isConnected ? (
              <CheckCircle size={14} className="text-green-600" />
            ) : (
              <AlertTriangle size={14} className="text-amber-500" />
            )}
            <span className={isConnected ? "text-gray-900" : "text-gray-500"}>
              {table.replace(/_/g, ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeSync;

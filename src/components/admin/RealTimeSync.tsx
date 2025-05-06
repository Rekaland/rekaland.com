
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';
import { CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RealTimeSyncProps {
  onInitialSync?: () => void;
}

const RealTimeSync = ({ onInitialSync }: RealTimeSyncProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const initialSyncFiredRef = useRef(false);
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
  
  // Use stable channel names for each table to prevent flickering
  const propertiesSync = useRealTimeSync('properties');
  const profilesSync = useRealTimeSync('profiles');
  const inquiriesSync = useRealTimeSync('inquiries');
  const settingsSync = useRealTimeSync('settings');
  const testimonialsSync = useRealTimeSync('testimonials');
  const contentsSync = useRealTimeSync('contents');
  const productContentsSync = useRealTimeSync('product_contents');

  // Optimize status update by using a debounced effect
  useEffect(() => {
    // Batch status updates to avoid frequent re-renders
    const newStatus = {
      properties: propertiesSync.isSubscribed,
      profiles: profilesSync.isSubscribed,
      inquiries: inquiriesSync.isSubscribed,
      settings: settingsSync.isSubscribed,
      testimonials: testimonialsSync.isSubscribed,
      contents: contentsSync.isSubscribed,
      product_contents: productContentsSync.isSubscribed
    };
    
    // Deep comparison to prevent unnecessary state updates
    if (JSON.stringify(newStatus) !== JSON.stringify(status)) {
      setStatus(newStatus);
    }

    // Call onInitialSync only once when all tables are successfully synced
    const allSynced = 
      propertiesSync.isSubscribed && 
      profilesSync.isSubscribed && 
      inquiriesSync.isSubscribed && 
      settingsSync.isSubscribed &&
      testimonialsSync.isSubscribed &&
      contentsSync.isSubscribed &&
      productContentsSync.isSubscribed;
    
    if (allSynced && onInitialSync && !initialSyncFiredRef.current) {
      initialSyncFiredRef.current = true;
      onInitialSync();
    }
  }, [
    propertiesSync.isSubscribed, 
    profilesSync.isSubscribed, 
    inquiriesSync.isSubscribed,
    settingsSync.isSubscribed,
    testimonialsSync.isSubscribed,
    contentsSync.isSubscribed,
    productContentsSync.isSubscribed,
    onInitialSync,
    status
  ]);

  // Improved function to enable realtime with better error handling
  const enableRealtimeForTable = async (tableName: string) => {
    try {
      // Create a stable channel name without using timestamp to prevent flickering
      const channelName = `${tableName}-stable-sync`;
      
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
    setIsSyncing(true);
    
    try {
      const tables = ['properties', 'profiles', 'inquiries', 'settings', 'testimonials', 'contents', 'product_contents'];
      let successCount = 0;
      
      // Process tables sequentially to avoid overwhelming the connection
      for (const table of tables) {
        const result = await enableRealtimeForTable(table);
        if (result.success) {
          successCount++;
          // Update status immediately for better UX
          setStatus(prev => ({
            ...prev,
            [table]: true
          }));
          // Small delay between table activations
          await new Promise(resolve => setTimeout(resolve, 150));
        }
      }
      
      if (successCount > 0) {
        toast({
          title: "Sinkronisasi berhasil",
          description: `${successCount} dari ${tables.length} tabel telah diaktifkan untuk sinkronisasi real-time`,
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
          duration: 4000,
        });
      } else {
        toast({
          title: "Sinkronisasi gagal",
          description: "Tidak ada tabel yang berhasil diaktifkan. Periksa konsol untuk detail.",
          variant: "destructive",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Failed to sync all tables:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mencoba sinkronisasi tabel",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSyncing(false);
    }
  };

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
            className="flex gap-2 items-center transition-all duration-300"
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
            className="h-full bg-gradient-to-r from-rekaland-orange to-amber-500 transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(status).map(([table, isConnected]) => (
          <div key={table} className="flex items-center gap-2 p-1.5 transition-opacity duration-300">
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

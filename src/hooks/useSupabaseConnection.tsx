import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TableInfo } from "@/components/admin/publication/ConnectedTablesStatus";

export const useSupabaseConnection = (isConnected: boolean = false) => {
  const [connectionStatus, setConnectionStatus] = useState<'pending' | 'connected' | 'failed'>(
    isConnected ? 'connected' : 'pending'
  );
  const [connectionInProgress, setConnectionInProgress] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [projectId, setProjectId] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([
    { name: 'properties', status: 'pending' },
    { name: 'profiles', status: 'pending' },
    { name: 'inquiries', status: 'pending' },
    { name: 'testimonials', status: 'pending' },
    { name: 'contents', status: 'pending' },
  ]);
  const [formErrors, setFormErrors] = useState({
    projectId: '',
    apiUrl: '',
    apiKey: ''
  });

  useEffect(() => {
    const loadConnectionSettings = async () => {
      if (isConnected) {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'website_settings')
            .maybeSingle();
          
          if (error) {
            if (error.code !== 'PGRST116') {
              console.error('Error fetching connection settings:', error);
            }
            return;
          }
          
          if (data?.value) {
            const settings = data.value as any;
            if (settings.supabaseUrl) setApiUrl(settings.supabaseUrl);
            if (settings.supabaseKey) setApiKey(settings.supabaseKey);
            if (settings.projectId) setProjectId(settings.projectId);
            if (settings.tables) {
              const tablesData = settings.tables as any[];
              setTables(prev => 
                prev.map(table => {
                  const foundTable = tablesData.find(t => t.name === table.name);
                  if (foundTable) {
                    return {
                      ...table,
                      status: foundTable.status || 'pending',
                      lastSync: foundTable.lastSync || null
                    };
                  }
                  return table;
                })
              );
            }
            setLastSync(settings.lastPublished ? new Date(settings.lastPublished).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }) : null);
          }
        } catch (err) {
          console.error('Failed to load connection settings:', err);
        }
      }
    };
    
    loadConnectionSettings();
  }, [isConnected]);

  const handleTestConnection = async () => {
    if (connectionStatus !== 'connected') {
      return;
    }
    
    setConnectionInProgress(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTables = [...tables];
      let allSynced = true;
      
      for (let i = 0; i < newTables.length; i++) {
        try {
          const tableName = newTables[i].name as 'properties' | 'profiles' | 'inquiries' | 'testimonials' | 'contents' | 'settings';
          
          const { count, error } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          if (error) {
            console.error(`Error checking table ${newTables[i].name}:`, error);
            newTables[i].status = 'error';
            allSynced = false;
          } else {
            newTables[i].status = 'synced';
            newTables[i].lastSync = new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
          }
        } catch (err) {
          console.error(`Error checking table ${newTables[i].name}:`, err);
          newTables[i].status = 'error';
          allSynced = false;
        }
      }
      
      setTables(newTables);
      
      if (allSynced) {
        setLastSync(new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }));
      }
    } catch (error) {
      console.error('Connection test failed:', error);
    } finally {
      setConnectionInProgress(false);
    }
  };

  const handleConnect = async () => {
    setFormErrors({
      projectId: '',
      apiUrl: '',
      apiKey: ''
    });
    
    let hasErrors = false;
    const newErrors = {
      projectId: '',
      apiUrl: '',
      apiKey: ''
    };
    
    if (!projectId.trim()) {
      newErrors.projectId = 'Project ID wajib diisi';
      hasErrors = true;
    }
    
    if (!apiUrl.trim()) {
      newErrors.apiUrl = 'API URL wajib diisi';
      hasErrors = true;
    } else if (!apiUrl.startsWith('https://')) {
      newErrors.apiUrl = 'API URL harus dimulai dengan https://';
      hasErrors = true;
    }
    
    if (!apiKey.trim()) {
      newErrors.apiKey = 'API Key wajib diisi';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    }
    
    setConnectionInProgress(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setConnectionStatus('connected');
      setLastSync(new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      
      await handleTestConnection();
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('failed');
    } finally {
      setConnectionInProgress(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      const newTables = [...tables];
      
      for (let i = 0; i < newTables.length; i++) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const tableName = newTables[i].name as 'properties' | 'profiles' | 'inquiries' | 'testimonials' | 'contents' | 'settings';
          
          const { count, error } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          if (error) {
            console.error(`Error syncing table ${newTables[i].name}:`, error);
            newTables[i].status = 'error';
          } else {
            newTables[i].status = 'synced';
            newTables[i].lastSync = new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
          }
        } catch (err) {
          console.error(`Error syncing table ${newTables[i].name}:`, err);
          newTables[i].status = 'error';
        }
      }
      
      setTables(newTables);
      setLastSync(new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    connectionStatus,
    setConnectionStatus,
    connectionInProgress,
    projectId,
    setProjectId,
    apiUrl,
    setApiUrl,
    apiKey,
    setApiKey,
    formErrors,
    tables,
    lastSync,
    isSyncing,
    handleConnect,
    handleSync,
    handleTestConnection
  };
};

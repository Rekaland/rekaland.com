
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, DownloadCloud, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LogItem = {
  id: number;
  type: 'log' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
};

const DebugConsole = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isCapturing, setIsCapturing] = useState(true);
  const [filter, setFilter] = useState<'all' | 'log' | 'info' | 'warn' | 'error'>('all');
  
  useEffect(() => {
    if (!isCapturing) return;
    
    // Backup original console methods
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    };
    
    // Override console methods to capture logs
    console.log = (...args: any[]) => {
      originalConsole.log(...args);
      addLogItem('log', args);
    };
    
    console.info = (...args: any[]) => {
      originalConsole.info(...args);
      addLogItem('info', args);
    };
    
    console.warn = (...args: any[]) => {
      originalConsole.warn(...args);
      addLogItem('warn', args);
    };
    
    console.error = (...args: any[]) => {
      originalConsole.error(...args);
      addLogItem('error', args);
    };
    
    // Cleanup function to restore original console methods
    return () => {
      console.log = originalConsole.log;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
    };
  }, [isCapturing]);
  
  const addLogItem = (type: 'log' | 'info' | 'warn' | 'error', args: any[]) => {
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    setLogs(prev => [...prev, {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    }]);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  const toggleCapturing = () => {
    setIsCapturing(!isCapturing);
  };
  
  const downloadLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp.toISOString()}] [${log.type.toUpperCase()}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Debug Console
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant={isCapturing ? "default" : "secondary"} 
              size="sm"
              onClick={toggleCapturing}
              className={cn(
                "h-8 gap-1",
                isCapturing && "bg-green-600 hover:bg-green-700"
              )}
            >
              <RefreshCw className={cn("h-4 w-4", isCapturing && "animate-spin")} />
              {isCapturing ? "Capturing" : "Start Capture"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadLogs}
              className="h-8 gap-1"
              disabled={logs.length === 0}
            >
              <DownloadCloud className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearLogs}
              className="h-8 gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              disabled={logs.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
        
        <div className="flex mt-2 gap-1">
          <Badge 
            variant={filter === 'all' ? "default" : "outline"} 
            className="cursor-pointer hover:bg-gray-200" 
            onClick={() => setFilter('all')}
          >
            All ({logs.length})
          </Badge>
          <Badge 
            variant={filter === 'log' ? "default" : "outline"} 
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => setFilter('log')}
          >
            Log ({logs.filter(l => l.type === 'log').length})
          </Badge>
          <Badge 
            variant={filter === 'info' ? "default" : "outline"} 
            className="cursor-pointer hover:bg-blue-50"
            onClick={() => setFilter('info')}
          >
            Info ({logs.filter(l => l.type === 'info').length})
          </Badge>
          <Badge 
            variant={filter === 'warn' ? "default" : "outline"} 
            className="cursor-pointer hover:bg-yellow-50 text-yellow-700"
            onClick={() => setFilter('warn')}
          >
            Warn ({logs.filter(l => l.type === 'warn').length})
          </Badge>
          <Badge 
            variant={filter === 'error' ? "default" : "outline"} 
            className="cursor-pointer hover:bg-red-50 text-red-700"
            onClick={() => setFilter('error')}
          >
            Error ({logs.filter(l => l.type === 'error').length})
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] w-full font-mono text-sm">
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
              <Code className="h-12 w-12 mb-2" />
              <p>No logs captured yet</p>
              {!isCapturing && (
                <p className="text-xs mt-1">Click "Start Capture" to begin tracking console logs</p>
              )}
            </div>
          ) : (
            <div className="p-2">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id}
                  className={cn(
                    "py-1 px-2 border-l-4 mb-1",
                    log.type === 'log' && "border-l-gray-400 bg-gray-50",
                    log.type === 'info' && "border-l-blue-400 bg-blue-50",
                    log.type === 'warn' && "border-l-yellow-400 bg-yellow-50",
                    log.type === 'error' && "border-l-red-400 bg-red-50"
                  )}
                >
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className={cn(
                      "font-medium",
                      log.type === 'log' && "text-gray-600",
                      log.type === 'info' && "text-blue-600",
                      log.type === 'warn' && "text-yellow-600",
                      log.type === 'error' && "text-red-600"
                    )}>
                      {log.type.toUpperCase()}
                    </span>
                    <span>{log.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-xs">
                    {log.message}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DebugConsole;

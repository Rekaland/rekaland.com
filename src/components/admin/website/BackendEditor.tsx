
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Database, Server, Table, Key, Lock, Link, Settings, ArrowRight, TableProperties, Play, Code2, FileJson, RefreshCw, Globe, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const BackendEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("database");
  
  // Mock data for the backend sections
  const [tables] = useState([
    { id: 1, name: "users", records: 152, status: "connected" },
    { id: 2, name: "properties", records: 87, status: "connected" },
    { id: 3, name: "transactions", records: 243, status: "connected" },
    { id: 4, name: "pages", records: 12, status: "connected" },
    { id: 5, name: "messages", records: 68, status: "connected" }
  ]);
  
  const [apis] = useState([
    { id: 1, path: "/api/auth", method: "POST", status: "active", description: "Authentication endpoint" },
    { id: 2, path: "/api/properties", method: "GET", status: "active", description: "Get property listings" },
    { id: 3, path: "/api/contact", method: "POST", status: "active", description: "Contact form submission" },
    { id: 4, path: "/api/newsletter", method: "POST", status: "inactive", description: "Newsletter subscription" }
  ]);
  
  const [functions] = useState([
    { id: 1, name: "processPayment", trigger: "HTTP", status: "active", lastRun: "2 jam lalu" },
    { id: 2, name: "sendNotification", trigger: "Database", status: "active", lastRun: "5 jam lalu" },
    { id: 3, name: "generateReport", trigger: "Schedule", status: "active", lastRun: "1 hari lalu" },
    { id: 4, name: "syncData", trigger: "Schedule", status: "inactive", lastRun: "3 hari lalu" }
  ]);
  
  const [environments] = useState([
    { id: 1, name: "Development", url: "dev-rekaland.com", status: "online", version: "1.2.3" },
    { id: 2, name: "Staging", url: "staging-rekaland.com", status: "online", version: "1.2.2" },
    { id: 3, name: "Production", url: "rekaland.com", status: "online", version: "1.2.1" }
  ]);

  const handleConnect = () => {
    toast({
      title: "Terhubung ke Supabase!",
      description: "Koneksi ke database Supabase berhasil dibuat",
      className: "bg-green-600 text-white"
    });
  };

  const handleCreateTable = () => {
    toast({
      title: "Buat Tabel Baru",
      description: "Form pembuatan tabel baru telah dibuka",
    });
  };

  const handleCreateAPI = () => {
    toast({
      title: "Buat API Baru",
      description: "Form pembuatan endpoint API baru telah dibuka",
    });
  };

  const handleCreateFunction = () => {
    toast({
      title: "Buat Function Baru",
      description: "Form pembuatan function baru telah dibuka",
    });
  };

  const handleDeploy = () => {
    toast({
      title: "Deployment Dimulai",
      description: "Proses deployment ke production telah dimulai",
      className: "bg-blue-600 text-white"
    });
  };

  const handleTestFunction = (functionName: string) => {
    toast({
      title: "Menjalankan Function",
      description: `Menjalankan function ${functionName}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Function berhasil dijalankan",
        description: `Function ${functionName} telah berhasil dijalankan`,
        className: "bg-green-600 text-white"
      });
    }, 1500);
  };

  const handleViewLogs = () => {
    toast({
      title: "Log Sistem",
      description: "Menampilkan log sistem",
    });
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database size={16} />
            Database
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Link size={16} />
            API
          </TabsTrigger>
          <TabsTrigger value="functions" className="flex items-center gap-2">
            <Code2 size={16} />
            Functions
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Server size={16} />
            Deployment
          </TabsTrigger>
        </TabsList>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Database size={18} className="mr-2" />
                  Koneksi Database
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Terhubung
                </Badge>
              </CardTitle>
              <CardDescription>
                Kelola koneksi dan data di database website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Terhubung ke Supabase</p>
                    <p className="text-sm text-gray-600">project-id: rekaland-db</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Konfigurasi
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Tabel Database</h3>
                  <Button onClick={handleCreateTable}>
                    Buat Tabel
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-medium">
                    <div>Nama Tabel</div>
                    <div>Records</div>
                    <div>Status</div>
                    <div className="text-right">Aksi</div>
                  </div>
                  
                  {tables.map((table) => (
                    <div key={table.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="font-medium">{table.name}</div>
                      <div>{table.records}</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          {table.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <TableProperties size={14} className="mr-1" />
                          Struktur
                        </Button>
                        <Button size="sm" variant="outline">
                          <Table size={14} className="mr-1" />
                          Data
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">562</div>
                    <p className="text-sm text-gray-500">records</p>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Ukuran Database</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24.8 MB</div>
                    <p className="text-sm text-gray-500">dari 500 MB</p>
                    <Progress value={5} className="mt-2 h-1" />
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <div className="text-lg font-medium">Online</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={handleViewLogs}>
                View Logs
              </Button>
              <Button onClick={handleConnect}>
                <RefreshCw size={14} className="mr-2" />
                Reconnect
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Link size={18} className="mr-2" />
                  API Endpoints
                </div>
              </CardTitle>
              <CardDescription>
                Kelola endpoint API untuk komunikasi antara frontend dan backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">API Endpoints</h3>
                <Button onClick={handleCreateAPI}>
                  Buat API
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b font-medium">
                  <div>Path</div>
                  <div>Method</div>
                  <div>Status</div>
                  <div>Description</div>
                  <div className="text-right">Aksi</div>
                </div>
                
                {apis.map((api) => (
                  <div key={api.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-mono text-sm font-medium">{api.path}</div>
                    <div>
                      <Badge variant={api.method === "GET" ? "outline" : "default"} className={`${api.method === "GET" ? "bg-blue-50 text-blue-700 hover:bg-blue-50" : "bg-violet-100 text-violet-800 hover:bg-violet-100"}`}>
                        {api.method}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline" className={api.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {api.status}
                      </Badge>
                    </div>
                    <div className="text-sm">{api.description}</div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Play size={14} className="mr-1" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileJson size={14} className="mr-1" />
                        Schema
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Functions Tab */}
        <TabsContent value="functions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Code2 size={18} className="mr-2" />
                  Serverless Functions
                </div>
              </CardTitle>
              <CardDescription>
                Kelola dan jalankan fungsi serverless untuk logika bisnis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Functions</h3>
                <Button onClick={handleCreateFunction}>
                  Buat Function
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b font-medium">
                  <div>Nama</div>
                  <div>Trigger</div>
                  <div>Status</div>
                  <div>Terakhir Dijalankan</div>
                  <div className="text-right">Aksi</div>
                </div>
                
                {functions.map((fn) => (
                  <div key={fn.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-mono text-sm font-medium">{fn.name}</div>
                    <div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {fn.trigger}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline" className={fn.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {fn.status}
                      </Badge>
                    </div>
                    <div className="text-sm">{fn.lastRun}</div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTestFunction(fn.name)}
                      >
                        <Play size={14} className="mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Code2 size={14} className="mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployment Tab */}
        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Server size={18} className="mr-2" />
                  Deployment
                </div>
              </CardTitle>
              <CardDescription>
                Kelola dan deploy aplikasi ke berbagai lingkungan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Environments</h3>
                <Button onClick={handleDeploy} className="bg-blue-600 hover:bg-blue-700">
                  <Globe size={14} className="mr-1" />
                  Deploy
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-medium">
                  <div>Environment</div>
                  <div>URL</div>
                  <div>Status</div>
                  <div className="text-right">Aksi</div>
                </div>
                
                {environments.map((env) => (
                  <div key={env.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-medium">
                      {env.name}
                      <div className="text-xs text-gray-500">v{env.version}</div>
                    </div>
                    <div className="font-mono text-sm">{env.url}</div>
                    <div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {env.status}
                      </Badge>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink size={14} className="mr-1" />
                        Buka
                      </Button>
                      <Button size="sm" variant="outline">
                        <Server size={14} className="mr-1" />
                        Settings
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendEditor;

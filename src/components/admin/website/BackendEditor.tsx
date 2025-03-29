
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
                        <Code2 size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play size={14} className="mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 border rounded-md p-4">
                <h4 className="font-medium mb-2">Base URL</h4>
                <div className="flex">
                  <Input value="https://api.rekaland.com" readOnly className="bg-white font-mono text-sm" />
                  <Button variant="outline" className="ml-2">
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Gunakan base URL ini untuk semua panggilan API dari frontend Anda
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Key size={16} className="mr-2" />
                API Keys & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-md border border-yellow-100">
                <div className="flex items-center">
                  <AlertTriangle size={18} className="text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium">Jangan pernah menyimpan API keys di frontend</p>
                    <p className="text-sm text-gray-600">Gunakan Supabase Edge Functions untuk enkripsi dan keamanan</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="api-key">API Key (Development)</Label>
                  <div className="flex mt-1">
                    <Input type="password" value="••••••••••••••••••••••" readOnly id="api-key" />
                    <Button variant="outline" className="ml-2">
                      Show
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="api-key-prod">API Key (Production)</Label>
                  <div className="flex mt-1">
                    <Input type="password" value="••••••••••••••••••••••" readOnly id="api-key-prod" />
                    <Button variant="outline" className="ml-2">
                      Show
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-2">
                Regenerate Keys
              </Button>
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
                Kelola fungsi serverless untuk menjalankan logika bisnis pada backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Edge Functions</h3>
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
                
                {functions.map((func) => (
                  <div key={func.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-medium font-mono text-sm">{func.name}</div>
                    <div>
                      <Badge variant="outline">
                        {func.trigger}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline" className={func.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {func.status}
                      </Badge>
                    </div>
                    <div className="text-sm">{func.lastRun}</div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Code2 size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant={func.status === "active" ? "default" : "outline"}
                        onClick={() => handleTestFunction(func.name)}
                      >
                        <Play size={14} className="mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Eksekusi Function</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,298</div>
                    <p className="text-sm text-gray-500">bulan ini</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Function Aktif</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3 / 4</div>
                    <Progress value={75} className="mt-2 h-1" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Runtime</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="text-3xl font-bold">45ms</div>
                    <span className="text-sm text-gray-500 ml-2">rata-rata</span>
                  </CardContent>
                </Card>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                <h4 className="font-medium flex items-center">
                  <Server size={16} className="mr-2 text-blue-600" />
                  Supabase Edge Functions
                </h4>
                <p className="text-sm mt-1">
                  Kelola fungsi serverless dengan dukungan untuk multiple runtime dan kemampuan komputasi yang aman.
                </p>
                <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                  Pelajari lebih lanjut
                </Button>
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
                  Deployment & Environments
                </div>
              </CardTitle>
              <CardDescription>
                Kelola deployment dan lingkungan website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Website Aktif</p>
                    <p className="text-sm text-gray-600">Terakhir dipublikasikan: 2 jam yang lalu</p>
                  </div>
                </div>
                <Button onClick={handleDeploy}>
                  Deploy Ulang
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-medium">
                  <div>Environment</div>
                  <div>URL</div>
                  <div>Status</div>
                  <div>Versi</div>
                </div>
                
                {environments.map((env) => (
                  <div key={env.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-medium">{env.name}</div>
                    <div className="flex items-center">
                      <span className="text-sm font-mono">{env.url}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                        <ExternalLink size={12} />
                      </Button>
                    </div>
                    <div>
                      <Badge variant="outline" className={env.status === "online" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {env.status}
                      </Badge>
                    </div>
                    <div className="font-mono text-sm">{env.version}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">98<span className="text-base">/100</span></div>
                    <p className="text-sm text-gray-500">Lighthouse score</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.9<span className="text-base">%</span></div>
                    <p className="text-sm text-gray-500">30 hari terakhir</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Deployment Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">45<span className="text-base">s</span></div>
                    <p className="text-sm text-gray-500">rata-rata</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Globe size={16} className="mr-2" />
                  Deploy ke Production
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileJson size={16} className="mr-2" />
                  Download Backend Config
                </Button>
                <Button variant="outline" className="flex-1">
                  <AlertCircle size={16} className="mr-2" />
                  Validasi Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendEditor;

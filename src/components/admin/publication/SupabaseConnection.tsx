
import { Database, Eye, FileText, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SupabaseConnection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Koneksi Supabase</CardTitle>
        <CardDescription>Pengaturan koneksi ke Supabase untuk backend website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
            <p className="font-medium text-orange-800 flex items-center gap-2">
              <Database size={18} />
              Status koneksi: Terhubung
            </p>
            <p className="text-sm text-gray-600 mt-1">Database aktif dan berfungsi dengan normal</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="project-id">Supabase Project ID</Label>
              <Input id="project-id" value="rekaland-production-db" className="bg-gray-50" readOnly />
            </div>
            <div>
              <Label htmlFor="api-url">API URL</Label>
              <Input id="api-url" value="https://xxxxxxxxxxxx.supabase.co" className="bg-gray-50" readOnly />
            </div>
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex">
                <Input id="api-key" type="password" value="••••••••••••••••" className="rounded-r-none bg-gray-50" readOnly />
                <Button className="rounded-l-none" variant="outline">
                  <Eye size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Public API key untuk otentikasi klien</p>
            </div>

            <div>
              <Label htmlFor="sync-status">Status Sinkronisasi</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Terakhir sinkronisasi: 15 Jun 2023 13:45</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tabel yang terhubung</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>properties</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>users</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span>content</span>
                </div>
                <Badge variant="outline" className="bg-green-50">Tersedia</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw size={16} />
              Sinkronisasi Ulang
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <FileText size={16} />
              Dokumentasi
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnection;

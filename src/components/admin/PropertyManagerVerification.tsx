import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRealTimeSync } from "@/hooks/useRealTimeSync";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle, Clock, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PropertyManager } from "@/integrations/supabase/client";

const PropertyManagerVerification = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState<PropertyManager[]>([]);
  const [filteredManagers, setFilteredManagers] = useState<PropertyManager[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailManager, setDetailManager] = useState<PropertyManager | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  // Set up real-time listening for the property_managers table
  useEffect(() => {
    const channel = supabase
      .channel('property-managers-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'property_managers' }, 
        () => {
          fetchManagers();
        })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch property managers on load
  useEffect(() => {
    fetchManagers();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery) {
      const filtered = managers.filter(manager => 
        manager.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manager.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manager.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredManagers(filtered);
    } else {
      setFilteredManagers(managers);
    }
  }, [searchQuery, managers]);

  async function fetchManagers() {
    setLoading(true);
    try {
      // We need to cast to 'any' to bypass TypeScript type checking
      const { data, error } = await (supabase as any)
        .from('property_managers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setManagers(data as PropertyManager[]);
      setFilteredManagers(data as PropertyManager[]);
    } catch (error: any) {
      console.error('Error fetching property managers:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data pengelola properti",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateManagerStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await (supabase as any)
        .from('property_managers')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // If approved, update the user_roles table to grant property_manager role
      if (status === 'approved' && detailManager) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            { user_id: detailManager.user_id, role: 'property_manager' }
          ]);
          
        if (roleError) throw roleError;
      }

      toast({
        title: status === 'approved' ? "Disetujui" : "Ditolak",
        description: `Pengelola properti berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}`,
        className: status === 'approved' 
          ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
          : undefined,
        variant: status === 'approved' ? undefined : "destructive",
      });
      
      // Close the dialog and refresh the list
      setShowDetailsDialog(false);
      fetchManagers();
    } catch (error: any) {
      console.error('Error updating property manager status:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui status pengelola properti",
        variant: "destructive",
      });
    }
  }

  function handleViewDetails(manager: PropertyManager) {
    setDetailManager(manager);
    setShowDetailsDialog(true);
  }

  // Render status badge
  function renderStatusBadge(status: string) {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 flex items-center gap-1">
            <Clock size={12} />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 flex items-center gap-1">
            <CheckCircle size={12} />
            Disetujui
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 flex items-center gap-1">
            <X size={12} />
            Ditolak
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  // Format date
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Verifikasi Pengelola Properti</CardTitle>
        <CardDescription>
          Verifikasi dan kelola permintaan pendaftaran pengelola properti
        </CardDescription>
        <div className="mt-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Cari nama, email, perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rekaland-orange"></div>
          </div>
        ) : filteredManagers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? "Tidak ada hasil yang cocok dengan pencarian Anda" : "Belum ada permintaan pendaftaran pengelola properti"}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Nama</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Wilayah</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[120px]">Tanggal</TableHead>
                  <TableHead className="text-right w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredManagers.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">
                      {manager.full_name}
                      <div className="text-xs text-gray-500">{manager.email}</div>
                    </TableCell>
                    <TableCell>{manager.company}</TableCell>
                    <TableCell>{manager.region}</TableCell>
                    <TableCell>{renderStatusBadge(manager.status)}</TableCell>
                    <TableCell className="text-sm">{formatDate(manager.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(manager)}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detail Pengelola Properti</DialogTitle>
              <DialogDescription>
                Informasi lengkap pengelola properti dan tindakan verifikasi
              </DialogDescription>
            </DialogHeader>
            {detailManager && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nama Lengkap</h4>
                    <p className="text-base">{detailManager.full_name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-base break-all">{detailManager.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nomor Telepon</h4>
                    <p className="text-base">{detailManager.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tanggal Pendaftaran</h4>
                    <p className="text-base">{formatDate(detailManager.created_at)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Perusahaan</h4>
                    <p className="text-base">{detailManager.company}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Wilayah Pengelolaan</h4>
                    <p className="text-base">{detailManager.region}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <div className="mt-1">{renderStatusBadge(detailManager.status)}</div>
                  </div>
                </div>

                {detailManager.status === 'pending' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-800">
                        Permintaan ini menunggu persetujuan Anda. Setelah disetujui, pengelola properti akan dapat mengajukan properti untuk diverifikasi.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              {detailManager?.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => updateManagerStatus(detailManager.id, 'rejected')}
                    className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Tolak Pendaftaran
                  </Button>
                  <Button
                    onClick={() => updateManagerStatus(detailManager.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Setujui Pendaftaran
                  </Button>
                </>
              )}
              {detailManager?.status !== 'pending' && (
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Tutup
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PropertyManagerVerification;

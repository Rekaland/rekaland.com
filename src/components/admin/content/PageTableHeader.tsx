
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const PageTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Judul</TableHead>
        <TableHead>URL</TableHead>
        <TableHead>Terakhir Diubah</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Aksi</TableHead>
      </TableRow>
    </TableHeader>
  );
};

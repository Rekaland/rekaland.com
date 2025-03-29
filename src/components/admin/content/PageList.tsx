
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PageSearchBar } from "./PageSearchBar";
import { PageStatusBadge } from "./PageStatusBadge";
import { PageActions } from "./PageActions";
import { PageTableHeader } from "./PageTableHeader";

interface Page {
  id: number;
  title: string;
  slug: string;
  lastEdited: string;
  status: string;
}

interface PageListProps {
  pages: Page[];
  onEditPage: (id: number) => void;
}

export const PageList = ({ pages, onEditPage }: PageListProps) => {
  const { toast } = useToast();
  const [filteredPages, setFilteredPages] = useState(pages);

  const handleViewPage = (id: number) => {
    const page = pages.find(p => p.id === id);
    toast({
      title: "Melihat halaman",
      description: `Membuka preview halaman: ${page?.title}`,
      duration: 1000,
      className: "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg animate-in fade-in-80 slide-in-from-bottom-10",
    });
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredPages(pages);
      return;
    }
    
    const filtered = pages.filter(page => 
      page.title.toLowerCase().includes(query.toLowerCase()) || 
      page.slug.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPages(filtered);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold">Daftar Halaman</h3>
        <PageSearchBar onSearch={handleSearch} />
      </div>
      
      <div className="rounded-md border overflow-hidden mt-4">
        <Table>
          <PageTableHeader />
          <TableBody>
            {filteredPages.map(page => (
              <TableRow key={page.id} className="hover:bg-gray-50">
                <TableCell>{page.id}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.lastEdited}</TableCell>
                <TableCell>
                  <PageStatusBadge status={page.status} />
                </TableCell>
                <TableCell>
                  <PageActions 
                    pageId={page.id} 
                    onEdit={onEditPage} 
                    onView={handleViewPage} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

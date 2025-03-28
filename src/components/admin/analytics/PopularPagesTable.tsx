
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PageView } from "./types";

interface PopularPagesTableProps {
  pages: PageView[];
}

const PopularPagesTable = ({ pages }: PopularPagesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performa Halaman</CardTitle>
        <CardDescription>Halaman paling populer</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Halaman</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <TableRow key={index}>
                <TableCell>{page.page}</TableCell>
                <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PopularPagesTable;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Legend 
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ChartDataItem, TrafficSource } from "./types";

interface TrafficSourcesChartProps {
  chartData: ChartDataItem[];
  tableData: TrafficSource[];
}

const chartConfig = {
  visitors: {
    label: "Pengunjung",
    theme: {
      light: "#F97316",
      dark: "#FB923C"
    }
  },
  pageViews: {
    label: "Tampilan Halaman",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa"
    }
  }
};

const TrafficSourcesChart = ({ chartData, tableData }: TrafficSourcesChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sumber Traffic</CardTitle>
        <CardDescription>Dari mana pengunjung website berasal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" name="pageViews" fill="var(--color-pageViews)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Sumber</TableHead>
              <TableHead className="text-right">Persentase</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((source, index) => (
              <TableRow key={index}>
                <TableCell>{source.source}</TableCell>
                <TableCell className="text-right">{source.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrafficSourcesChart;

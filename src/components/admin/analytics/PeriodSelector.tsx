
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PeriodSelectorProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const PeriodSelector = ({ period, onPeriodChange }: PeriodSelectorProps) => {
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Ekspor Data",
      description: "Data analisis berhasil diekspor ke Excel",
      duration: 2000,
    });
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant={period === "day" ? "default" : "outline"} 
        size="sm"
        onClick={() => onPeriodChange("day")}
      >
        Hari Ini
      </Button>
      <Button 
        variant={period === "week" ? "default" : "outline"} 
        size="sm"
        onClick={() => onPeriodChange("week")}
      >
        Minggu Ini
      </Button>
      <Button 
        variant={period === "month" ? "default" : "outline"} 
        size="sm"
        onClick={() => onPeriodChange("month")}
      >
        Bulan Ini
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportData}
        className="ml-2"
      >
        <Download size={16} className="mr-1" />
        Ekspor
      </Button>
    </div>
  );
};

export default PeriodSelector;

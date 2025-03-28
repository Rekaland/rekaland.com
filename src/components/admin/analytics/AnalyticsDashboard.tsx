
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StatCards from "./StatCards";
import VisitorsChart from "./VisitorsChart";
import PopularPagesTable from "./PopularPagesTable";
import TrafficSourcesChart from "./TrafficSourcesChart";
import RealTimeActivity from "./RealTimeActivity";
import PeriodSelector from "./PeriodSelector";
import { visitorData, trafficSourceData, defaultStats } from "./mockData";
import { StatCard, DashboardStats } from "./types";

const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState("week");
  const { toast } = useToast();
  const [stats] = useState<DashboardStats>(defaultStats);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    toast({
      title: "Periode diubah",
      description: `Data diperbarui untuk periode: ${newPeriod}`,
      duration: 2000,
    });
  };

  // Transform stats into stat cards format
  const statCards: StatCard[] = [
    {
      title: "Total Pengunjung",
      value: stats.totalVisitors,
      change: "+12.5% dari periode sebelumnya",
      isPositive: true
    },
    {
      title: "Total Page Views",
      value: stats.pageViews,
      change: "+8.3% dari periode sebelumnya",
      isPositive: true
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      change: "+1.2% dari periode sebelumnya",
      isPositive: true
    },
    {
      title: "Avg. Time on Site",
      value: stats.avgTimeOnSite,
      change: "+0:42 dari periode sebelumnya",
      isPositive: true
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analisis Website</h2>
        <PeriodSelector period={period} onPeriodChange={handlePeriodChange} />
      </div>

      <StatCards stats={statCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VisitorsChart 
          data={visitorData} 
          title="Grafik Pengunjung" 
          description="Jumlah pengunjung per hari" 
        />
        <PopularPagesTable pages={stats.popularPages} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficSourcesChart 
          chartData={trafficSourceData} 
          tableData={stats.traffic} 
        />
        <RealTimeActivity />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

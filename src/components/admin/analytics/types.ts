
export interface StatCard {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface PageView {
  page: string;
  views: number;
}

export interface TrafficSource {
  source: string;
  percentage: string;
}

export interface ActivityItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface DashboardStats {
  totalVisitors: string;
  pageViews: string;
  conversionRate: string;
  avgTimeOnSite: string;
  popularPages: PageView[];
  traffic: TrafficSource[];
}

export type TransactionStatus = "paid" | "pending" | "failed" | "cancelled";

export interface Transaction {
  id: string;
  client: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  description?: string;
}

export interface RevenueDataPoint {
  date: string;
  amount: number;
}

export interface CategoryDataPoint {
  category: string;
  value: number;
  color?: string;
}

export interface GoalDataPoint {
  label: string;
  current: number;
  target: number;
}

export interface DashboardSummary {
  totalRevenue: number;
  revenueChangePercentage: number;
  averageTicket: number;
  activeSubscriptions?: number;
  churnRate?: number;
  projectedRevenue?: number;
}

export interface BillingDashboardProps {
  summary: DashboardSummary;
  revenueHistory: RevenueDataPoint[];
  revenueByCategory: CategoryDataPoint[];
  recentTransactions: Transaction[];
  goals?: GoalDataPoint[];
  locale?: string;
  currency?: string;
  isLoading?: boolean;
  dateRange?: { from: string; to: string };
  onDateRangeChange?: (range: { from: string; to: string }) => void;
}

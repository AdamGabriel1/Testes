"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCurrencyFormatter } from "../hooks/use-currency-formatter";
import { cn } from "../lib/utils";

interface RevenueChartProps {
  data: { date: string; amount: number }[];
  locale?: string;
  currency?: string;
  className?: string;
}

export function RevenueChart({
  data,
  locale = "pt-BR",
  currency = "BRL",
  className,
}: RevenueChartProps) {
  const { formatCompact } = useCurrencyFormatter({ locale, currency });

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold">Evolução de Faturamento</h3>
      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatCompact(v)}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              formatter={(value: number) => [formatCompact(value), "Faturamento"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--popover))",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary))"
              fill="url(#revenueGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

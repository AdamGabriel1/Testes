"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCurrencyFormatter } from "../hooks/use-currency-formatter";
import { cn } from "../lib/utils";

interface CategoryChartProps {
  data: { category: string; value: number; color?: string }[];
  locale?: string;
  currency?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CategoryChart({
  data,
  locale = "pt-BR",
  currency = "BRL",
  className,
}: CategoryChartProps) {
  const { formatCompact } = useCurrencyFormatter({ locale, currency });

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold">Faturamento por Canal/Produto</h3>
      <div className="mt-4 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                formatCompact(value),
                `${((value / total) * 100).toFixed(1)}%`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                }}
              />
              <span className="text-muted-foreground">{item.category}</span>
            </div>
            <span className="font-medium">{formatCompact(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

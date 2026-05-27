"use client";

import { useCurrencyFormatter } from "../hooks/use-currency-formatter";
import { cn } from "../lib/utils";

interface GoalComparisonProps {
  data: { label: string; current: number; target: number }[];
  locale?: string;
  currency?: string;
  className?: string;
}

export function GoalComparison({
  data,
  locale = "pt-BR",
  currency = "BRL",
  className,
}: GoalComparisonProps) {
  const { formatCompact } = useCurrencyFormatter({ locale, currency });

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold">Metas vs Realizado</h3>
      <div className="mt-4 space-y-5">
        {data.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const isOverachieved = goal.current >= goal.target;

          return (
            <div key={goal.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.label}</span>
                <span className="text-muted-foreground">
                  {formatCompact(goal.current)} / {formatCompact(goal.target)}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isOverachieved ? "bg-emerald-500" : "bg-primary"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {percentage.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCurrencyFormatter } from "../hooks/use-currency-formatter";
import { cn } from "../lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  change?: number;
  isCurrency?: boolean;
  isCompact?: boolean;
  icon?: React.ReactNode;
  locale?: string;
  currency?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  isCurrency = false,
  isCompact = false,
  icon,
  locale = "pt-BR",
  currency = "BRL",
  className,
}: KpiCardProps) {
  const { format, formatCompact, formatPercentage } = useCurrencyFormatter({
    locale,
    currency,
  });

  const displayValue = isCurrency
    ? isCompact
      ? formatCompact(value)
      : format(value)
    : new Intl.NumberFormat(locale).format(value);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight">{displayValue}</h3>
        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              isPositive && "text-emerald-600",
              isNegative && "text-red-600",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp className="h-3 w-3" />}
            {isNegative && <TrendingDown className="h-3 w-3" />}
            {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
            {formatPercentage(Math.abs(change))}
          </span>
        )}
      </div>
    </div>
  );
}

import { useCallback } from "react";

interface UseCurrencyFormatterOptions {
  locale?: string;
  currency?: string;
}

export function useCurrencyFormatter(options: UseCurrencyFormatterOptions = {}) {
  const { locale = "pt-BR", currency = "BRL" } = options;

  const format = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(value);
    },
    [locale, currency]
  );

  const formatCompact = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value);
    },
    [locale, currency]
  );

  const formatPercentage = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: "percent",
        signDisplay: "exceptZero",
        minimumFractionDigits: 1,
      }).format(value / 100);
    },
    [locale]
  );

  return { format, formatCompact, formatPercentage };
}

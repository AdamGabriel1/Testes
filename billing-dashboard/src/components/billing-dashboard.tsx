"use client";

import { KpiCard } from "./kpi-card";
import { RevenueChart } from "./revenue-chart";
import { CategoryChart } from "./category-chart";
import { GoalComparison } from "./goal-comparison";
import { TransactionsTable } from "./transactions-table";
import { DashboardSkeleton } from "./dashboard-skeleton";
import type { BillingDashboardProps } from "../types";

export function BillingDashboard({
  summary,
  revenueHistory,
  revenueByCategory,
  recentTransactions,
  goals,
  locale = "pt-BR",
  currency = "BRL",
  isLoading = false,
}: BillingDashboardProps) {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Grid de KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Faturamento Total"
          value={summary.totalRevenue}
          change={summary.revenueChangePercentage}
          isCurrency
          locale={locale}
          currency={currency}
        />
        <KpiCard
          title="Ticket Médio"
          value={summary.averageTicket}
          isCurrency
          locale={locale}
          currency={currency}
        />
        {summary.activeSubscriptions !== undefined && (
          <KpiCard
            title="Assinaturas Ativas"
            value={summary.activeSubscriptions}
            locale={locale}
          />
        )}
        {summary.churnRate !== undefined && (
          <KpiCard
            title="Taxa de Churn"
            value={summary.churnRate}
            change={summary.churnRate > 5 ? undefined : -summary.churnRate}
            locale={locale}
          />
        )}
        {summary.projectedRevenue !== undefined && (
          <KpiCard
            title="Projeção de Fechamento"
            value={summary.projectedRevenue}
            isCurrency
            locale={locale}
            currency={currency}
          />
        )}
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-7">
        <RevenueChart
          data={revenueHistory}
          locale={locale}
          currency={currency}
          className="lg:col-span-4"
        />
        <CategoryChart
          data={revenueByCategory}
          locale={locale}
          currency={currency}
          className="lg:col-span-3"
        />
      </div>

      {/* Metas + Tabela */}
      <div className="grid gap-4 lg:grid-cols-3">
        {goals && goals.length > 0 && (
          <GoalComparison
            data={goals}
            locale={locale}
            currency={currency}
            className="lg:col-span-1"
          />
        )}
        <TransactionsTable
          data={recentTransactions}
          locale={locale}
          currency={currency}
          className={goals && goals.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}
        />
      </div>
    </div>
  );
}

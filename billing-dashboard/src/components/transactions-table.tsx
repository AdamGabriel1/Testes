"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCurrencyFormatter } from "../hooks/use-currency-formatter";
import { cn } from "../lib/utils";
import type { Transaction, TransactionStatus } from "../types";

interface TransactionsTableProps {
  data: Transaction[];
  locale?: string;
  currency?: string;
  className?: string;
  maxRows?: number;
}

const statusConfig: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  paid: { label: "Pago", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  pending: { label: "Pendente", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  failed: { label: "Falhou", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  cancelled: { label: "Cancelado", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
};

const columnHelper = createColumnHelper<Transaction>();

export function TransactionsTable({
  data,
  locale = "pt-BR",
  currency = "BRL",
  className,
  maxRows = 10,
}: TransactionsTableProps) {
  const { format } = useCurrencyFormatter({ locale, currency });

  const columns = [
    columnHelper.accessor("client", {
      header: "Cliente",
      cell: (info) => (
        <div>
          <p className="font-medium">{info.getValue()}</p>
          {info.row.original.description && (
            <p className="text-xs text-muted-foreground">
              {info.row.original.description}
            </p>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("date", {
      header: "Data",
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {new Date(info.getValue()).toLocaleDateString(locale)}
        </span>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Valor",
      cell: (info) => <span className="font-medium">{format(info.getValue())}</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        const config = statusConfig[status];
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              config.className
            )}
          >
            {config.label}
          </span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data.slice(0, maxRows),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold">Últimas Transações</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

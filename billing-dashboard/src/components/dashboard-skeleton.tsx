import { Skeleton } from "./skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-8 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Skeleton className="h-[400px] lg:col-span-4" />
        <Skeleton className="h-[400px] lg:col-span-3" />
      </div>
      <Skeleton className="h-[300px]" />
    </div>
  );
}

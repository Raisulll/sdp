import { Skeleton } from "@/components/ui/skeleton";

export function MyBooksSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-full max-w-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-6 bg-white p-4 rounded-lg">
            <Skeleton className="w-32 h-40 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
    </div>
  );
}

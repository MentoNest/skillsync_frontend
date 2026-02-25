import { cn } from "@/lib/utils";

interface ToolCardSkeletonProps {
  gradient?: string;
  className?: string;
}

export function ToolCardSkeleton({
  gradient = "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)",
  className,
}: ToolCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-7 flex flex-col gap-2.5 min-w-[260px] max-w-[380px] flex-1",
        className
      )}
      style={{
        background: gradient,
        boxShadow: "0 2px 12px rgba(99,102,241,0.06)",
      }}
    >
      {/* Icon Skeleton */}
      <div className="w-7 h-7 bg-gray-300 rounded animate-pulse mb-1" />

      {/* Title Skeleton */}
      <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mb-2" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Button Skeleton */}
      <div className="mt-2 w-20 h-10 bg-gray-300 rounded-lg animate-pulse" />
    </div>
  );
}

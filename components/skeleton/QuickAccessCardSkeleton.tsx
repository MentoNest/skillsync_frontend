export default function QuickAccessCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* icon placeholder */}
      <div className="h-11 w-11 rounded-lg bg-gray-200 animate-pulse" />
      {/* text placeholders */}
      <div className="flex flex-col gap-2">
        <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

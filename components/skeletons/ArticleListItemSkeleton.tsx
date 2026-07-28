export default function ArticleListItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      <div>
        <div className="h-3 bg-slate-200 rounded w-16 animate-pulse mb-2"></div>
        <div className="h-5 bg-slate-200 rounded w-2/3 animate-pulse mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-32 animate-pulse"></div>
      </div>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 animate-pulse"></div>
    </div>
  );
}

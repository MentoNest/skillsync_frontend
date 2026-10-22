export default function MentorProfileLoading() {
  return (
    <div
      className="bg-slate-50 min-h-screen"
      role="status"
      aria-live="polite"
      aria-label="Loading mentor profile"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="h-5 w-32 rounded bg-slate-200 animate-pulse" />
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-slate-200 animate-pulse" />
              <div className="flex-1 min-w-0 space-y-3">
                <div className="h-7 w-56 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-72 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="h-20 rounded-xl bg-slate-100 animate-pulse" />
              <div className="h-20 rounded-xl bg-slate-100 animate-pulse" />
              <div className="h-20 rounded-xl bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

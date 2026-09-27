/**
 * Loading state for mentor profile page
 * Displays skeleton UI while mentor data is being fetched
 */
export default function MentorProfileLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 animate-pulse">
            {/* Avatar skeleton */}
            <div className="w-32 h-32 bg-slate-200 rounded-full flex-shrink-0" />
            
            {/* Info skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-slate-200 rounded-lg w-2/3" />
              <div className="h-6 bg-slate-200 rounded-lg w-1/2" />
              <div className="flex gap-3">
                <div className="h-5 bg-slate-200 rounded-full w-24" />
                <div className="h-5 bg-slate-200 rounded-full w-24" />
                <div className="h-5 bg-slate-200 rounded-full w-24" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex flex-col gap-3 md:w-48">
              <div className="h-12 bg-slate-200 rounded-lg" />
              <div className="h-12 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="h-6 bg-slate-200 rounded-lg w-32 mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded-lg w-full" />
                <div className="h-4 bg-slate-200 rounded-lg w-full" />
                <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
              </div>
            </div>

            {/* Skills section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="h-6 bg-slate-200 rounded-lg w-32 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-8 bg-slate-200 rounded-full w-20" />
                ))}
              </div>
            </div>

            {/* Experience section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="h-6 bg-slate-200 rounded-lg w-32 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded-lg w-2/3" />
                    <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-slate-200 rounded-lg w-20" />
                    <div className="h-4 bg-slate-200 rounded-lg w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="h-6 bg-slate-200 rounded-lg w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 bg-slate-200 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        Loading mentor profile...
      </div>
    </div>
  );
}

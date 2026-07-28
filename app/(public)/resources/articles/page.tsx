import Articles from "./Articles";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back to Resources link */}
        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Resources
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-gray-800 pb-8 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Articles &amp; Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-gray-400 max-w-3xl">
            Stay up to date with the latest industry insights, career advice,
            and deep dives written by experienced mentors.
          </p>
        </div>

        {/* Articles List */}
        <Articles />
      </div>
    </main>
  );
}

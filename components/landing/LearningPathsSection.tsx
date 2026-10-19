import Link from "next/link";

const CATEGORIES = [
  {
    name: "Break Into Tech",
    blurb: "For career switchers and first-time applicants.",
    resources: [
      { title: "Your First Engineering Interview", type: "Workshop", level: "Beginner", duration: "90 min" },
      { title: "Portfolios That Get Callbacks", type: "Guide", level: "Beginner", duration: "25 min" },
      { title: "Transferring Skills From Another Field", type: "Article", level: "All levels", duration: "12 min" },
    ],
  },
  {
    name: "Grow as an Engineer",
    blurb: "For ICs aiming at senior and staff roles.",
    resources: [
      { title: "Reading Large Codebases Fast", type: "Course", level: "Intermediate", duration: "5 hours" },
      { title: "Writing Design Docs People Read", type: "Guide", level: "Intermediate", duration: "35 min" },
      { title: "The Staff Engineer's Communication Kit", type: "Workshop", level: "Advanced", duration: "2 hours" },
    ],
  },
  {
    name: "Lead Without the Title",
    blurb: "For new and aspiring engineering managers.",
    resources: [
      { title: "Your First 30 Days as a Manager", type: "Course", level: "Intermediate", duration: "4 hours" },
      { title: "1-on-1s That Are Worth Having", type: "Workshop", level: "All levels", duration: "75 min" },
      { title: "Delivering Hard Feedback", type: "Article", level: "All levels", duration: "18 min" },
    ],
  },
] as const;

const TYPE_STYLES: Record<string, string> = {
  Course: "bg-indigo-100 text-indigo-700",
  Workshop: "bg-violet-100 text-violet-700",
  Guide: "bg-emerald-100 text-emerald-700",
  Article: "bg-amber-100 text-amber-700",
};

/**
 * Learning paths and resources section (#1159).
 *
 * Three audiences, three resource cards each, every CTA a `next/link`. The
 * `href` values are placeholders until resource detail routes exist — they
 * point at `/resources/[slug]` in the same shape the real routes will use.
 */
export default function LearningPathsSection() {
  return (
    <section
      id="learning-paths"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="learning-paths-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Learning paths
          </p>
          <h2
            id="learning-paths-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Resources for wherever you are now
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Short, practical material from mentors on the platform — pick a
            path, or jump straight to the topic you need this week.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {CATEGORIES.map((category) => (
            <section
              key={category.name}
              aria-label={category.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <header className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{category.blurb}</p>
              </header>

              <ul className="mt-5 flex flex-1 flex-col gap-4" role="list">
                {category.resources.map((resource) => (
                  <li
                    key={resource.title}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLES[resource.type] ?? "bg-slate-100 text-slate-700"}`}
                      >
                        {resource.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {resource.level} · {resource.duration}
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold leading-snug text-slate-900">
                      {resource.title}
                    </h4>
                    <Link
                      href={`/resources/${resource.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label={`Open ${resource.title}`}
                    >
                      Start learning
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Not sure which path fits?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            A mentor can look at where you are and tell you what to learn next
            — usually in one session.
          </p>
          <Link
            href="/register"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get a learning plan
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

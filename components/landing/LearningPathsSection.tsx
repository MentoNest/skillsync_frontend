import Link from "next/link";

const RESOURCE_CATEGORIES = [
  {
    name: "Technical Skills",
    icon: "code",
    resources: [
      { title: "System Design Masterclass", type: "Course", duration: "12 hours", level: "Advanced", href: "/resources/system-design" },
      { title: "Kubernetes Fundamentals", type: "Workshop", duration: "6 hours", level: "Intermediate", href: "/resources/kubernetes" },
      { title: "React Performance Patterns", type: "Guide", duration: "45 min", level: "All Levels", href: "/resources/react-performance" },
      { title: "Database Design Principles", type: "Article", duration: "20 min", level: "Beginner", href: "/resources/database-design" },
    ],
  },
  {
    name: "Career Development",
    icon: "briefcase",
    resources: [
      { title: "Staff Engineer Career Path", type: "Course", duration: "8 hours", level: "Advanced", href: "/resources/staff-engineer" },
      { title: "Technical Interview Preparation", type: "Workshop", duration: "10 hours", level: "All Levels", href: "/resources/interview-prep" },
      { title: "Salary Negotiation Strategies", type: "Guide", duration: "30 min", level: "All Levels", href: "/resources/salary-negotiation" },
      { title: "Building Your Personal Brand", type: "Article", duration: "15 min", level: "Beginner", href: "/resources/personal-brand" },
    ],
  },
  {
    name: "Leadership & Management",
    icon: "users",
    resources: [
      { title: "Engineering Management 101", type: "Course", duration: "15 hours", level: "Intermediate", href: "/resources/eng-management" },
      { title: "Effective 1-on-1 Meetings", type: "Workshop", duration: "3 hours", level: "All Levels", href: "/resources/one-on-ones" },
      { title: "Building High-Performing Teams", type: "Guide", duration: "1 hour", level: "Advanced", href: "/resources/high-performing-teams" },
      { title: "Giving Actionable Feedback", type: "Article", duration: "25 min", level: "All Levels", href: "/resources/feedback" },
    ],
  },
];

const TYPE_STYLES: Record<string, string> = {
  Course: "bg-indigo-100 text-indigo-700",
  Workshop: "bg-cyan-100 text-cyan-700",
  Guide: "bg-emerald-100 text-emerald-700",
  Article: "bg-amber-100 text-amber-700",
};

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
  "All Levels": "bg-slate-100 text-slate-700",
};

export default function LearningPathsSection() {
  return (
    <section
      id="learning-paths"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="learning-paths-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3" aria-hidden="true">
            Learning Resources
          </span>
          <h2
            id="learning-paths-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Accelerate your growth with curated resources
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Access courses, workshops, and guides created by industry experts to complement your mentorship journey.
          </p>
        </header>

        <div className="space-y-16">
          {RESOURCE_CATEGORIES.map((category) => (
            <article key={category.name} className="space-y-6" aria-labelledby={`category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <header className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    {category.icon === "code" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 16l4-16M6 12a4 4 0 11-8 0 4 4 0 018 0m0 0v6m0-6H2m16 0H6" />
                    )}
                    {category.icon === "briefcase" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {category.icon === "users" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                  </svg>
                </div>
                <h3 id={`category-${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-xl font-bold text-slate-900">
                  {category.name}
                </h3>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.resources.map((resource) => (
                  <article
                    key={resource.title}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden p-6"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[resource.type] || "bg-slate-100 text-slate-700"}`}>
                          {resource.type}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${LEVEL_STYLES[resource.level] || "bg-slate-100 text-slate-700"}`}>
                          {resource.level}
                        </span>
                      </div>

                      <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {resource.title}
                      </h4>

                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1" aria-label={`Duration: ${resource.duration}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {resource.duration}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={resource.href}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label={`View ${resource.title} resource`}
                    >
                      Start learning
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>
            </article>
          ))}

          <div className="text-center pt-8 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Want more personalized guidance?{" "}
              <span className="font-semibold text-slate-800">Book a mentor session</span> to get a custom learning plan.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Find a mentor
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
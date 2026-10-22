import ToolCard, { ToolCardProps } from "@/components/resources/ToolCard";

/**
 * Tools and templates offered on `/resources`.
 *
 * ⚠️ The CTAs point to `/register` until the tools have their own routes.
 */
const TOOLS: (ToolCardProps & { id: string })[] = [
  {
    id: "resume-builder",
    title: "Resume Builder",
    description:
      "Start from a mentor-reviewed template and build a CV that gets read past the first third of the page.",
    features: [
      "ATS-friendly templates",
      "Section-by-section guidance",
      "Export to PDF",
    ],
    ctaLabel: "Build your resume",
    ctaHref: "/register",
    gradient: "indigo",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    id: "career-planner",
    title: "Career Planner",
    description:
      "Map where you are, where you want to be, and the concrete steps between the two — then review it with a mentor.",
    features: [
      "Goal and milestone tracking",
      "Skill gap checklist",
      "Share with your mentor",
    ],
    ctaLabel: "Plan your career",
    ctaHref: "/register",
    gradient: "emerald",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
  },
];

/** "Tools & templates" section, near the bottom of `/resources`. */
export default function ResourceTools() {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="scroll-mt-16 py-16 lg:py-20 border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Tools &amp; templates
          </p>
          <h2
            id="tools-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            Put what you learn to work
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Free tools to turn reading into something you can send, share, or
            follow.
          </p>
        </div>

        {/* Stacked on mobile, side by side from `md`. */}
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TOOLS.map(({ id, ...tool }) => (
            <li key={id} className="flex min-w-0">
              <ToolCard {...tool} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";

export interface ResourceCardProps {
  title: string;
  type: string;
  duration: string;
  level: string;
  href: string;
  className?: string;
}

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

export default function ResourceCard({
  title,
  type,
  duration,
  level,
  href,
  className = "",
}: ResourceCardProps) {
  return (
    <article
      className={`group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden p-6 ${className}`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              TYPE_STYLES[type] || "bg-slate-100 text-slate-700"
            }`}
          >
            {type}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              LEVEL_STYLES[level] || "bg-slate-100 text-slate-700"
            }`}
          >
            {level}
          </span>
        </div>

        <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h4>

        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
          <span
            className="flex items-center gap-1"
            aria-label={`Duration: ${duration}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {duration}
          </span>
        </div>
      </div>

      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`View ${title} resource`}
      >
        Start learning
        <svg
          className="w-4 h-4"
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
    </article>
  );
}

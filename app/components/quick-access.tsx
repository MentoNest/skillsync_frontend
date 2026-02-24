import { FileText, PlaySquare, BookOpen, Download } from "lucide-react";

const resources = [
  {
    icon: FileText,
    title: "Resume Templates",
    description: "25 available",
    accentBg: "bg-indigo-50",
    accentIcon: "text-indigo-500",
  },
  {
    icon: PlaySquare,
    title: "Video Tutorials",
    description: "150 available",
    accentBg: "bg-purple-50",
    accentIcon: "text-purple-500",
  },
  {
    icon: BookOpen,
    title: "Career Guides",
    description: "40 available",
    accentBg: "bg-emerald-50",
    accentIcon: "text-emerald-500",
  },
  {
    icon: Download,
    title: "Downloadable Tools",
    description: "30 available",
    accentBg: "bg-amber-50",
    accentIcon: "text-amber-500",
  },
] as const;

export default function QuickAccess() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 md:mb-8">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="group relative flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-4 md:px-5 md:py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:bg-white hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${resource.accentBg}`}
              >
                <resource.icon
                  className={`h-6 w-6 ${resource.accentIcon}`}
                  strokeWidth={2}
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                  {resource.title}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-gray-500">
                  {resource.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


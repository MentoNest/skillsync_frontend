import type { ReactNode } from "react";
import LargeToolCard from "./LargeToolCard";
import { TOOLS_AND_TEMPLATES, type ResourceItem } from "./resourceData";

const resumeIcon: ReactNode = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
    <path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 12h6M10 16h6" />
  </svg>
);

const plannerIcon: ReactNode = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 15h3M8 18h6" />
  </svg>
);

const templateIcon: ReactNode = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const TOOL_PRESENTATION: Record<string, { icon: ReactNode; background: string }> = {
  "resume-builder": { icon: resumeIcon, background: "bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600" },
  "career-planner": { icon: plannerIcon, background: "bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600" },
  "portfolio-template": { icon: templateIcon, background: "bg-gradient-to-br from-fuchsia-700 via-purple-600 to-indigo-700" },
};

const FALLBACK_PRESENTATION = {
  icon: templateIcon,
  background: "bg-gradient-to-br from-purple-700 to-indigo-600",
};

export default function ToolsAndTemplates({ tools = TOOLS_AND_TEMPLATES }: { tools?: ResourceItem[] }) {
  return (
    <section aria-labelledby="tools-and-templates" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <h2 id="tools-and-templates" className="text-2xl font-semibold">Tools and Templates</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Practical resources to help you build a resume, plan your next move, and present your work.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const presentation = TOOL_PRESENTATION[tool.id] ?? FALLBACK_PRESENTATION;
          return (
            <LargeToolCard
              key={tool.id}
              icon={presentation.icon}
              title={tool.title}
              description={tool.description}
              button={{ label: tool.category === "Template" ? "Use Template" : "Open Tool", href: tool.href }}
              background={presentation.background}
            />
          );
        })}
      </div>
    </section>
  );
}

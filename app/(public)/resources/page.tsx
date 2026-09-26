import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Resources – SkillSync",
  description:
    "Curated articles, learning tracks, tools and templates to help you level up your career alongside your mentorship.",
};

/**
 * Sections the Learning Resources workstream will fill in. Rendering them as a
 * declared manifest keeps the page structure stable while the individual
 * section issues land.
 */
const PLANNED_SECTIONS = [
  {
    id: "resources-hero",
    title: "Hero",
    description: "Headline, supporting copy and resource search entry point.",
  },
  {
    id: "resource-categories",
    title: "Categories",
    description: "Browse resources by discipline, role or skill.",
  },
  {
    id: "quick-access",
    title: "Quick Access",
    description: "Shortcuts to the most-visited guides and templates.",
  },
  {
    id: "featured-learning-tracks",
    title: "Featured Learning Tracks",
    description: "Curated multi-step programmes for in-demand skills.",
  },
  {
    id: "featured-articles",
    title: "Featured Articles",
    description: "The latest practical writing from mentors and learners.",
  },
  {
    id: "tools-and-templates",
    title: "Tools & Templates",
    description: "Downloadable templates for CVs, portfolios and interviews.",
  },
];

export default function ResourcesPage() {
  return (
    <main id="main-content">
      {/* Page intro */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Learning Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl">
            Free tools to help you get better, faster
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            Guides, templates and structured learning tracks written by the same
            mentors you can book on SkillSync. No sign-up required to read.
          </p>
        </div>
      </section>

      {/* Library structure */}
      <section
        className="py-16 lg:py-20 bg-white"
        aria-labelledby="resources-library-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2
              id="resources-library-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
            >
              Resource library
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              This page is being built section by section. The structure below is
              ready for each part of the library.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PLANNED_SECTIONS.map((section) => (
              <li
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">{section.title}</h3>
                  <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-600">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {section.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Fallback CTA */}
          <div className="mt-12 rounded-2xl bg-indigo-600 px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Want guidance on your specific situation?
              </h3>
              <p className="mt-1 text-indigo-100">
                Book a 1-on-1 session with a mentor while the library is in
                progress.
              </p>
            </div>
            <Link
              href="/#mentors"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Find a mentor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

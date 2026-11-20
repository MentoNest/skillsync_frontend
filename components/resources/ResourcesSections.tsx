import Image from "next/image";
import Link from "next/link";
import { ResourceCategoryCard, type ResourceCategory } from "./ResourceCards";

/** Purple gradient hero for /resources (#1371). */
export function ResourcesHero() {
  return (
    <section aria-labelledby="resources-title" className="bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-16 text-center text-white">
      <h1 id="resources-title" className="text-3xl font-bold sm:text-4xl md:text-5xl">Learning Resources</h1>
      <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg">
        Templates, tutorials and guides curated by mentors to help you grow faster.
      </p>
    </section>
  );
}

const CATEGORIES: ResourceCategory[] = [
  {
    title: "Resume Templates",
    description: "Polished, ATS-friendly templates for every career stage.",
    href: "/resources/resumes",
    icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
  },
  {
    title: "Video Tutorials",
    description: "Short, mentor-led lessons you can follow at your pace.",
    href: "/resources/videos",
    icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>,
  },
  {
    title: "Career Guides",
    description: "Practical advice for interviews, portfolios and growth.",
    href: "/resources/guides",
    icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></svg>,
  },
  {
    title: "Downloadable Tools",
    description: "Worksheets and checklists you can use right away.",
    href: "/resources/tools",
    icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.9-.6-.6-2.9z" /></svg>,
  },
];

/** Quick Access grid: 4/2/1 columns (#1373). */
export function QuickAccessGrid({ items = CATEGORIES }: { items?: ResourceCategory[] }) {
  return (
    <section aria-labelledby="quick-access">
      <h2 id="quick-access" className="mb-4 text-xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((category) => <ResourceCategoryCard key={category.href} {...category} />)}
      </div>
    </section>
  );
}

const ARTICLES = [
  {
    title: "Tailoring your resume for the role you want",
    description: "Learn how to highlight the experience that matters most to hiring teams.",
    meta: "Career · 6 min read",
    href: "/resources/articles/tailor-resume",
  },
  {
    title: "Building a portfolio that gets noticed",
    description: "Choose projects that show your process, not just the final result.",
    meta: "Portfolio · 8 min read",
    href: "/resources/articles/portfolio",
  },
  {
    title: "A practical guide to technical interviews",
    description: "Prepare for common question formats with a repeatable study plan.",
    meta: "Interviews · 10 min read",
    href: "/resources/articles/technical-interviews",
  },
];

export function LatestArticles() {
  return (
    <section aria-labelledby="latest-articles" className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id="latest-articles" className="text-2xl font-semibold">Latest Articles</h2>
        <Link href="/resources/articles" aria-label="View all articles" className="text-sm font-medium text-purple-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">View All</Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <li key={article.href} className="flex">
            <article className="flex h-full w-full flex-col rounded-xl border p-5">
              <h3 className="text-base font-semibold leading-6">
                <Link href={article.href} className="hover:text-purple-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">{article.title}</Link>
              </h3>
              <p className="mt-2 text-sm leading-5 text-gray-600">{article.description}</p>
              <p className="mt-auto pt-4 text-xs leading-4 text-gray-500">{article.meta}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

const TOOLS = [
  { name: "Resume Builder", description: "Create and export a tailored resume.", href: "/resources/tools/resume-builder", icon: "/file.svg" },
  { name: "Interview Tracker", description: "Keep every application and interview in one place.", href: "/resources/tools/interview-tracker", icon: "/window.svg" },
  { name: "Skill Planner", description: "Map the skills you want to learn next.", href: "/resources/tools/skill-planner", icon: "/globe.svg" },
  { name: "Goal Worksheet", description: "Turn long-term goals into weekly actions.", href: "/resources/tools/goal-worksheet", icon: "/next.svg" },
];

export function PopularTools() {
  return (
    <section aria-labelledby="popular-tools" className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id="popular-tools" className="text-2xl font-semibold">Popular Tools</h2>
        <Link href="/resources/tools" aria-label="View all downloadable tools" className="text-sm font-medium text-purple-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">View All</Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="flex h-full flex-col rounded-xl border p-5 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
              <Image src={tool.icon} alt="" width={24} height={24} aria-hidden="true" className="h-6 w-6 object-contain" />
              <h3 className="mt-3 text-base font-semibold leading-6">{tool.name}</h3>
              <p className="mt-2 text-sm leading-5 text-gray-600">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

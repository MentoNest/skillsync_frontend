"use client";

import { useState, type ReactNode } from "react";
import { ResourceCategoryCard } from "./ResourceCards";

export function ResourcesHero() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-12 text-center text-white sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Learning Resources</h1>
      <p className="mx-auto mt-4 max-w-2xl break-words text-base sm:text-lg">
        Templates, tutorials and guides curated by mentors to help you grow faster.
      </p>
    </section>
  );
}

export function ResourceSearchBar({
  value = "",
  onChange,
  onSearch,
}: {
  value?: string;
  onChange?: (q: string) => void;
  onSearch?: (q: string) => void;
}) {
  const [internalValue, setInternalValue] = useState("");
  const currentValue = onChange ? value : internalValue;
  const update = (next: string) => {
    if (!onChange) setInternalValue(next);
    onChange?.(next);
    onSearch?.(next);
  };

  return (
    <div role="search" className="mx-auto w-full max-w-xl">
      <div className="relative">
        <svg aria-hidden className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input type="search" aria-label="Search resources" placeholder="Search resources..." value={currentValue}
          onChange={(e) => update(e.target.value)}
          className="w-full min-w-0 rounded-full border border-gray-300 py-3 pl-10 pr-4 text-base focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200" />
      </div>
    </div>
  );
}

export type QuickAccessItem = { title: string; href: string; description?: string; icon?: ReactNode };

const CATEGORIES: QuickAccessItem[] = [
  {
    title: "Articles",
    href: "/resources/articles",
    description: "Practical guides and insights from experienced mentors.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 5h16M4 12h16M4 19h10" /></svg>,
  },
  {
    title: "Learning Tracks",
    href: "/resources/tracks",
    description: "Structured paths that take you from basics to mastery.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 18 12 6l8 12" /><circle cx="12" cy="6" r="2" /></svg>,
  },
  {
    title: "Tools",
    href: "/resources/tools",
    description: "Utilities that make everyday career work easier.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M14 7a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-3-3z" /></svg>,
  },
  {
    title: "Templates",
    href: "/resources/templates",
    description: "Ready-made starting points you can tailor to your goals.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></svg>,
  },
];

export function QuickAccessGrid({ items = CATEGORIES }: { items?: QuickAccessItem[] }) {
  return (
    <section aria-labelledby="quick-access" className="w-full min-w-0">
      <h2 id="quick-access" className="mb-4 text-xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <ResourceCategoryCard key={c.href} title={c.title} description={c.description ?? ""} href={c.href} icon={c.icon ?? null} />
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

/** Purple gradient hero for /resources (#1371). */
export function ResourcesHero() {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-16 text-center text-white">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Learning Resources</h1>
      <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg">
        Templates, tutorials and guides curated by mentors to help you grow faster.
      </p>
    </section>
  );
}

/** Controlled, accessible resource search input (#1372). */
export function ResourceSearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [query, setQuery] = useState("");
  return (
    <div role="search" className="relative mx-auto w-full max-w-xl">
      <svg aria-hidden className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <input type="search" aria-label="Search resources" placeholder="Search resources..." value={query}
        onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
        className="w-full rounded-full border border-gray-300 py-3 pl-10 pr-4 focus:border-purple-600 focus:outline-none" />
    </div>
  );
}

const CATEGORIES = [
  { title: "Resume Templates", href: "/resources/resumes" },
  { title: "Video Tutorials", href: "/resources/videos" },
  { title: "Career Guides", href: "/resources/guides" },
  { title: "Downloadable Tools", href: "/resources/tools" },
];

/** Quick Access grid: 4/2/1 columns (#1373). */
export function QuickAccessGrid({ items = CATEGORIES }: { items?: { title: string; href: string }[] }) {
  return (
    <section aria-labelledby="quick-access">
      <h2 id="quick-access" className="mb-4 text-xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-xl border p-6 font-medium hover:shadow-md">{c.title}</Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ResourcesHero from '../../components/ResourcesHero';

export default function ResourcesPage() {
  const [query, setQuery] = useState('');

  const trimmedQuery = useMemo(() => query.trim(), [query]);

  return (
    <main className="bg-gray-100">
      <ResourcesHero />
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10 sm:-mt-12 lg:-mt-14">
        <div className="relative w-full max-w-3xl mx-auto">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={22}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for resources, courses, guides..."
            aria-label="Search learning resources"
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-base text-slate-700 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p>This page will host curated learning resources, guides, and tutorials.</p>
          {trimmedQuery ? (
            <p className="mt-3 text-sm text-gray-500">
              Searching for: <span className="font-medium text-gray-700">{trimmedQuery}</span>
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

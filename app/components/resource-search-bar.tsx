"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function ResourceSearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="w-full bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for resources, courses, guides..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 pl-11 pr-4 py-3 text-sm md:text-base text-gray-700 placeholder-gray-400 outline-none shadow-sm transition-all duration-150 focus:border-[#9333ea]/40 focus:bg-white focus:ring-2 focus:ring-[#9333ea]/40"
          />
        </div>
      </div>
    </section>
  );
}


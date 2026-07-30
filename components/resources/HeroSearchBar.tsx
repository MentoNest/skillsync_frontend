"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/resources/icons";

/**
 * HeroSearchBar — Functional search input styled for the hero section.
 *
 * Replaces the previously decorative-only search prompt CTA in the
 * Resources HeroSection with a real, interactive search input.
 *
 * On submit, navigates to /resources?q=<query> so the page-level
 * ResourceSearchBar can pick up the query.
 */
export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/resources?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="w-full max-w-md sm:w-auto sm:min-w-[320px]"
      aria-label="Quick resource search"
    >
      <label htmlFor="hero-resource-search" className="sr-only">
        Search guides, tutorials, and tools
      </label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon className="h-4 w-4 shrink-0 text-purple-300" />
        </div>
        <input
          id="hero-resource-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides, tutorials, tools…"
          className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-purple-200/60 backdrop-blur-sm outline-none transition hover:border-white/30 focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
        />
      </div>
    </form>
  );
}

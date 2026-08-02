"use client";

import React, { useState } from "react";
import Link from "next/link";
import ArticleListItem from "@/components/ArticleListItem";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/resources/icons";
import Articles from "./Articles";

const articles = [
  {
    category: "Career",
    title: "How to Land Your First Tech Job",
    author: "Jane Doe",
    readTime: "5 min read",
  },
  {
    category: "Skills",
    title: "Top 10 In-Demand Skills for 2025",
    author: "John Smith",
    readTime: "7 min read",
  },
  {
    category: "Mentorship",
    title: "Getting the Most Out of a Mentor",
    author: "Sarah Lee",
    readTime: "4 min read",
  },
  {
    category: "Engineering",
    title: "Understanding System Design Basics",
    author: "Alex Chen",
    readTime: "10 min read",
  },
  {
    category: "Product",
    title: "Defining a Product MVP That Works",
    author: "Rachel Green",
    readTime: "8 min read",
  },
  {
    category: "Design",
    title: "Color Theory in Modern UI Design",
    author: "David Foster",
    readTime: "6 min read",
  },
  {
    category: "Data",
    title: "Introduction to Machine Learning Models",
    author: "Priya Sharma",
    readTime: "12 min read",
  },
  {
    category: "Leadership",
    title: "Transitioning from IC to Engineering Manager",
    author: "Marcus Williams",
    readTime: "9 min read",
  },
];

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = debouncedQuery.trim()
    ? articles.filter((article) => {
        const q = debouncedQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q) ||
          article.author.toLowerCase().includes(q)
        );
      })
    : articles;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back to Resources link */}
        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Resources
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-gray-800 pb-8 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Articles &amp; Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-gray-400 max-w-3xl">
            Stay up to date with the latest industry insights, career advice,
            and deep dives written by experienced mentors.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <label htmlFor="articles-search" className="sr-only">
            Search articles
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-400" />
          </div>
          <input
            id="articles-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, category, or author…"
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Results count */}
        {debouncedQuery.trim() && (
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {filtered.length === 0
              ? "No articles found."
              : `${filtered.length} article${filtered.length === 1 ? "" : "s"} found`}
          </p>
        )}

        {/* Articles List */}
        {filtered.length > 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((article) => (
                <ArticleListItem key={article.title} {...article} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-base">
              No articles match{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                &quot;{debouncedQuery}&quot;
              </span>
              .
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors focus:outline-none focus:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

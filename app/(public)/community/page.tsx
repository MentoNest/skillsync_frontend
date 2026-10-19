"use client";

import { useState } from "react";

const categories = [
  "Career Growth",
  "Web Development",
  "Data & AI",
  "Design",
  "Interview Prep",
];

const discussions = [
  {
    id: 1,
    title: "How did you make the jump from junior to mid-level?",
    excerpt:
      "I have been working as a frontend developer for two years and would love to hear what helped you take the next step.",
    author: "Amara Okafor",
    initials: "AO",
    age: "2 hours ago",
    replies: 18,
    categories: ["Career Growth", "Web Development"],
  },
  {
    id: 2,
    title: "Share your favorite resources for learning machine learning",
    excerpt:
      "Looking for practical courses and projects that make the foundations easier to understand.",
    author: "Daniel Kim",
    initials: "DK",
    age: "5 hours ago",
    replies: 12,
    categories: ["Data & AI"],
  },
  {
    id: 3,
    title: "What makes a portfolio case study stand out?",
    excerpt:
      "I am refreshing my portfolio and trying to show the thinking behind my design decisions, not just the final screens.",
    author: "Sofia Martins",
    initials: "SM",
    age: "Yesterday",
    replies: 9,
    categories: ["Design", "Career Growth"],
  },
  {
    id: 4,
    title: "Preparing for my first system design interview",
    excerpt:
      "Which concepts should I focus on first, and how do you practice explaining trade-offs clearly?",
    author: "Ethan Brooks",
    initials: "EB",
    age: "Yesterday",
    replies: 24,
    categories: ["Interview Prep", "Web Development"],
  },
  {
    id: 5,
    title: "Finding a mentor who understands a career pivot",
    excerpt:
      "For those who changed fields, what questions helped you find the right person to learn from?",
    author: "Priya Shah",
    initials: "PS",
    age: "2 days ago",
    replies: 7,
    categories: ["Career Growth", "Interview Prep"],
  },
];

export default function CommunityPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      selectedCategories.length === 0 ||
      discussion.categories.some((category) =>
        selectedCategories.includes(category),
      ),
  );

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-12 dark:bg-gray-950 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 border-b border-slate-200 pb-8 dark:border-gray-800">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
            SkillSync Community
          </p>
          <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">
            Learn better, together.
          </h1>
          <p className="max-w-2xl text-slate-600 dark:text-gray-300">
            Exchange ideas, ask questions, and share what you are learning with
            people building their next chapter.
          </p>
        </header>

        <section aria-labelledby="category-filter-heading" className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2
              id="category-filter-heading"
              className="text-sm font-semibold text-slate-800 dark:text-gray-100"
            >
              Browse by category
            </h2>
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="text-sm font-medium text-teal-800 underline underline-offset-4 hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Discussion categories">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
                    isSelected
                      ? "border-teal-800 bg-teal-800 text-white dark:border-teal-400 dark:bg-teal-400 dark:text-slate-950"
                      : "border-slate-300 bg-white text-slate-700 hover:border-teal-700 hover:text-teal-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="discussions-heading">
          <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3 dark:border-gray-800">
            <h2
              id="discussions-heading"
              className="text-xl font-semibold text-slate-900 dark:text-white"
            >
              Discussions
            </h2>
            <p
              className="text-sm text-slate-500 dark:text-gray-400"
              aria-live="polite"
            >
              {filteredDiscussions.length} discussions
            </p>
          </div>

          {filteredDiscussions.length === 0 ? (
            <p className="py-12 text-center text-slate-600 dark:text-gray-300">
              No discussions match these categories yet.
            </p>
          ) : (
            <div>
              {filteredDiscussions.map((discussion) => (
                <article
                  key={discussion.id}
                  className="border-b border-slate-200 py-6 last:border-b-0 dark:border-gray-800"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    {discussion.categories.map((category) => (
                      <span
                        key={category}
                        className="text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {discussion.title}
                  </h3>
                  <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-600 dark:text-gray-300">
                    {discussion.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500 dark:text-gray-400">
                    <span className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                      {discussion.initials}
                    </span>
                    <span className="font-medium text-slate-700 dark:text-gray-200">
                      {discussion.author}
                    </span>
                    <span>{discussion.age}</span>
                    <span>{discussion.replies} replies</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

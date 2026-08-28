"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const resources = [
  {
    type: "Learning track",
    title: "Frontend Development",
    description:
      "Master the art of creating beautiful and responsive user interfaces with our comprehensive frontend track.",
    link: "#",
  },
  {
    type: "Learning track",
    title: "Backend Development",
    description:
      "Learn to build robust and scalable server-side applications and APIs.",
    link: "#",
  },
  {
    type: "Learning track",
    title: "Full-Stack Development",
    description:
      "Become a versatile developer by mastering both frontend and backend technologies.",
    link: "#",
  },
  {
    type: "Learning track",
    title: "DevOps Engineering",
    description:
      "Understand the principles of DevOps to improve the flow of software delivery.",
    link: "#",
  },
  {
    type: "Article",
    title: "Building Your First API",
    description:
      "A practical introduction to designing and building reliable APIs.",
    link: "#",
  },
  {
    type: "Article",
    title: "The Essentials of Responsive Design",
    description:
      "Learn the core techniques for creating interfaces that work on every screen.",
    link: "#",
  },
];

const LearningPathSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const filteredResources = resources.filter((resource) => {
    const searchableText = `${resource.title} ${resource.description}`.toLowerCase();
    return searchableText.includes(debouncedSearch);
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-3xl font-bold">Explore Our Learning Paths</h2>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/resources/tracks" className="text-blue-500 hover:underline">
              View All Tracks
            </Link>
            <Link href="/resources/articles" className="text-blue-500 hover:underline">
              View All Articles
            </Link>
          </div>
        </div>
        <label className="mx-auto mb-10 block max-w-xl">
          <span className="sr-only">Search learning resources</span>
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search tracks and articles"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </label>
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-500">
                  {resource.type}
                </p>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a href={resource.link} className="text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No learning resources match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default LearningPathSection;

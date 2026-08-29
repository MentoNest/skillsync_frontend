"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ResourceCategoryCard from "@/components/resources/ResourceCategoryCard";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";

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
        <ResourceSearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search tracks and articles"
          className="mx-auto mb-10"
        />
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredResources.map((resource) => (
              <ResourceCategoryCard
                key={resource.title}
                icon={resource.type === "Article" ? "A" : "T"}
                title={resource.title}
                description={resource.description}
                link={resource.link}
              />
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

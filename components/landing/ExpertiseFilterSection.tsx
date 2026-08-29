"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { EXPERTISE_CATEGORIES, mentors } from "@/lib/mentors";
import { trackEvent } from "@/lib/analytics";

const ExpertiseFilterSection = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelected((current) => {
      const isCurrentlyActive = current.includes(category);
      const next = isCurrentlyActive
        ? current.filter((item) => item !== category)
        : [...current, category];

      trackEvent("mentor_filter_used", {
        category,
        action: isCurrentlyActive ? "deselect" : "select",
        activeFilters: next,
      });

      return next;
    });
  };

  const clearFilters = () => {
    trackEvent("mentor_filter_used", { action: "clear", activeFilters: [] });
    setSelected([]);
  };

  const filteredMentors = useMemo(() => {
    if (selected.length === 0) return mentors;
    return mentors.filter((mentor) =>
      mentor.expertise.some((expertise) => selected.includes(expertise)),
    );
  }, [selected]);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Filter Mentors by Expertise
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Select one or more areas to find the right mentor for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {EXPERTISE_CATEGORIES.map((category) => {
            const isActive = selected.includes(category);
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 ${
                  isActive
                    ? "bg-primary-700 text-white hover:bg-primary-800"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            );
          })}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 underline hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No mentors match the selected expertise yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.name}
                className="bg-white rounded-lg shadow-lg p-6 text-center dark:bg-gray-800"
              >
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {mentor.role}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {mentor.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {mentor.expertise.map((expertise) => (
                    <span
                      key={expertise}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertiseFilterSection;

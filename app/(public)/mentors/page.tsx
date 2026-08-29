"use client";

import { useMemo, useState } from "react";
import MentorCard from "@/components/mentor/MentorCard";
import MentorEmptyState from "@/components/mentor/MentorEmptyState";
import ExperienceLevelFilter from "@/components/mentor/ExperienceLevelFilter";
import HourlyRateFilter from "@/components/mentor/HourlyRateFilter";
import MentorSearchBar from "@/components/mentor/MentorSearchBar";
import MentorSort from "@/components/mentor/MentorSort";
import type { ExperienceLevel, Mentor, SortOption } from "@/types/mentor";

const expertiseOptions = [
  "All",
  "Frontend",
  "Backend",
  "UI/UX",
  "Product Management",
  "DevOps",
] as const;

const mentorSeed: Mentor[] = [
  {
    id: "mentor-1",
    name: "John Doe",
    title: "Senior Frontend Engineer",
    bio: "Helps students turn product ideas into polished, high-impact frontend experiences.",
    avatarUrl: "/avatars/john.svg",
    skills: [
      { id: "react", name: "React" },
      { id: "typescript", name: "TypeScript" },
      { id: "ui", name: "UI Design" },
    ],
    rating: 4.9,
    reviewCount: 148,
    hourlyRate: 65,
    experienceLevel: "senior",
    availability: "available",
    isFeatured: true,
    popularity: 98,
  },
  {
    id: "mentor-2",
    name: "Jane Smith",
    title: "UX Mentor",
    bio: "Specializes in user journeys, prototype thinking, and accessible product design.",
    avatarUrl: "/avatars/jane.svg",
    skills: [
      { id: "ux", name: "UX Research" },
      { id: "figma", name: "Figma" },
      { id: "systems", name: "Design Systems" },
    ],
    rating: 4.8,
    reviewCount: 121,
    hourlyRate: 58,
    experienceLevel: "mid",
    availability: "available",
    isFeatured: true,
    popularity: 94,
  },
  {
    id: "mentor-3",
    name: "Sarah Wilson",
    title: "Data & AI Mentor",
    bio: "Guides learners through product analytics, AI workflows, and practical data skills.",
    avatarUrl: "/avatars/sarah.svg",
    skills: [
      { id: "python", name: "Python" },
      { id: "ml", name: "Machine Learning" },
      { id: "data", name: "Data Visualization" },
    ],
    rating: 4.7,
    reviewCount: 103,
    hourlyRate: 72,
    experienceLevel: "senior",
    availability: "busy",
    isFeatured: false,
    popularity: 89,
  },
  {
    id: "mentor-4",
    name: "Michael Chen",
    title: "Backend Engineering Lead",
    bio: "Helps engineers design resilient systems, APIs, and cloud-first architecture.",
    avatarUrl: "/avatars/michael.svg",
    skills: [
      { id: "node", name: "Node.js" },
      { id: "api", name: "APIs" },
      { id: "devops", name: "DevOps" },
    ],
    rating: 4.9,
    reviewCount: 160,
    hourlyRate: 80,
    experienceLevel: "principal",
    availability: "available",
    isFeatured: true,
    popularity: 99,
  },
  {
    id: "mentor-5",
    name: "Emily Davis",
    title: "Product Strategy Mentor",
    bio: "Supports founders and PMs in making stronger product decisions and roadmaps.",
    avatarUrl: "/avatars/emily.svg",
    skills: [
      { id: "product", name: "Product Strategy" },
      { id: "roadmap", name: "Roadmapping" },
      { id: "execution", name: "Execution" },
    ],
    rating: 4.6,
    reviewCount: 96,
    hourlyRate: 54,
    experienceLevel: "mid",
    availability: "available",
    isFeatured: false,
    popularity: 85,
  },
  {
    id: "mentor-6",
    name: "David Kim",
    title: "Platform & DevOps Mentor",
    bio: "Coaches teams on CI/CD, automation, observability, and platform reliability.",
    avatarUrl: "/avatars/david.svg",
    skills: [
      { id: "aws", name: "AWS" },
      { id: "cicd", name: "CI/CD" },
      { id: "infra", name: "Infrastructure" },
    ],
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 70,
    experienceLevel: "senior",
    availability: "unavailable",
    isFeatured: false,
    popularity: 90,
  },
];

const rankExperience = (level: ExperienceLevel) => {
  const order = {
    junior: 1,
    mid: 2,
    senior: 3,
    principal: 4,
  } as const;

  return order[level];
};

export default function MentorDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<(typeof expertiseOptions)[number]>("All");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(120);
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();

    const matches = mentorSeed.filter((mentor) => {
      const matchesQuery =
        query.length === 0 ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        mentor.skills.some((skill) => skill.name.toLowerCase().includes(query));

      const matchesExpertise =
        selectedExpertise === "All" ||
        mentor.skills.some((skill) => skill.name.toLowerCase().includes(selectedExpertise.toLowerCase()));

      const matchesExperience =
        !experienceLevel || mentor.experienceLevel === experienceLevel;

      const matchesRate = mentor.hourlyRate >= minRate && mentor.hourlyRate <= maxRate;

      return matchesQuery && matchesExpertise && matchesExperience && matchesRate;
    });

    return [...matches].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.hourlyRate - b.hourlyRate;
        case "experience":
          return rankExperience(b.experienceLevel) - rankExperience(a.experienceLevel);
        case "popularity":
          return b.popularity - a.popularity;
        case "rating":
        default:
          return b.rating - a.rating;
      }
    });
  }, [search, selectedExpertise, experienceLevel, minRate, maxRate, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedExpertise("All");
    setExperienceLevel("");
    setMinRate(0);
    setMaxRate(120);
    setSortBy("rating");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Find your mentor
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mentor discovery
          </h1>
        </div>

        <div className="w-full max-w-xl">
          <MentorSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search mentors by name, skill, or expertise"
          />
        </div>
      </header>

      <div className="flex flex-col gap-8 xl:flex-row">
        <aside className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:max-w-xs">
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Reset
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {expertiseOptions.map((option) => {
                  const isSelected = selectedExpertise === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedExpertise(option)}
                      className={[
                        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                      ].join(" ")}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <ExperienceLevelFilter value={experienceLevel} onChange={setExperienceLevel} />
            <HourlyRateFilter min={minRate} max={maxRate} onChange={(nextMin, nextMax) => {
              setMinRate(nextMin);
              setMaxRate(nextMax);
            }} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredMentors.length}</span> mentors found
            </p>
            <MentorSort value={sortBy} onChange={setSortBy} />
          </div>

          {filteredMentors.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} onViewProfile={(id) => id} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <MentorEmptyState onReset={resetFilters} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

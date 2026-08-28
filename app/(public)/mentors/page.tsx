import Link from "next/link";
import MentorCard from "@/components/mentor/MentorCard";
import type { Mentor } from "@/types/mentor";

const mentors: Mentor[] = [
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
];

const filterGroups = [
  "All",
  "Frontend",
  "Backend",
  "UI/UX",
  "Product Management",
  "DevOps",
];

export default function MentorDiscoveryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Find your mentor
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mentor Discovery
          </h1>
        </div>

        <div className="w-full max-w-xl">
          <label className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              type="search"
              placeholder="Search mentors by name, skill, or expertise"
              aria-label="Search mentors"
              className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </label>
        </div>
      </header>

      <div className="flex flex-col gap-8 xl:flex-row">
        <aside className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:max-w-xs">
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              type="button"
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Reset
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {filterGroups.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={[
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      filter === "All"
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                    ].join(" ")}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Experience Level</p>
              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="radio" name="experience" defaultChecked className="accent-blue-600" />
                  Any
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="experience" className="accent-blue-600" />
                  Junior
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="experience" className="accent-blue-600" />
                  Mid
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="experience" className="accent-blue-600" />
                  Senior
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Hourly rate</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="number"
                  defaultValue={20}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Minimum hourly rate"
                />
                <span>-</span>
                <input
                  type="number"
                  defaultValue={100}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Maximum hourly rate"
                />
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{mentors.length}</span> mentors found
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select
                aria-label="Sort mentors"
                className="rounded-md border border-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="rating"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Looking for a specific mentor? <Link href="/" className="font-medium text-blue-600 hover:underline">Go back home</Link>
      </div>
    </main>
  );
}

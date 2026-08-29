import Link from "next/link";
import ResourceCategoryCard from "@/components/resources/ResourceCategoryCard";

const tracks = [
  {
    title: "Frontend Development",
    description:
      "Master the art of creating beautiful and responsive user interfaces with our comprehensive frontend track.",
  },
  {
    title: "Backend Development",
    description:
      "Learn to build robust and scalable server-side applications and APIs.",
  },
  {
    title: "Full-Stack Development",
    description:
      "Become a versatile developer by mastering both frontend and backend technologies.",
  },
  {
    title: "DevOps Engineering",
    description:
      "Understand the principles of DevOps to improve the flow of software delivery.",
  },
];

export const metadata = {
  title: "Learning Tracks | SkillSync",
  description: "Follow a focused path to build practical skills step by step.",
};

export default function TracksPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <nav aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          aria-label="Back to home"
        >
          ← Back to home
        </Link>
      </nav>

      <header className="mt-4 mb-10">
        <h1 className="text-4xl font-bold">Learning Tracks</h1>
        <p className="mt-3 text-lg text-gray-600">
          Follow a focused path to build practical skills step by step.
        </p>
      </header>

      <section aria-labelledby="tracks-list-heading">
        <h2 id="tracks-list-heading" className="sr-only">
          Available learning tracks
        </h2>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <ResourceCategoryCard
              key={track.title}
              icon={<span aria-hidden="true">T</span>}
              title={track.title}
              description={track.description}
              link="#"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

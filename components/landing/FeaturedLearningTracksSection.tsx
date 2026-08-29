import Link from "next/link";
import ResourceCategoryCard from "@/components/resources/ResourceCategoryCard";

const featuredTracks = [
  {
    title: "Frontend Development",
    description:
      "Master the art of creating beautiful and responsive user interfaces.",
  },
  {
    title: "Backend Development",
    description:
      "Learn to build robust and scalable server-side applications and APIs.",
  },
  {
    title: "Full-Stack Development",
    description:
      "Become a versatile developer by mastering frontend and backend technologies.",
  },
];

export default function FeaturedLearningTracksSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Featured learning tracks</h2>
        <Link
          href="/resources/tracks"
          className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredTracks.map((track) => (
          <ResourceCategoryCard
            key={track.title}
            icon="T"
            title={track.title}
            description={track.description}
            link="/resources/tracks"
          />
        ))}
      </div>
    </section>
  );
}
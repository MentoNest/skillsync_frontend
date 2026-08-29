import Link from "next/link";
import LearningTrackCard from "@/components/resources/LearningTrackCard";

const tracks = [
  {
    imageSrc: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
    category: "Frontend",
    title: "Frontend Development",
    description:
      "Master the art of creating beautiful and responsive user interfaces with our comprehensive frontend track.",
    lessonCount: 24,
    duration: "18 hours",
    href: "#",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "Backend",
    title: "Backend Development",
    description:
      "Learn to build robust and scalable server-side applications and APIs.",
    lessonCount: 20,
    duration: "15 hours",
    href: "#",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    category: "Full-Stack",
    title: "Full-Stack Development",
    description:
      "Become a versatile developer by mastering both frontend and backend technologies.",
    lessonCount: 36,
    duration: "28 hours",
    href: "#",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    category: "DevOps",
    title: "DevOps Engineering",
    description:
      "Understand the principles of DevOps to improve the flow of software delivery.",
    lessonCount: 18,
    duration: "14 hours",
    href: "#",
  },
];

export const metadata = {
  title: "Learning Tracks | SkillSync",
  description: "Follow a focused path to build practical skills step by step.",
};

export default function TracksPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Link href="/" className="text-blue-500 hover:underline">
        Back to home
      </Link>
      <h1 className="mb-10 mt-4 text-4xl font-bold">Learning Tracks</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tracks.map((track) => (
          <LearningTrackCard key={track.title} {...track} />
        ))}
      </div>
    </main>
  );
}

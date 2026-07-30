import Link from "next/link";
import MentorCard from "@/components/MentorCard";

const mentors = [
  {
    mentorId: "sarah-doe",
    name: "Sarah Doe",
    title: "Software Engineer @ Google",
    bio: "Expert in React, Node.js, and cloud infrastructure.",
    avatarUrl: "/avatars/sarah.jpg",
    rating: 4.8,
    reviewCount: 124,
    pricePerSession: 85,
    skills: ["React", "Node.js", "Cloud"],
  },
  {
    mentorId: "john-smith",
    name: "John Smith",
    title: "Product Manager @ Microsoft",
    bio: "Specializes in product strategy and user-centric design.",
    avatarUrl: "/avatars/john.jpg",
    rating: 4.6,
    reviewCount: 98,
    pricePerSession: 75,
    skills: ["Product Strategy", "UX", "Agile"],
  },
  {
    mentorId: "jane-roe",
    name: "Jane Roe",
    title: "UX Designer @ Apple",
    bio: "Passionate about creating beautiful and intuitive user experiences.",
    avatarUrl: "/avatars/jane.jpg",
    rating: 4.9,
    reviewCount: 156,
    pricePerSession: 90,
    skills: ["UX Design", "Figma", "Prototyping"],
  },
];

export default function MentorDiscoverySection() {
  return (
    <section
      className="bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 transition-colors"
      aria-labelledby="mentors-heading"
    >
      <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-10 lg:mb-14">
          <h2
            id="mentors-heading"
            className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            Meet Our Mentors
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Our mentors are industry experts with a passion for sharing their
            knowledge and guiding you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.mentorId} {...mentor} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/mentors"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
          >
            View All Mentors
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

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

export default function TracksPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Link href="/" className="text-blue-500 hover:underline">
        Back to home
      </Link>
      <h1 className="mb-10 mt-4 text-4xl font-bold">Learning Tracks</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tracks.map((track) => (
          <article key={track.title} className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-2xl font-semibold">{track.title}</h2>
            <p className="text-gray-600">{track.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
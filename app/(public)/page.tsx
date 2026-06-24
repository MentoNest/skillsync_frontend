import { Button } from "@/components/ui/button";
import MentorCard from "@/components/MentorCard";

export default function Home() {
  const mentors = [
    {
      name: "Sarah Doe",
      role: "Software Engineer @ Google",
      description: "Expert in React, Node.js, and cloud infrastructure.",
      avatarUrl: "/avatars/sarah.jpg",
    },
    {
      name: "John Smith",
      role: "Product Manager @ Microsoft",
      description: "Specializes in product strategy and user-centric design.",
      avatarUrl: "/avatars/john.jpg",
    },
    {
      name: "Jane Roe",
      role: "UX Designer @ Apple",
      description: "Passionate about creating beautiful and intuitive user experiences.",
      avatarUrl: "/avatars/jane.jpg",
    },
  ];

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Find Your Perfect Mentor
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              SkillSync helps you connect with experienced professionals to guide
              you on your career path.
            </p>
            <Button>Get Started</Button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            {/* You can add an image or illustration here */}
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Meet Our Mentors
            </h2>
            <p className="font-light text-gray-500 lg:mb-8 sm:text-xl dark:text-gray-400">
              Our mentors are industry experts with a passion for sharing their knowledge.
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.name} {...mentor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
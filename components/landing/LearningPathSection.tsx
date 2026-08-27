import React from "react";

const resources = [
  {
    title: "Frontend Development",
    description:
      "Master the art of creating beautiful and responsive user interfaces with our comprehensive frontend track.",
    link: "#",
  },
  {
    title: "Backend Development",
    description:
      "Learn to build robust and scalable server-side applications and APIs.",
    link: "#",
  },
  {
    title: "Full-Stack Development",
    description:
      "Become a versatile developer by mastering both frontend and backend technologies.",
    link: "#",
  },
  {
    title: "DevOps Engineering",
    description:
      "Understand the principles of DevOps to improve the flow of software delivery.",
    link: "#",
  },
];

const LearningPathSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Learning Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a href={resource.link} className="text-blue-500 hover:underline">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPathSection;

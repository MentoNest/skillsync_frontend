import React from "react";
import Image from "next/image";

const mentors = [
  {
    name: "John Doe",
    role: "Software Engineer",
    description: "Specializes in frontend development and React.",
    image: "/avatars/john.svg",
  },
  {
    name: "Jane Smith",
    role: "UX/UI Designer",
    description:
      "Passionate about creating beautiful and intuitive user experiences.",
    image: "/avatars/jane.svg",
  },
  {
    name: "Sarah Wilson",
    role: "Data Scientist",
    description: "Expert in machine learning and data visualization.",
    image: "/avatars/sarah.svg",
  },
];

const MentorDiscoverySection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Discover Your Perfect Mentor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <Image
                src={mentor.image}
                alt={mentor.name}
                width={100}
                height={100}
                sizes="100px"
                loading="lazy"
                decoding="async"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
              <p className="text-gray-600 mb-2">{mentor.role}</p>
              <p className="text-gray-500">{mentor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorDiscoverySection;

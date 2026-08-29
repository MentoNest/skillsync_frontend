"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import MentorSearchBar from "@/components/mentor/MentorSearchBar";

const mentors = [
  {
    name: "John Doe",
    role: "Software Engineer",
    description: "Specializes in frontend development and React.",
    image: "/avatars/john.svg",
    expertise: ["Frontend", "React"],
  },
  {
    name: "Jane Smith",
    role: "UX/UI Designer",
    description:
      "Passionate about creating beautiful and intuitive user experiences.",
    image: "/avatars/jane.svg",
    expertise: ["UI/UX", "Design"],
  },
  {
    name: "Sarah Wilson",
    role: "Data Scientist",
    description: "Expert in machine learning and data visualization.",
    image: "/avatars/sarah.svg",
    expertise: ["Backend", "Data Science"],
  },
];

const MentorDiscoverySection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentors = useMemo(() => {
    if (!searchQuery.trim()) return mentors;

    const query = searchQuery.toLowerCase();
    return mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.role.toLowerCase().includes(query) ||
        mentor.description.toLowerCase().includes(query) ||
        mentor.expertise.some((exp) => exp.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Discover Your Perfect Mentor
        </h2>
        <div className="mb-8 max-w-2xl mx-auto">
          <MentorSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search mentors by name, skill, or expertise"
          />
        </div>
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  sizes="100px"
                  decoding="async"
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                <p className="text-gray-600 mb-2">{mentor.role}</p>
                <p className="text-gray-500 text-sm mb-4">{mentor.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {mentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No mentors found matching &quot;{searchQuery}&quot;. Try a different search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MentorDiscoverySection;

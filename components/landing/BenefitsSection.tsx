import React from "react";

const benefits = [
  {
    title: "Personalized Learning Paths",
    description:
      "Tailored learning journeys designed to meet your specific career goals and skill level.",
    icon: "path",
  },
  {
    title: "Expert Mentorship",
    description:
      "Connect with industry experts and receive one-on-one guidance.",
    icon: "mentor",
  },
  {
    title: "Hands-On Projects",
    description:
      "Apply your skills to real-world projects and build a portfolio that stands out.",
    icon: "project",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and mentors to collaborate and grow together.",
    icon: "community",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose SkillSync
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 bg-blue-500 text-white rounded-full mb-4">
                {/* Placeholder for an icon */}
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

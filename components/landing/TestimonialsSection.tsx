import React from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "SkillSync has been a game-changer for my career. The mentorship I received was invaluable.",
    name: "John Doe",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "The hands-on projects helped me build a strong portfolio and land my dream job.",
    name: "Jane Smith",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "I love the community aspect. It is great to connect with other learners and share experiences.",
    name: "Samuel Green",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  sizes="48px"
                  loading="lazy"
                  decoding="async"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

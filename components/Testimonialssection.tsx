"use client";

import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      quote:
        "SkillSync connected me with an amazing mentor who helped me transition from marketing to product management. The personalized guidance was exactly what I needed.",
      name: "Jessica Thompson",
      role: "Product Manager at Tech Corp",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      quote:
        "As a mentor on SkillSync, I've had the opportunity to guide talented professionals. The platform makes it easy to share knowledge and make a real impact.",
      name: "Michael Chen",
      role: "Senior Software Engineer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
      quote:
        "The AI matching system paired me with a mentor whose experience perfectly aligned with my career goals. Three months later, I landed my dream job!",
      name: "Aisha Okafor",
      role: "UX Designer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
      quote:
        "I was stuck in my career for years. My SkillSync mentor helped me identify my strengths and navigate a successful pivot into data science. Truly life-changing.",
      name: "David Rodriguez",
      role: "Data Scientist",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
      quote:
        "The flexible scheduling and quality of mentorship on SkillSync is unmatched. I've grown more in 6 months than I did in 2 years on my own.",
      name: "Priya Sharma",
      role: "Marketing Lead",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
      quote:
        "Being able to connect with industry leaders who genuinely care about my growth has been incredible. SkillSync made mentorship accessible and affordable.",
      name: "James Wilson",
      role: "Frontend Developer",
    },
  ];

  return (
    <section
      id="testimonials"
      className="bg-linear-to-b from-white to-purple-50 py-16 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories from Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who have transformed their careers through
            SkillSync mentorship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-purple-500 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Join thousands of professionals growing their careers
          </p>
          <button className="px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}

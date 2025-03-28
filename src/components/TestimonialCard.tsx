import React from "react";
import { Testimonial } from "../data/testimonialsData";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-16 h-16 rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
      <p className="text-sm text-gray-500">{testimonial.role}</p>
      <p className="text-gray-700 mt-2">"{testimonial.feedback}"</p>
      <div className="flex mt-3">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span key={index} className="text-yellow-500">★</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;

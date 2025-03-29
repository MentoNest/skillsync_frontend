import React from "react";
import { testimonialsData } from "../data/testimonialsData";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";


const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-blue-900 text-lg font-extrabold">Testimonial</h1>
        <h3 className="text-4xl font-extrabold text-green-800 max-w-lg">
          What some parents think about mentors from Blueprint Us
        </h3>

      </div>

      {/* Desktop View (Grid Layout) */}
      <div className="hidden md:grid grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
        {testimonialsData.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile View (Swiper Carousel) */}
      <div className="md:hidden mt-8">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          modules={[Navigation]}
          className="relative"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-start mt-4 space-x-4">
        <button className="prev-btn w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow">
          ◀
        </button>
        <button className="next-btn w-10 h-10 flex items-center justify-center bg-green-800 text-white rounded-full shadow">
          ▶
        </button>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

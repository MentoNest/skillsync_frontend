import React from "react";
import { testimonialsData } from "../data/testimonialsData";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper";

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Users Say</h2>

      {/* Desktop View (Grid Layout) */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {testimonialsData.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile View (Swiper Carousel) */}
      <div className="md:hidden">
        <Swiper spaceBetween={16} slidesPerView={1}>
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;

import React from "react";
import Image from "next/image";

const FeaturedMentorHighlight = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Featured Mentor of the Week
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Meet Alex, a seasoned product manager with over 10 years of
              experience in the tech industry. He is passionate about helping
              aspiring product managers grow their careers.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn More About Alex
            </a>
          </div>
          <div className="flex justify-center">
            <Image
              src="/avatars/alex.svg"
              alt="Featured Mentor"
              width={300}
              height={300}
              loading="lazy"
              sizes="(max-width: 768px) 240px, 300px"
              sizes="(min-width: 768px) 300px, 60vw"
              loading="lazy"
              decoding="async"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentorHighlight;

"use client";

// import lottie from "lottie-web";
import Image from "next/image";
import { useEffect, useRef } from "react";
import BubbleButton from "../ui/BubbleButton";

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    alt: "Udemy",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    alt: "LinkedIn",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
  },
];

export default function Hero() {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Lottie Web library dynamically
    const loadLottie = async () => {
      try {
        const lottie = await import("lottie-web");
        if (lottieRef.current) {
          lottie.default.loadAnimation({
            container: lottieRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "/assests/animation/skillsyncanime.json",
          });
        }
      } catch (error) {
        console.error("Failed to load Lottie animation:", error);
      }
    };

    loadLottie();
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center pt-16 pb-10 px-4 bg-white">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get Connected to the Best{" "}
          <span className="text-purple-600">Mentor</span> for your Journey
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Get your skills nurtured by mentorship, and watch your creativity
          blossom into opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <BubbleButton primary>Find a Mentor</BubbleButton>
          <BubbleButton>Become a Mentor</BubbleButton>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="w-full flex justify-center mt-4 mb-8">
        <div ref={lottieRef} className="w-[600px] h-[450px]" />
      </div>

      {/* Logo Bar */}
      <div className="w-full border-t border-gray-200 py-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-8">
        {logos.map((logo, idx) => (
          <Image
            key={idx}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={40}
            className="h-8 md:h-10 max-w-[120px] object-contain"
            unoptimized
          />
        ))}
      </div>
    </section>
  );
}

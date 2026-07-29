"use client";

import React, { useState, useEffect } from "react";
import LearningTrackCard from "@/components/LearningTrackCard";
import LearningTrackCardSkeleton from "@/components/skeletons/LearningTrackCardSkeleton";

const learningTracks = [
  {
    title: "Engineering Leadership",
    category: "Engineering",
    description:
      "Develop the skills to lead technical teams, make stronger architectural decisions, and grow your impact as a senior engineer.",
    lessons: 18,
    duration: "6h 20m",
    imageSrc: "/tony-adebanjo.jpg",
    href: "/resources/engineering-leadership",
  },
  {
    title: "Product Management",
    category: "Product",
    description:
      "Master product strategy, user research, and cross-functional execution to build products that people genuinely love.",
    lessons: 14,
    duration: "5h 10m",
    imageSrc: "/Image (Sarah Johnson).svg",
    href: "/resources/product-management",
  },
  {
    title: "Data Science & Analytics",
    category: "Data",
    description:
      "Apply data-driven thinking, analytics, and machine learning to solve real-world problems and drive business decisions.",
    lessons: 20,
    duration: "7h 45m",
    imageSrc: "/Image (Marcus Williams).svg",
    href: "/resources/data-science",
  },
  {
    title: "Design & UX",
    category: "Design",
    description:
      "Learn user-centred design, prototyping, and research methods to craft experiences that delight and retain users.",
    lessons: 12,
    duration: "4h 30m",
    imageSrc: "/Image (Cole Hathans).svg",
    href: "/resources/design-ux",
  },
  {
    title: "Business Strategy",
    category: "Business",
    description:
      "Build strategic thinking, financial fluency, and leadership skills to drive sustainable growth in any organisation.",
    lessons: 16,
    duration: "6h 00m",
    imageSrc: "/tony-adebanjo.jpg",
    href: "/resources/business-strategy",
  },
  {
    title: "Career Growth",
    category: "Career",
    description:
      "Get tactical guidance on promotions, role transitions, salary negotiation, and long-term professional development.",
    lessons: 10,
    duration: "3h 50m",
    imageSrc: "/Image (Sarah Johnson).svg",
    href: "/resources/career-growth",
  },
  {
    title: "Frontend Development Mastery",
    category: "Engineering",
    description:
      "Master HTML, CSS, JavaScript, and modern frontend frameworks like React and Next.js to build fast, responsive user interfaces.",
    lessons: 24,
    duration: "9h 15m",
    imageSrc: "/Image (Cole Hathans).svg",
    href: "/resources/frontend-development",
  },
  {
    title: "Backend Systems Design",
    category: "Engineering",
    description:
      "Deep dive into relational and non-relational databases, API design, caching, system security, and scalability patterns.",
    lessons: 22,
    duration: "8h 30m",
    imageSrc: "/Image (Marcus Williams).svg",
    href: "/resources/backend-design",
  },
];

export default function LearningTracks() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <LearningTrackCardSkeleton key={index} />
          ))
        : learningTracks.map((track) => (
            <LearningTrackCard key={track.title} {...track} />
          ))}
    </div>
  );
}

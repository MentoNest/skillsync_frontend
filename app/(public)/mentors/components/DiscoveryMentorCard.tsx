import React from "react";
import Image from "next/image";

interface Mentor {
  id: number;
  name: string;
  title: string;
  industry: string;
  skills: string[];
  image: string;
}

interface DiscoveryMentorCardProps {
  mentor: Mentor;
}

export default function DiscoveryMentorCard({
  mentor,
}: DiscoveryMentorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={mentor.image}
          alt={mentor.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {mentor.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {mentor.title}
        </p>
      </div>
    </div>
  );
}

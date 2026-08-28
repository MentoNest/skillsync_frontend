// Mentor profile image with fallback initials avatar (#844)
import React from "react";
import Image from "next/image";

interface MentorProfileImageProps {
  src?: string;
  name: string;
  size?: number;
}

const MentorProfileImage = ({ src, name, size = 64 }: MentorProfileImageProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm flex-shrink-0"
        aria-label={`${name} avatar`}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} profile photo`}
      width={size}
      height={size}
      className="rounded-full object-cover flex-shrink-0"
    />
  );
};

export default MentorProfileImage;

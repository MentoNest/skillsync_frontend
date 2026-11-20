"use client";

import { useState } from "react";

export type AuthorAvatarSize = "sm" | "md" | "lg";

export interface AuthorAvatarProps {
  name: string;
  imageUrl?: string;
  size?: AuthorAvatarSize;
  className?: string;
}

const SIZES: Record<AuthorAvatarSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

export default function AuthorAvatar({
  name,
  imageUrl,
  size = "md",
  className,
}: AuthorAvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple-100 font-semibold text-purple-700 ${SIZES[size]} ${className ?? ""}`}
      title={name}
    >
      {imageUrl && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name}'s avatar`}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials || "?"}</span>
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}

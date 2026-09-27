"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mentorProfileHref } from "@/lib/mentor-types";
import MentorRating from "@/components/mentor-discovery/MentorRating";
export { default as MentorCardSkeleton } from "./MentorCardSkeleton";
export { MentorRating };

export interface MentorCardProps {
  id?: string;
  name: string;
  title?: string;
  headline?: string;
  bio?: string;
  description?: string;
  avatar?: string;
  avatarUrl?: string;
  avatarInitials?: string;
  avatarColor?: string;
  rating?: number;
  sessions?: number;
  ratingCount?: number;
  hourlyRate?: number;
  price?: number | string;
  skills?: string[];
  availability?: "available" | "busy" | "unavailable";
  profileHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function MentorCard({
  id,
  name,
  title,
  headline,
  bio,
  description,
  avatar,
  avatarUrl,
  avatarInitials,
  avatarColor = "bg-gradient-to-br from-indigo-500 to-cyan-500",
  rating,
  sessions,
  ratingCount,
  hourlyRate,
  price,
  skills = [],
  availability,
  profileHref,
  ctaText = "View profile",
  ctaHref,
  onCtaClick,
  children,
  className,
}: MentorCardProps) {
  const [imageError, setImageError] = useState(false);

  const displayTitle = title || headline;
  const displayBio = bio || description;
  const imageUrl = avatarUrl || avatar;
  const hasValidImage = Boolean(imageUrl && !imageError);

  const initials =
    avatarInitials ||
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const formattedPrice =
    hourlyRate !== undefined
      ? typeof hourlyRate === "number"
        ? `$${hourlyRate}/hr`
        : hourlyRate
      : price !== undefined
      ? typeof price === "number"
        ? `$${price}/hr`
        : price
      : null;

  // #59: an explicit ctaHref wins, then profileHref, then the mentor's own
  // id. The id is what the `/mentors/[mentorId]` route resolves against, so
  // it is preferred over a name-derived slug.
  const targetHref =
    ctaHref ||
    profileHref ||
    (id
      ? mentorProfileHref(id)
      : `/mentors/${name.toLowerCase().replace(/\s+/g, "-")}`);

  return (
    <article
      className={cn(
        "group flex flex-col h-full bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden",
        className
      )}
      aria-label={`Mentor profile for ${name}`}
    >
      {/* Card Header & Profile Info */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            {/* Profile Image or Monogram */}
            {hasValidImage ? (
              <img
                src={imageUrl}
                alt={`${name}'s profile`}
                onError={() => setImageError(true)}
                className="shrink-0 w-14 h-14 rounded-2xl object-cover shadow-sm bg-slate-100"
              />
            ) : (
              <div
                className={cn(
                  "shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm",
                  avatarColor
                )}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}

            {/* Name, Professional Title & Rating */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate text-base">
                {name}
              </h3>
              {displayTitle && (
                <p className="text-sm text-indigo-600 font-medium truncate mt-0.5">
                  {displayTitle}
                </p>
              )}

              {rating !== undefined && (
                <div className="mt-1">
                  <MentorRating
                    rating={rating}
                    ratingCount={sessions ?? ratingCount}
                    countLabel="sessions"
                    formatCount={(count) => `· ${count} sessions`}
                    size="sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Price Badge */}
          {formattedPrice && (
            <div className="shrink-0 text-right">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm tracking-tight">
                {formattedPrice}
              </span>
            </div>
          )}
        </div>

        {/* Availability indicator if present */}
        {availability && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                availability === "available"
                  ? "bg-emerald-500"
                  : availability === "busy"
                  ? "bg-amber-500"
                  : "bg-slate-400"
              )}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-slate-600 capitalize">
              {availability}
            </span>
          </div>
        )}

        {/* Short Bio */}
        {displayBio && (
          <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {displayBio}
          </p>
        )}
      </div>

      {/* Skills Badges */}
      {skills && skills.length > 0 && (
        <div
          className="px-6 pb-4 flex flex-wrap gap-2"
          aria-label={`${name}'s skills`}
        >
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Call to Action */}
      {children ? (
        children
      ) : (
        <div className="mt-auto px-6 pb-6">
          <Link
            href={targetHref}
            onClick={onCtaClick}
            data-mentor-id={id}
            className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`View ${name}'s profile`}
          >
            {ctaText}
          </Link>
        </div>
      )}
    </article>
  );
}

"use client";

import React, { useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mentor } from "@/types/mentor";
import { mentorProfileHref } from "@/lib/mentor-types";
import MentorRating from "@/components/mentor-discovery/MentorRating";
import MentorSkillTags from "@/components/mentor-discovery/MentorSkillTags";
import FeaturedMentorBadge from "@/components/mentor/FeaturedMentorBadge";
export { default as MentorCardSkeleton } from "./MentorCardSkeleton";
export { MentorRating };

/**
 * Props for the shared mentor card.
 *
 * Every mentor field the card renders is taken straight from the shared
 * `Mentor` type, so the card and the mentor model can never disagree about
 * what a rating, an availability state or a list of skills looks like.
 */
export interface MentorCardProps
  extends Partial<
    Pick<
      Mentor,
      | "id"
      | "headline"
      | "bio"
      | "avatar"
      | "rating"
      | "sessions"
      | "hourlyRate"
      | "skills"
      | "availability"
      | "profileHref"
      | "featured"
    >
  > {
  /** The mentor's display name. */
  name: string;
  /** Alias for `headline`, used by landing-page copy. */
  title?: string;
  /** Alias for `bio`, used by landing-page copy. */
  description?: string;
  /** Alias for `avatar`. */
  avatarUrl?: string;
  /** Pre-computed initials, used when there is no avatar image. */
  avatarInitials?: string;
  /** Tailwind classes for the initials fallback. */
  avatarColor?: string;
  /** Number of ratings behind the score. */
  ratingCount?: number;
  /** Pre-formatted price, used when no hourly rate is known. */
  price?: number | string;
  /** Label for the call-to-action link. */
  ctaText?: string;
  /** Explicit link for the call-to-action. */
  ctaHref?: string;
  /** Called when the call-to-action is clicked. */
  onCtaClick?: () => void;
  /** Replaces the default call-to-action when provided. */
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
  featured,
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
            {imageUrl && !imageError ? (
              <Image
                src={imageUrl}
                alt={`${name}'s profile`}
                onError={() => setImageError(true)}
                className="shrink-0 w-14 h-14 rounded-2xl object-cover shadow-sm bg-slate-100"
                width={56}
                height={56}
                sizes="56px"
                unoptimized
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className={cn(
                  "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm",
                  avatarColor
                )}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}

            {/* Name, Professional Title & Rating */}
            <div className="flex-1 min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="font-semibold text-slate-900 truncate text-base">
                  {name}
                </h3>
                {featured && <FeaturedMentorBadge />}
              </div>
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
        <div className="px-6 pb-4">
          <MentorSkillTags skills={skills} mentorName={name} />
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

"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MentorCardProps } from "@/components/landing/MentorCard";
import { mentorProfileHref } from "@/lib/mentor-types";
import MentorRating from "./MentorRating";
import MentorSkillTags from "./MentorSkillTags";
export { default as MentorCardSkeleton } from "@/components/landing/MentorCardSkeleton";
export { MentorRating };

interface OptimizedMentorCardProps extends MentorCardProps {
  onBookmark?: (mentorId: string) => void;
  onCompare?: (mentor: MentorCardProps) => void;
  isBookmarked?: boolean;
  isSelectedForComparison?: boolean;
}

const OptimizedMentorCard = memo(function OptimizedMentorCard({
  id,
  name,
  title,
  description,
  skills,
  avatar,
  avatarUrl,
  avatarInitials,
  avatarColor,
  rating,
  sessions,
  profileHref,
  children,
}: OptimizedMentorCardProps) {
  // #59: default the CTA to this mentor's own profile route rather than
  // /register, so the link always carries the correct mentor id.
  const resolvedHref =
    profileHref ||
    (id
      ? mentorProfileHref(id)
      : `/mentors/${name.toLowerCase().replace(/\s+/g, "-")}`);

  // Profile image with a monogram fallback (#1208).
  //
  // `Image` was imported here but never rendered, so every card showed the
  // initials block regardless of whether a mentor had a photo — `avatar` and
  // `avatarUrl` were accepted and silently ignored. Mirrors the resolution and
  // fallback logic in `components/landing/MentorCard` so both cards agree:
  // prefer `avatarUrl`, fall back to `avatar`, and treat a load failure the same
  // as having no image at all rather than leaving a broken image icon.
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = avatarUrl || avatar;
  const hasValidImage = Boolean(imageUrl) && !imageFailed;
  const initials =
    avatarInitials ||
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {hasValidImage ? (
            <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
              <Image
                src={imageUrl as string}
                alt={`${name}'s profile`}
                fill
                sizes="(min-width: 640px) 56px, 48px"
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${
                avatarColor ?? "bg-gradient-to-br from-indigo-500 to-cyan-500"
              }`}
              aria-hidden="true"
            >
              {initials}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{name}</h3>
            <p className="text-sm text-indigo-600 font-medium truncate">{title}</p>

            <div className="mt-1">
              <MentorRating
                rating={rating ?? 0}
                ratingCount={sessions}
                countLabel="sessions"
                formatCount={(count) => `· ${count} sessions`}
                size="sm"
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="px-6 pb-4">
        <MentorSkillTags skills={skills} mentorName={name} />
      </div>

      <div className="mt-auto px-6 pb-6">
        {children ? (
          <>
            {children}
            <Link
              href={resolvedHref}
              data-mentor-id={id}
              className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-3"
              aria-label={`View ${name}'s profile`}
            >
              View profile
            </Link>
          </>
        ) : (
          <Link
            href={resolvedHref}
            data-mentor-id={id}
            className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`View ${name}'s profile`}
          >
            View profile
          </Link>
        )}
      </div>
    </article>
  );
});

OptimizedMentorCard.displayName = "OptimizedMentorCard";

export default OptimizedMentorCard;
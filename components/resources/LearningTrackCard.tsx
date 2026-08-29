import Image from "next/image";
import Link from "next/link";

export interface LearningTrackCardProps {
  /** URL for the card cover image */
  imageSrc: string;
  /** Alt text for the cover image */
  imageAlt?: string;
  /** Category tag shown above the title (e.g. "Frontend", "DevOps") */
  category: string;
  /** Track title */
  title: string;
  /** Short description of the track */
  description: string;
  /** Total number of lessons */
  lessonCount: number;
  /** Estimated duration string, e.g. "12 hours" */
  duration: string;
  /** Where the "Start Learning" button links to */
  href?: string;
}

function BookOpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function LearningTrackCard({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  lessonCount,
  duration,
  href = "#",
}: LearningTrackCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Cover image — 16:9 ratio */}
      <div className="relative aspect-video w-full">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Category tag */}
        <span className="mb-2 inline-block w-fit rounded-full bg-primary-100 px-3 py-0.5 text-xs font-medium text-primary-700">
          {category}
        </span>

        {/* Title */}
        <h3 className="mb-1 text-lg font-semibold text-gray-900 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Meta row */}
        <div className="mt-auto flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <BookOpenIcon />
            {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon />
            {duration}
          </span>
        </div>

        {/* CTA button */}
        <Link
          href={href}
          className="block w-full rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Start Learning
        </Link>
      </div>
    </article>
  );
}

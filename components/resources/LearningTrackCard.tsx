import Image from "next/image";
import Link from "next/link";

export interface LearningTrackCardProps {
  title: string;
  category: string;
  description: string;
  lessonCount: number;
  /** Human-readable, e.g. "6h 20m". */
  duration: string;
  image: {
    src: string;
    alt: string;
  };
  /** Destination of the "Start Learning" CTA. */
  href: string;
}

/** A learning track: image, category, title, description, stats and a CTA. */
export default function LearningTrackCard({
  title,
  category,
  description,
  lessonCount,
  duration,
  image,
  href,
}: LearningTrackCardProps) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50">
      <div className="relative aspect-video w-full bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          unoptimized={image.src.endsWith(".svg")}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="self-start inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          {category}
        </span>

        <h3 className="mt-3 font-semibold text-slate-900 leading-snug">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed line-clamp-3">{description}</p>

        <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Lessons</dt>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <dd className="tabular-nums">
              {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Duration</dt>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <dd className="tabular-nums">{duration}</dd>
          </div>
        </dl>

        <Link
          href={href}
          aria-label={`Start learning: ${title}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Start Learning
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

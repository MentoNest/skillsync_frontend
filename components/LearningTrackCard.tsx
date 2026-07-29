import Image from 'next/image';
import Link from 'next/link';

interface LearningTrackCardProps {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  lessons: number;
  duration: string;
  href: string;
  priority?: boolean;
}

export default function LearningTrackCard({
  title,
  category,
  description,
  imageSrc,
  lessons,
  duration,
  href,
  priority = false,
}: LearningTrackCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 overflow-hidden group">
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-gray-700">
        <Image
          src={imageSrc}
          alt={`Cover image for the ${title} learning track`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          decoding="async"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm dark:bg-gray-800/90 dark:text-slate-200">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
          {title}
        </h3>
        <p className="text-sm leading-6 text-slate-600 line-clamp-3 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {lessons} lessons
          </span>
        </div>

        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition w-full mt-2"
        >
          Start Learning
        </Link>
      </div>
    </article>
  );
}

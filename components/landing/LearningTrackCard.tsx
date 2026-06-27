import Link from 'next/link';

interface LearningTrackCardProps {
  title: string;
  category: string;
  description: string;
  lessons: number;
  duration: string;
  imageSrc: string;
  href: string;
}

export default function LearningTrackCard({
  title,
  category,
  description,
  lessons,
  duration,
  imageSrc,
  href,
}: LearningTrackCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg group-hover:border-cyan-300 overflow-hidden">
        {/* Image header */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url("${imageSrc}")` }}
            role="img"
            aria-label={`Illustration for ${title}`}
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-600 line-clamp-3">
            {description}
          </p>

          {/* Meta info */}
          <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {duration}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {lessons} lessons
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

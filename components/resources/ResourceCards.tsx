import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Rounded pill badge with dynamic text and configurable colors (#1377). */
export function CategoryBadge({ label, className = "bg-purple-100 text-purple-700" }: { label: string; className?: string }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}>{label}</span>;
}

export type ResourceCategory = { icon: ReactNode; title: string; description: string; href: string };

/** Reusable resource category card (#1374). */
export function ResourceCategoryCard({ icon, title, description, href }: ResourceCategory) {
  return (
    <Link href={href} className="flex h-full flex-col rounded-xl border p-6 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
      <span className="mb-3 flex h-8 w-8 text-purple-700" aria-hidden="true">{icon}</span>
      <h3 className="text-base font-semibold leading-6">{title}</h3>
      <p className="mt-1 text-sm leading-5 text-gray-600">{description}</p>
    </Link>
  );
}

export type LearningTrack = {
  image: string; imageAlt?: string; category: string; title: string; description: string;
  lessons: number; duration: string; href: string;
};

/** Reusable learning track card (#1376). */
export function LearningTrackCard({ priority = false, ...t }: LearningTrack & { priority?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border">
      <div className="aspect-video w-full bg-gradient-to-br from-purple-100 to-indigo-100">
        <Image
          src={t.image}
          alt={t.imageAlt ?? `Illustration for ${t.title}`}
          width={394}
          height={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-full w-full object-contain p-8"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <CategoryBadge label={t.category} />
        <h3 className="text-lg font-semibold leading-7">{t.title}</h3>
        <p className="flex-1 text-sm leading-5 text-gray-600">{t.description}</p>
        <p className="text-xs leading-4 text-gray-500">{t.lessons} lessons · {t.duration}</p>
        <Link
          href={t.href}
          aria-label={`Start learning: ${t.title}`}
          className="mt-auto rounded-lg bg-purple-700 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
        >
          Start Learning
        </Link>
      </div>
    </article>
  );
}

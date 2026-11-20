import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ResourceItem } from "./resourceData";

/** Rounded pill badge with dynamic text and configurable colors (#1377). */
export function CategoryBadge({ label, className = "bg-purple-100 text-purple-700" }: { label: string; className?: string }) {
  return <span className={`inline-block max-w-full break-words rounded-full px-3 py-1 text-xs font-medium ${className}`}>{label}</span>;
}

export type ResourceCategory = { icon: ReactNode; title: string; description: string; href: string };

/** Reusable resource category card (#1374). */
export function ResourceCategoryCard({ icon, title, description, href }: ResourceCategory) {
  return (
    <Link href={href} className="block h-full min-w-0 rounded-xl border p-6 transition hover:shadow-md">
      <div className="mb-3 text-purple-700" aria-hidden>{icon}</div>
      <h3 className="break-words font-semibold">{title}</h3>
      <p className="mt-1 break-words text-sm text-gray-600">{description}</p>
    </Link>
  );
}

export function ResourceItemCard({ item, icon }: { item: ResourceItem; icon?: ReactNode }) {
  return (
    <article className="flex h-full min-w-0 flex-col gap-3 rounded-xl border p-6 transition hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <CategoryBadge label={item.category} />
        {icon ? <span className="shrink-0 text-purple-700" aria-hidden>{icon}</span> : null}
      </div>
      <h2 className="break-words text-lg font-semibold">{item.title}</h2>
      <p className="flex-1 break-words text-sm text-gray-600">{item.description}</p>
      {item.readTime ? <p className="text-xs text-gray-500">{item.readTime}</p> : null}
    </article>
  );
}

export type LearningTrack = {
  image: string; category: string; title: string; description: string;
  lessons: number; duration: string; href: string;
};

/** Reusable learning track card (#1376). */
export function LearningTrackCard(t: LearningTrack) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border">
      <Image src={t.image} alt="" width={400} height={225} className="aspect-video w-full object-cover" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <CategoryBadge label={t.category} />
        <h3 className="break-words text-lg font-semibold">{t.title}</h3>
        <p className="flex-1 break-words text-sm text-gray-600">{t.description}</p>
        <p className="text-xs text-gray-500">{t.lessons} lessons · {t.duration}</p>
        <Link href={t.href} className="mt-2 rounded-lg bg-purple-700 py-2 text-center text-sm font-medium text-white">
          Start Learning
        </Link>
      </div>
    </article>
  );
}

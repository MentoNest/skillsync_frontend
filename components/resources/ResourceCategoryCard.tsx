import Link from "next/link";
import type { ReactNode } from "react";
import ResourceCategoryCardSkeleton from "@/components/skeleton/ResourceCategoryCardSkeleton";

export interface ResourceCategoryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  loading?: boolean;
}

export default function ResourceCategoryCard({
  icon,
  title,
  description,
  link,
  loading = false,
}: ResourceCategoryCardProps) {
  if (loading) return <ResourceCategoryCardSkeleton />;

  return (
    <article
      className="w-full min-w-0 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
      aria-label={title}
    >
      {/* decorative icon — hidden from AT */}
      <div
        aria-hidden="true"
        className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600"
      >
        {icon}
      </div>
      {/* h3: sits under the page h1 and section h2 */}
      <h3 className="mb-2 break-words text-xl font-semibold">{title}</h3>
      <p className="mb-4 break-words text-gray-600">{description}</p>
      <Link
        href={link}
        className="text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
      </Link>
    </article>
  );
}
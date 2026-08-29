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
    <article className="w-full min-w-0 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
        {icon}
      </div>
      <h2 className="mb-2 break-words text-xl font-semibold">{title}</h2>
      <p className="mb-4 break-words text-gray-600">{description}</p>
      <Link href={link} className="text-blue-500 hover:underline">
        Learn More
      </Link>
    </article>
  );
}
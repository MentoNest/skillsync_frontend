import Link from "next/link";
import type { ReactNode } from "react";

export interface ResourceCategoryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

export default function ResourceCategoryCard({
  icon,
  title,
  description,
  link,
}: ResourceCategoryCardProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
        {icon}
      </div>
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link href={link} className="text-blue-500 hover:underline">
        Learn More
      </Link>
    </article>
  );
}
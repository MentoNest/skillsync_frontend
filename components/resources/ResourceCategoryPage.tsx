import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "../landing/Footer";
import { ResourceItemCard } from "./ResourceCards";
import type { ResourceItem } from "./resourceData";

export default function ResourceCategoryPage({
  title,
  description,
  items,
  icon,
}: {
  title: string;
  description: string;
  items: ResourceItem[];
  icon?: ReactNode;
}) {
  return (
    <>
      <main className="min-w-0 overflow-x-hidden pt-16">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 break-words text-sm text-gray-600">
            <Link href="/resources" className="font-medium text-purple-700 hover:underline">All resources</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{title}</span>
          </nav>
          <div className="mb-8 max-w-3xl">
            <h1 className="break-words text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-3 break-words text-base text-gray-600 sm:text-lg">{description}</p>
          </div>
          <section aria-label={`${title} resources`} className="w-full min-w-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => <ResourceItemCard key={item.id} item={item} icon={icon} />)}
            </div>
          </section>
          <Link href="/resources" className="mt-10 inline-block text-sm font-medium text-purple-700 hover:underline">
            View all resources
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

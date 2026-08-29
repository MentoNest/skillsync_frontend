import Link from "next/link";
import React from "react";
import QuickAccessCardSkeleton from "@/components/skeleton/QuickAccessCardSkeleton";

export interface QuickAccessCardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  loading?: boolean;
}

export default function QuickAccessCard({
  title,
  description,
  href = "#",
  icon: Icon,
  loading = false,
}: QuickAccessCardProps) {
  if (loading) return <QuickAccessCardSkeleton />;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm
                 transition-all duration-200 hover:-translate-y-1 hover:border-primary-200
                 hover:shadow-md focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      {Icon && (
        <span
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50
                     text-primary-600 transition-colors duration-200 group-hover:bg-primary-100"
        >
          <Icon width={22} height={22} aria-hidden />
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        )}
      </div>
    </Link>
  );
}

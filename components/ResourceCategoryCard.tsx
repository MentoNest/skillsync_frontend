import Link from 'next/link';
import { ReactNode } from 'react';

interface ResourceCategoryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

export default function ResourceCategoryCard({ icon, title, description, link }: ResourceCategoryCardProps) {
  return (
    <Link href={link} className="group block">
      <article className="flex h-full flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition duration-300 group-hover:bg-cyan-100">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
          <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </article>
    </Link>
  );
}

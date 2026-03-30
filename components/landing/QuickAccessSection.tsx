'use client';

import Link from 'next/link';
import { BookOpen, Download, FileText, Video } from 'lucide-react';

const quickAccessItems = [
  {
    icon: FileText,
    title: 'Resume Templates',
    description: 'ATS-friendly templates tailored for internships, new grad roles, and career pivots.',
    meta: '25 available',
    href: '/resources?query=Resume%20Templates',
    iconClassName: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Short, practical walkthroughs covering interviews, portfolios, outreach, and career strategy.',
    meta: '150 available',
    href: '/resources?query=Video%20Tutorials',
    iconClassName: 'bg-fuchsia-50 text-fuchsia-600',
  },
  {
    icon: BookOpen,
    title: 'Career Guides',
    description: 'Structured playbooks for role transitions, growth plans, and job-search preparation.',
    meta: '40 available',
    href: '/resources?query=Career%20Guides',
    iconClassName: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Download,
    title: 'Downloadable Tools',
    description: 'Worksheets, checklists, and planning kits you can use immediately in your career workflow.',
    meta: '30 available',
    href: '/resources?query=Downloadable%20Tools',
    iconClassName: 'bg-amber-50 text-amber-600',
  },
];

export default function QuickAccessSection() {
  return (
    <section className="bg-white px-6 pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Quick Access
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Jump straight into the resource categories learners use most often to prepare, apply, and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessItems.map(({ icon: Icon, title, description, meta, href, iconClassName }) => (
            <Link
              key={title}
              href={href}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_24px_50px_rgba(88,28,135,0.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-100"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClassName}`}>
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>

              <div className="mt-6 flex flex-1 flex-col">
                <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-purple-700">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                <p className="mt-5 text-sm font-medium text-slate-500">
                  {meta}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

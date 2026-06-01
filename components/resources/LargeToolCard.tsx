'use client';

import Link from 'next/link';
import React from 'react';

export interface LargeToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
  href?: string;
}

export default function LargeToolCard({
  icon,
  title,
  description,
  buttonText,
  gradient,
  href = '#',
}: LargeToolCardProps) {
  return (
    <Link href={href} className="group block">
      <article
        className={
          `relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${gradient}`
        }
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-white/30">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-base leading-relaxed text-white/90">{description}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition duration-200 group-hover:bg-white/90">
          {buttonText}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </article>
    </Link>
  );
}

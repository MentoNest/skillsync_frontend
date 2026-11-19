import { ReactNode } from "react";

export interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function BenefitCard({
  title,
  description,
  icon,
  className = "",
}: BenefitCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 ${className}`}
      role="listitem"
    >
      <div
        className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </article>
  );
}

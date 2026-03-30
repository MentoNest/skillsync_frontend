import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LargeToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  gradient?: string;
  onClick?: () => void;
}

const LargeToolCard: React.FC<LargeToolCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  gradient = 'from-purple-600 to-indigo-700',
  onClick,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 group`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

      {/* Decorative shapes */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:translate-x-5 group-hover:-translate-y-5" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="mb-3 text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mb-8 text-lg font-light text-white/80 leading-relaxed max-w-md">
          {description}
        </p>

        <div className="mt-auto">
          <button
            onClick={onClick}
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-lg font-semibold text-purple-700 shadow-lg transition-all duration-300 hover:bg-purple-50 hover:px-8 active:scale-95"
          >
            {buttonText}
            <svg
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeToolCard;

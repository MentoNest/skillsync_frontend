import React from 'react';
import Link from 'next/link';

const tools = [
  {
    title: 'Resume Builder',
    description: 'Create a professional resume in minutes with our guided builder and expert templates.',
    gradient: 'from-cyan-500 to-blue-600 shadow-cyan-500/10',
    cta: 'Build Resume',
    href: '/resources/resume-builder',
  },
  {
    title: 'Career Planner',
    description: 'Map out your career goals, milestones, and action steps with personalized guidance.',
    gradient: 'from-purple-500 to-indigo-600 shadow-purple-500/10',
    cta: 'Plan Career',
    href: '/resources/career-planner',
  },
];

export default function ToolsAndTemplates() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 transition-colors" aria-labelledby="tools-heading">
      <div className="mx-auto max-w-screen-xl">
        <h2 id="tools-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
          Tools &amp; Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className={`bg-gradient-to-br ${tool.gradient} rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between min-h-48 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group`}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{tool.title}</h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">{tool.description}</p>
              </div>
              <Link
                href={tool.href}
                className="mt-6 inline-flex items-center self-start px-5 py-2.5 text-sm font-semibold bg-white/20 hover:bg-white/30 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600"
              >
                {tool.cta}
                <svg 
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const tools = [
  {
    title: 'Resume Builder',
    description: 'Create a professional resume in minutes with our guided builder and expert templates.',
    gradient: 'from-blue-500 to-indigo-600',
    cta: 'Build Resume',
  },
  {
    title: 'Career Planner',
    description: 'Map out your career goals, milestones, and action steps with personalized guidance.',
    gradient: 'from-purple-500 to-pink-600',
    cta: 'Plan Career',
  },
];

export default function ToolsAndTemplates() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Tools &amp; Templates</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className={`bg-gradient-to-br ${tool.gradient} rounded-2xl p-8 text-white flex flex-col justify-between min-h-48`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{tool.description}</p>
            </div>
            <a
              href="#"
              className="mt-6 inline-flex items-center self-start px-5 py-2.5 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition"
            >
              {tool.cta}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react'
import LargeToolCard from '@/components/resources/LargeToolCard'

const tools = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Resume Builder',
    description:
      'Build professional resumes with tailored templates and AI-powered suggestions.',
    buttonText: 'Build Resume',
    gradient: 'from-violet-600 to-indigo-700',
    href: '/resources/resume-builder',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Career Planner',
    description:
      'Map out your career growth with structured plans and milestone tracking.',
    buttonText: 'Plan Career',
    gradient: 'from-cyan-500 to-blue-600',
    href: '/resources/career-planner',
  },
]

export default function ToolsTemplatesSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-900">Tools &amp; Templates</h2>
      <p className="mt-2 text-sm text-slate-600">
        Powerful resources to accelerate your career journey
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <LargeToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  )
}

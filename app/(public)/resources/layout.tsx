import React from 'react'
import ResourcesFooter from '@/components/resources/ResourcesFooter'

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Learning resources</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Resources</h1>
          <p className="mt-2 text-slate-600">
            A public landing page for curated learning content, mentorship guides, and quick access to learning paths.
          </p>
        </header>
        {children}
        <ResourcesFooter />
      </div>
    </section>
  )
}

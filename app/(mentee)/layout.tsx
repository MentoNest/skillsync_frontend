import React from 'react'

export default function MenteeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6 bg-white rounded-md shadow-sm">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Mentee Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}

import React from 'react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Public Area</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}

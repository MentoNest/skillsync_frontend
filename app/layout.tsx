import '@/styles/globals.css'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Skillsync'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
              Skillsync
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/" className="transition hover:text-slate-900">
                Home
              </Link>
              <Link href="/resources" className="transition hover:text-slate-900">
                Resources
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

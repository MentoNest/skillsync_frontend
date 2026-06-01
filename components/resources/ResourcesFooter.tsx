import React from 'react'

export default function ResourcesFooter() {
  return (
    <footer className="rounded-3xl bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-800 px-8 py-10 shadow-sm sm:py-12">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm font-medium text-white/80">
          &copy; {new Date().getFullYear()} Skillsync. All rights reserved.
        </p>
        <p className="text-xs text-white/50">
          Built for mentors &amp; mentees
        </p>
      </div>
    </footer>
  )
}

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span className="text-xl font-bold text-slate-900">SkillSync</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link
              href="/#mentors"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Find Mentors
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Resources
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

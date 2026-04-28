import Link from 'next/link';

export default function ResourcesFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.129_0.042_264.695)] border-t border-[oklch(1_0_0_/_8%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background: 'linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.696 0.17 162.48))',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[oklch(0.984_0.003_247.858)] tracking-tight">
              SkillSync
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/"
              className="text-sm text-[oklch(0.704_0.04_256.788)] transition-colors duration-150 hover:text-[oklch(0.984_0.003_247.858)]"
            >
              Home
            </Link>
            <Link
              href="/learning-resources"
              className="text-sm text-[oklch(0.984_0.003_247.858)] transition-colors duration-150"
              aria-current="page"
            >
              Resources
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-[oklch(0.704_0.04_256.788)] transition-colors duration-150 hover:text-[oklch(0.984_0.003_247.858)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[oklch(0.704_0.04_256.788)] transition-colors duration-150 hover:text-[oklch(0.984_0.003_247.858)]"
            >
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-[oklch(0.554_0.046_257.417)]">
            &copy; {currentYear} SkillSync, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

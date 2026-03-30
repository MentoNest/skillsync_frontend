import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/mentors', label: 'Find Mentors' },
  { href: '/resources', label: 'Resources', active: true },
  { href: '/community', label: 'Community' },
  { href: '/credentials', label: 'Credentials' },
  { href: '/support', label: 'Support' },
];

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-purple-600 text-white text-sm font-semibold flex items-center justify-center">
            SS
          </span>
          <span className="text-slate-900 text-[2rem] leading-none font-semibold">SkillSync</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-slate-600 text-[1.05rem]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.active ? 'text-purple-600 font-medium' : 'hover:text-slate-900 transition-colors'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/mentee"
          className="rounded-xl bg-purple-600 text-white px-5 py-2.5 text-xl sm:text-base font-medium hover:bg-purple-700 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}

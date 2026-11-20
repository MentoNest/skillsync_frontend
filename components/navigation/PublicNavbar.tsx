"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/mentors", label: "Discover Mentors" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/resources", label: "Resources" },
];

/** Responsive public navigation bar with active state and mobile menu (#1369). */
export default function PublicNavbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const item = (href: string) =>
    `rounded px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600 ${
      path === href ? "font-semibold text-purple-700" : "text-gray-700 hover:text-purple-700"
    }`;
  const links = LINKS.map((l) => (
    <Link key={l.href} href={l.href} className={item(l.href)} aria-current={path === l.href ? "page" : undefined}>
      {l.label}
    </Link>
  ));

  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-purple-700">SkillSync</Link>
        <div className="hidden items-center gap-1 md:flex">{links}</div>
        <div className="hidden gap-2 md:flex">
          <Link href="/login" className={item("/login")}>Login</Link>
          <Link href="/register" className="rounded-lg bg-purple-700 px-4 py-2 text-sm text-white">Register</Link>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="flex flex-col border-t px-4 py-2 md:hidden">
          {links}
          <Link href="/login" className={item("/login")}>Login</Link>
          <Link href="/register" className={item("/register")}>Register</Link>
        </div>
      )}
    </nav>
  );
}

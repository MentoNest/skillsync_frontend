"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "@/components/Icons";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Mentors", href: "/mentors" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-lg font-semibold text-gray-900 hover:text-indigo-600"
            >
              <span className="sr-only">Skillsync</span>
              <div className="h-8 w-8 flex items-center justify-center rounded bg-indigo-600 text-white font-bold">
                S
              </div>
              <span className="ml-3">Skillsync</span>
            </Link>
          </div>

          <nav
            className="hidden md:flex md:space-x-6"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-2 py-1 rounded ${
                  isActive(link.href)
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="text-sm px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="p-2 inline-flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? (
                <XIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <MenuIcon className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${open ? "max-h-screen" : "max-h-0"} md:hidden overflow-hidden transition-all duration-200`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-base px-2 py-2 rounded ${
                isActive(link.href)
                  ? "text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t">
            <Link
              href="/login"
              className="block text-base px-2 py-2 rounded hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="mt-2 block text-center px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find a Mentor", href: "/find-a-mentor" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');

        .navbar-root {
          font-family: 'Sora', sans-serif;
        }

        .nav-link {
          position: relative;
          color: #374151;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 2px;
          background: #7c3aed;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #7c3aed; }
        .nav-link:hover::after { width: 100%; }

        .btn-get-started {
          background: #7c3aed;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.55rem 1.35rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(124,58,237,0.35);
          white-space: nowrap;
        }
        .btn-get-started:hover {
          background: #6d28d9;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124,58,237,0.45);
        }

        .btn-login {
          color: #374151;
          font-weight: 500;
          font-size: 0.9rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .btn-login:hover { color: #7c3aed; }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #374151;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }

        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #374151;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
        }
        .mobile-nav-link:hover {
          background: #f3f0ff;
          color: #7c3aed;
        }

        .navbar-shadow {
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
        }
      `}</style>

      <nav
        className={`navbar-root fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "navbar-shadow" : ""
        }`}
      >
        {/* Desktop bar */}
        <div className="container-responsive flex items-center h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 mr-4 md:mr-10">
            <span
              className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight"
            >
              SkillSync
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
            {NAV_LINKS.map((link) => (
              <a href={link.href} key={link.label} className="nav-link text-sm lg:text-base">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 ml-auto">
            <button type="button" aria-label="Log in" className="btn-login text-sm lg:text-base">Log In</button>
            <button type="button" aria-label="Get started" className="btn-get-started text-sm lg:text-base">Get started</button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden ml-auto">
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`mobile-menu md:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out ${menuOpen ? "open max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          aria-hidden={!menuOpen}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a 
                href={link.href} 
                key={link.label} 
                className="mobile-nav-link text-base py-3"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                aria-label="Log in"
                className="mobile-nav-link text-left py-3 text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </button>
              <button
                type="button"
                aria-label="Get started"
                className="btn-get-started w-full text-center py-3 text-base"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer so page content isn't hidden under the fixed nav */}
      <div className="h-16 md:h-20" />
    </>
  );
}
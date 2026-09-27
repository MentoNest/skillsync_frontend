import Brand from "./Brand";
import FooterLinkGroup, { FooterLink } from "./FooterLinkGroup";
import SocialLinks, { SocialLink } from "./SocialLinks";

/**
 * One column of footer links.
 *
 * The heading is a real `<h2>` with an `id` that the wrapping `<nav>` points at,
 * so a screen reader can ask "what landmarks are on this page" and hear
 * "Platform navigation" rather than four unlabelled regions called "navigation".
 * Four `<nav>` elements with the same implicit name is a landmark list nobody
 * can act on.
 */
interface LinkGroup {
  /** `id` is derived from the heading, so the two cannot drift apart. */
  heading: string;
  links: FooterLink[];
}

/**
 * ⚠️ **Two of these targets do not exist yet.**
 *
 * `#how-it-works` and `#pricing` have no matching element anywhere in the app,
 * so those links land on the landing page and do nothing. They are kept because
 * they are clearly planned navigation rather than typos, and deleting a column
 * of links to remove a dead anchor would be a worse change than leaving it —
 * but they should either gain sections or be dropped in the same commit that
 * decides which. `Navbar` has the same two dead anchors and this PR does not
 * change it, because that is a separate concern from the footer.
 *
 * The `"/"` prefix is not decoration. The header links to `#mentors`, which only
 * resolves on the landing page; the footer is on every page, so its copy needs
 * to be absolute. Same destination, reachable from anywhere.
 */
const LINK_GROUPS: LinkGroup[] = [
  {
    heading: "Platform",
    links: [
      { label: "Find Mentors", href: "/#mentors" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Learning Resources", href: "/resources" },
    ],
  },
  {
    heading: "For mentors",
    links: [
      { label: "Become a mentor", href: "/register" },
      // The mentor's own dashboard — a private area, not a browse page. There
      // is no public mentor directory route yet; `#mentors` on the landing page
      // is the closest thing to one that exists today.
      { label: "Mentor dashboard", href: "/mentor" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/**
 * Social profiles.
 *
 * ⚠️ **The URLs are placeholders** and must be replaced with the real account
 * URLs before launch. Guessing a handle and shipping it is how a company ends
 * up with a "follow us" link to somebody else's account.
 *
 * `icon` is a ReactNode rather than a name so the markup stays in JSX where
 * TypeScript can check it, but the `name` is the load-bearing field: these are
 * icon-only links, and without it each one is announced as "link" with no
 * destination. See the note on the render below.
 */
const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "X",
    href: "https://x.com/skillsync",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/skillsync",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/MentoNest/skillsync_frontend",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013-.404c1.02.006 2.04.138 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@skillsync",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12l-6.273 3.568" />
      </svg>
    ),
  },
];

/**
 * Site footer.
 *
 * ## What changed, and why
 *
 * The footer already existed, so this is a rework rather than a new component.
 * Three requirements from the issue were not met by it:
 *
 * 1. **Social links** — absent entirely. Added above.
 * 2. **Reusable** — the link columns were hard-coded `<li>`s. They are now a
 *    `LINK_GROUPS` array, so adding a column or a link is a data change, and
 *    every column is guaranteed to be marked up identically. The previous
 *    version had three hand-written columns that were already drifting from one
 *    another in class names.
 * 3. **Accessible links** — see below.
 *
 * ## On the accessibility of the link columns
 *
 * Each column is a `<nav>` labelled by its own heading, so the footer exposes
 * four distinguishable navigation landmarks rather than a wall of anonymous
 * links at the end of the document.
 *
 * External social links are plain `<a>` with `rel="noopener noreferrer"`, not
 * `next/link`. `next/link` is for client-side navigation between routes in this
 * app; a link to x.com is a full page load, and prefetching someone's social
 * profile on hover is not something to do by default.
 *
 * The social links are icon-only, so each carries an `aria-label` naming its
 * destination ("SkillSync on X") rather than the word "Twitter", which is both
 * wrong since the platform is X and ambiguous when read aloud. The visible
 * content is the icon and nothing else, so without the label these five links
 * are announced as "link, link, link, link, link".
 */
export default function Footer() {
  // Rendered on the server, so this is the server's clock and never a
  // hydration mismatch.
  const year = new Date().getFullYear();

  return (
    // `<footer>` outside any `<article>`/`<section>` is already the
    // `contentinfo` landmark; no explicit role needed.
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {/* Brand + socials: full row on mobile/tablet, two columns on desktop */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Brand
              tone="onDark"
              className="mb-4 w-fit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            />
            <p className="max-w-xs text-sm leading-relaxed">
              Connecting learners with expert mentors to accelerate career growth.
            </p>
            <SocialLinks links={SOCIAL_LINKS} className="mt-6" />
          </div>

          {LINK_GROUPS.map((group) => (
            <FooterLinkGroup
              key={group.heading}
              title={group.heading}
              links={group.links}
              idPrefix={`footer-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-800 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} SkillSync. All rights reserved.</p>
          <p>Built for learners, by mentors.</p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ResourceCard, {
  ResourceCardProps,
} from "@/components/resources/ResourceCard";
import ResourcesExplorer from "@/components/resources/ResourcesExplorer";

/**
 * Per-category resource entries.
 *
 * ⚠️ **Placeholder content.** These are illustrative titles and descriptions
 * standing in for real editorial. The structure is the deliverable; the
 * articles are not written yet, and the links point nowhere useful until they
 * are. See the note in the PR.
 */
const RESOURCE_CATEGORIES: {
  id: string;
  title: string;
  blurb: string;
  viewAllHref?: string;
  items: ResourceCardProps[];
}[] = [
  {
    id: "guides",
    title: "Guides",
    blurb:
      "Long-form, end to end. Start here if the problem is that you do not yet know what to be doing.",
    viewAllHref: "/resources/tracks",
    items: [
      {
        title: "How to write the first line of your CV",
        summary:
          "Most CVs fail in the first third of the first page. What to cut, what order to put things in, and the one question a hiring manager is actually answering.",
        type: "Guide",
        readMinutes: 12,
        href: "/resources/tracks",
        image: {
          src: "/resources/learning-track.svg",
          alt: "Illustration for learning tracks",
          width: 800,
          height: 500,
        },
      },
      {
        title: "Getting a first tech job with no experience",
        summary:
          "The routes that work for people without a degree or a bootcamp, and the ones that are sold to you and do not.",
        type: "Guide",
        readMinutes: 18,
        href: "/resources/tracks",
        image: {
          src: "/resources/learning-track.svg",
          alt: "Illustration for learning track content",
          width: 800,
          height: 500,
        },
      },
      {
        title: "Preparing for a system design interview",
        summary:
          "What is actually being assessed, how to run a 45-minute conversation, and how to say 'I don't know' without losing the room.",
        type: "Guide",
        readMinutes: 22,
        href: "/resources/tracks",
        image: {
          src: "/resources/learning-track.svg",
          alt: "System design learning track illustration",
          width: 800,
          height: 500,
        },
      },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    blurb:
      "Shorter reads on one specific thing. Useful when you already know the shape of the problem.",
    viewAllHref: "/resources/articles",
    items: [
      {
        title: "What mentorship is actually for",
        summary:
          "A mentor is not a cheaper course. The difference matters, and it is the difference the platform is built on.",
        type: "Article",
        readMinutes: 6,
        href: "/resources/articles",
        image: {
          src: "/resources/article.svg",
          alt: "Article illustration",
          width: 800,
          height: 500,
        },
      },
      {
        title: "How to ask a question a mentor can answer",
        summary:
          "'Can you help me with my career?' is the least answerable question you can ask. Four sentences that fix it.",
        type: "Article",
        readMinutes: 5,
        href: "/resources/articles",
        image: {
          src: "/resources/article.svg",
          alt: "Article resource illustration",
          width: 800,
          height: 500,
        },
      },
      {
        title: "When to change jobs, and when to stay",
        summary:
          "The two questions that settle it, and why 'am I happy' is not one of them.",
        type: "Article",
        readMinutes: 9,
        href: "/resources/articles",
        image: {
          src: "/resources/article.svg",
          alt: "Career article illustration",
          width: 800,
          height: 500,
        },
      },
    ],
  },
  {
    id: "sessions",
    title: "Recorded sessions",
    blurb:
      "Live mentor sessions, edited down to the part worth keeping. No filler, no introductions.",
    items: [
      {
        title: "Negotiating your first offer",
        summary:
          "A mentor walks through three real offer emails and the reasoning behind each counter.",
        type: "Video",
        readMinutes: 34,
        image: {
          src: "/resources/tool.svg",
          alt: "Video session illustration",
          width: 800,
          height: 500,
        },
      },
      {
        title: "Reading a system design diagram",
        summary:
          "How to spot the two problems in a diagram before the interview starts asking about them.",
        type: "Video",
        readMinutes: 27,
        image: {
          src: "/resources/tool.svg",
          alt: "Recorded session illustration",
          width: 800,
          height: 500,
        },
      },
      {
        title: "Saying no to a promotion you do not want",
        summary:
          "The conversation most people have never had, and the script for having it.",
        type: "Video",
        readMinutes: 19,
        image: {
          src: "/resources/tool.svg",
          alt: "Mentor session illustration",
          width: 800,
          height: 500,
        },
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Learning Resources · SkillSync",
  description:
    "Guides, articles, and recorded mentor sessions for people building a career in tech — free to read, no account required.",
};

/**
 * `/resources` — the Learning Resources route.
 *
 * ## Why it lives under `app/(public)/`
 *
 * Because that is what puts the global navigation on it. A route group is
 * invisible in the URL, so this file is served at `/resources` and the group's
 * `layout.tsx` wraps it with the `Navbar` and `Footer` — which is the first
 * acceptance criterion ("Global navigation is present") satisfied by file
 * placement rather than by copying a header onto the page. A page that has to
 * remember to render the site header is a page that will eventually forget.
 *
 * ## About the page structure
 *
 * `h1` once, then a skip-free `h2` per category, then `h3` per entry. The
 * category links in the intro are a real in-page navigation list with
 * `aria-labelledby` on the list, so a screen reader announces "Jump to
 * category" rather than three bare links.
 *
 * The category `id`s come from the data, so a link and its target cannot drift.
 */
export default function ResourcesPage() {
  return (
    // Not a `<main>`: the (public) layout already renders one, and nesting
    // landmarks is invalid HTML.
    <div>
      {/* Hero */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-100 opacity-50 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-5">
              Learning resources
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Learn from people who have already done it
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              Guides, articles, and recorded sessions from the mentors on
              SkillSync. Everything here is free and needs no account — if it is
              useful, take it, and book a session when you want the part a page
              cannot give you.
            </p>
          </div>
        </div>
      </section>

      {/* Category jump list */}
      <nav
        aria-labelledby="resources-categories-heading"
        className="border-y border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2
            id="resources-categories-heading"
            className="text-sm font-semibold text-slate-900 mb-4"
          >
            Browse by category
          </h2>

          <ul className="flex flex-wrap gap-3">
            {RESOURCE_CATEGORIES.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Search, Quick Access and learning tracks */}
      <ResourcesExplorer />

      {/* Categories */}
      {RESOURCE_CATEGORIES.map((category) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-heading`}
          className="scroll-mt-16 py-16 lg:py-20 border-b border-slate-200 last:border-b-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2
                  id={`${category.id}-heading`}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                  {category.title}
                </h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {category.blurb}
                </p>
              </div>

              {category.viewAllHref ? (
                <Link
                  href={category.viewAllHref}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View all
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {category.items.map((item) => (
                <li key={item.title} className="flex">
                  <ResourceCard {...item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Closing CTA */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reading only goes so far
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            The point of a mentor is that they can see the thing you cannot.
            One session will get you further than a month of reading.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Find a mentor
            </Link>
            <Link
              href="/mentor"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-base border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Become a mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

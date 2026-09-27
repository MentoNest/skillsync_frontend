import type { Metadata } from "next";
import Link from "next/link";
import ResourceCard, {
  ResourceCardProps,
} from "@/components/resources/ResourceCard";

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
  items: ResourceCardProps[];
}[] = [
  {
    id: "guides",
    title: "Guides",
    blurb:
      "Long-form, end to end. Start here if the problem is that you do not yet know what to be doing.",
    items: [
      {
        title: "How to write the first line of your CV",
        summary:
          "Most CVs fail in the first third of the first page. What to cut, what order to put things in, and the one question a hiring manager is actually answering.",
        type: "Guide",
        readMinutes: 12,
      },
      {
        title: "Getting a first tech job with no experience",
        summary:
          "The routes that work for people without a degree or a bootcamp, and the ones that are sold to you and do not.",
        type: "Guide",
        readMinutes: 18,
      },
      {
        title: "Preparing for a system design interview",
        summary:
          "What is actually being assessed, how to run a 45-minute conversation, and how to say 'I don't know' without losing the room.",
        type: "Guide",
        readMinutes: 22,
      },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    blurb:
      "Shorter reads on one specific thing. Useful when you already know the shape of the problem.",
    items: [
      {
        title: "What mentorship is actually for",
        summary:
          "A mentor is not a cheaper course. The difference matters, and it is the difference the platform is built on.",
        type: "Article",
        readMinutes: 6,
      },
      {
        title: "How to ask a question a mentor can answer",
        summary:
          "'Can you help me with my career?' is the least answerable question you can ask. Four sentences that fix it.",
        type: "Article",
        readMinutes: 5,
      },
      {
        title: "When to change jobs, and when to stay",
        summary:
          "The two questions that settle it, and why 'am I happy' is not one of them.",
        type: "Article",
        readMinutes: 9,
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
      },
      {
        title: "Reading a system design diagram",
        summary:
          "How to spot the two problems in a diagram before the interview starts asking about them.",
        type: "Video",
        readMinutes: 27,
      },
      {
        title: "Saying no to a promotion you do not want",
        summary:
          "The conversation most people have never had, and the script for having it.",
        type: "Video",
        readMinutes: 19,
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
    <main>
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

      {/* Categories */}
      {RESOURCE_CATEGORIES.map((category) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-heading`}
          className="scroll-mt-16 py-16 lg:py-20 border-b border-slate-200 last:border-b-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export const metadata: Metadata = {
  title: "Learning Resources – SkillSync",
  description:
    "Curated articles, learning tracks, tools and templates to help you level up your career alongside your mentorship.",
};

/**
 * Sections the Learning Resources workstream will fill in. Rendering them as a
 * declared manifest keeps the page structure stable while the individual
 * section issues land.
 */
const PLANNED_SECTIONS = [
  {
    id: "resources-hero",
    title: "Hero",
    description: "Headline, supporting copy and resource search entry point.",
  },
  {
    id: "resource-categories",
    title: "Categories",
    description: "Browse resources by discipline, role or skill.",
  },
  {
    id: "quick-access",
    title: "Quick Access",
    description: "Shortcuts to the most-visited guides and templates.",
  },
  {
    id: "featured-learning-tracks",
    title: "Featured Learning Tracks",
    description: "Curated multi-step programmes for in-demand skills.",
  },
  {
    id: "featured-articles",
    title: "Featured Articles",
    description: "The latest practical writing from mentors and learners.",
  },
  {
    id: "tools-and-templates",
    title: "Tools & Templates",
    description: "Downloadable templates for CVs, portfolios and interviews.",
  },
];

export default function ResourcesPage() {
  return (
    <main id="main-content">
      {/* Page intro */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Learning Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl">
            Free tools to help you get better, faster
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            Guides, templates and structured learning tracks written by the same
            mentors you can book on SkillSync. No sign-up required to read.
          </p>
        </div>
      </section>

      {/* Library structure */}
      <section
        className="py-16 lg:py-20 bg-white"
        aria-labelledby="resources-library-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2
              id="resources-library-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
            >
              Resource library
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              This page is being built section by section. The structure below is
              ready for each part of the library.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PLANNED_SECTIONS.map((section) => (
              <li
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">{section.title}</h3>
                  <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-600">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {section.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Fallback CTA */}
          <div className="mt-12 rounded-2xl bg-indigo-600 px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Want guidance on your specific situation?
              </h3>
              <p className="mt-1 text-indigo-100">
                Book a 1-on-1 session with a mentor while the library is in
                progress.
              </p>
            </div>
            <Link
              href="/#mentors"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Find a mentor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

# SkillSync

A mentorship platform connecting mentees with industry-leading mentors. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **PostCSS**

## Project Structure

```
app/
├── (public)/              # Public-facing pages (landing, mentors, resources)
│   ├── layout.tsx         # Public layout with Navbar + Footer
│   └── page.tsx           # Landing page
├── (mentor)/              # Mentor dashboard
│   ├── layout.tsx         # Mentor role layout
│   └── mentor/page.tsx
├── (mentee)/              # Mentee dashboard
│   ├── layout.tsx         # Mentee role layout
│   └── mentee/page.tsx
├── (admin)/               # Admin dashboard
│   ├── layout.tsx         # Admin role layout
│   └── admin/page.tsx
├── (auth)/                # Authentication pages
├── (dashboard)/           # Shared dashboard views
├── api/                   # API routes
├── layout.tsx             # Root layout
└── globals.css            # Global styles + Tailwind config
```

## Shared Directories

```
components/
├── landing/               # Landing page section components
├── mentors/               # Mentor discovery & filtering
├── community/             # Discussion & moderation features
├── navigation/            # Navbar, Footer
├── ui/                    # Reusable UI primitives (Button, StarRating, etc.)
└── *.tsx                  # Feature-level components (MentorCard, Testimonials, etc.)

lib/
├── types.ts               # Shared TypeScript interfaces
├── community-service.ts   # Community data layer
├── filters.ts             # Filtering utilities
└── realtime-discussion.ts # Real-time discussion support
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Path Aliases

- `@/components` — Component library
- `@/lib` — Utilities and types
- `@/styles` — Global styles

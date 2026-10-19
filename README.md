# SkillSync Frontend

Mentorship platform frontend built with Next.js App Router, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Fonts** — `next/font` (Geist)

## Project Structure

```text
app/
├── (public)/          # Unauthenticated routes (landing page, mentors, auth)
│   ├── layout.tsx     # Navbar + Footer shell
│   └── page.tsx       # Landing page at /
├── (mentor)/          # Mentor-only routes, guarded by RoleGuard
│   ├── layout.tsx
│   └── mentor/page.tsx
├── (mentee)/          # Mentee-only routes, guarded by RoleGuard
│   ├── layout.tsx
│   └── mentee/page.tsx
├── (admin)/           # Admin-only routes, guarded by RoleGuard
│   ├── layout.tsx
│   └── admin/page.tsx
├── layout.tsx         # Root layout (metadata, AuthProvider)
└── globals.css        # Global styles and design tokens
components/            # Reusable UI components (landing, layout, auth, ...)
lib/                   # Shared utilities and helpers
```

### Route Groups

Each audience has its own route group and layout so navigation and guards stay isolated:

| Route | Group | Layout |
| --- | --- | --- |
| `/` | `(public)` | Navbar + Footer, no guard |
| `/mentor` | `(mentor)` | `RoleGuard role="mentor"` |
| `/mentee` | `(mentee)` | `RoleGuard role="mentee"` |
| `/admin` | `(admin)` | `RoleGuard role="admin"` |

### Path Aliases

`tsconfig.json` maps `@/*` to the project root, so imports stay stable as the tree grows:

```ts
import Navbar from "@/components/layout/Navbar";
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

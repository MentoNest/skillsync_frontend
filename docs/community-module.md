# Community Module

This document describes the current frontend implementation of the SkillSync Community module and identifies integration points for backend, authentication, and moderation features.

## Purpose

The Community module gives learners a public place to browse and filter mentorship discussions by topic. It is currently a frontend prototype: discussion data is rendered in-page and no requests are made to a backend service.

## Routing

| Route | File | Description |
| --- | --- | --- |
| `/` | `app/(public)/page.tsx` | Public landing page; contains links and community promotion. |
| `/community` | `app/(public)/community/page.tsx` | Community discussion listing and category filter. |

The route is public and is nested under the `(public)` route group. The route group changes the layout hierarchy without changing the URL.

The shared [`Header`](/C:/Users/User/Downloads/skillsync_frontend-main/skillsync_frontend-1/components/landing/Header.tsx) component links to `/community`. [`PublicLayout`](/C:/Users/User/Downloads/skillsync_frontend-main/skillsync_frontend-1/app/(public)/layout.tsx) applies the public header and footer to the route.

## Component hierarchy

```text
app/layout.tsx
└── app/(public)/layout.tsx
    ├── components/landing/Header.tsx
    ├── app/(public)/community/page.tsx
    │   ├── Category filter section
    │   ├── Clear-filters control
    │   └── Discussion list
    └── components/landing/Footer.tsx
```

The community page is currently a single client component. It owns both the static discussion data and interactive filtering state. There are no dedicated community components or module directories yet.

## Data and API endpoints

The page defines local constants for:

- `categories`: available discussion categories.
- `discussions`: discussion records displayed to users.

A discussion currently contains:

- `id`
- `title`
- `excerpt`
- `author`
- `initials`
- `age`
- `replies`
- `categories`

There are currently no API calls, environment-dependent service URLs, or backend models in this module. Therefore, the following Community operations do not have implemented endpoints:

- Listing discussions.
- Creating a discussion.
- Viewing discussion details.
- Posting or editing replies.
- Reporting content.
- Moderating content.

When backend support is added, page data should be moved to a typed data-access module and fetched through server components or a clearly documented API client. Candidate REST resources could include `/api/community/discussions`, `/api/community/categories`, `/api/community/discussions/:id/replies`, and `/api/community/reports`, but these routes must match the backend contract before implementation.

## State management

The page uses React local state:

- `selectedCategories: string[]` stores the categories selected with the filter buttons.
- `toggleCategory(category)` adds or removes a category.
- Clearing filters resets the array to `[]`.
- `filteredDiscussions` derives the visible discussions from the selected categories. An empty selection means that all discussions are shown. If categories are selected, a discussion is shown when at least one of its categories matches.

No global store, URL search parameters, cache, or persistence is used. Reloading the page resets the filter. If the module grows, filter state should be moved into a dedicated hook or component and server-supplied discussions should use an explicit loading, empty, error, and pagination state.

## Permissions

Current behavior is public:

- Any visitor can open `/community`.
- Any visitor can use the category filter.
- No login is required.
- There is no create, edit, delete, reply, or report action implemented.

Authentication routes exist at `/login` and `/register`, but the Community page does not inspect authentication or authorization state. Backend integration must define viewer capabilities, such as whether a signed-in user can create discussions or replies, and should enforce permissions on both the UI and server.

## Moderation workflow

A moderation workflow is not implemented in the current frontend. The static prototype does not expose actions or moderation queues.

A complete integration should cover:

1. A signed-in member submits a post or reply.
2. The backend validates content and applies the configured publishing policy.
3. Members or administrators can report policy-violating content.
4. Moderators review reports and the referenced content in an access-controlled queue.
5. Moderators approve, edit, hide, or remove content and record the action.
6. The author receives an appropriate status notification.

The backend must be the authority for role checks, report handling, audit history, and moderation rules. The frontend should hide unauthorized actions and still handle server-rejected operations safely.

## Accessibility and UX behavior

- Filter buttons use `aria-pressed` to expose selection state.
- The filter section has a labeled heading and the category controls have an accessible group label.
- The discussion count uses `aria-live="polite"` for updates.
- The page provides a visible clear-filters action when filters are active.
- An empty local result state is shown when no discussions match.
- Tailwind classes provide a responsive layout and dark-mode styles.

## Testing instructions

### Prerequisites

- Node.js and npm are installed.
- Run `npm install` from the repository root if dependencies are not present.

### Automated checks

```powershell
npm run lint
npm run build
```

Run these checks before submitting a Community module change. The build also verifies Next.js routing and TypeScript compilation.

### Manual test

1. Start the application:

   ```powershell
   npm run dev
   ```

2. Open `http://localhost:3000/community`.
3. Confirm the header and footer are displayed.
4. Confirm all five discussions are visible before a category is selected.
5. Select a category and confirm only discussions containing that category remain.
6. Select multiple categories and confirm discussions matching either selected category remain (current OR behavior).
7. Use **Clear filters** and confirm all discussions return.
8. Narrow the viewport and confirm the category buttons and discussion cards remain usable.
9. Toggle the system/browser dark mode and confirm text and controls remain readable.

There is no automated test runner configured in `package.json` currently. If Community tests are added, place focused route/component tests beside the implementation or in a conventional `test` or `tests` directory, and document the new npm test script here.

## Contributor notes

- Keep static prototype data separate from reusable Community components as the module grows.
- Define and export TypeScript types for discussions, replies, categories, and reports.
- Use Next.js route segments rather than client-only navigation for Community subroutes.
- Add loading, empty, error, and retry states before replacing static data with API data.
- Cover category filtering and selected-state updates with tests.
- Do not add moderation controls without corresponding backend authorization and audit behavior.

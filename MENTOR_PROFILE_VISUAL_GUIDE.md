# Mentor Profile Page - Visual Guide

## Page Layout

### Desktop View (1024px+)
```
┌──────────────────────────────────────────────────────────────────────┐
│                         HEADER (White)                                │
├──────────────────────────────────────────────────────────────────────┤
│  ┌────────┐                                                           │
│  │        │  John Doe                            ┌─────────────────┐ │
│  │ Avatar │  Senior Software Engineer @ Google   │  Book Session   │ │
│  │  ● Avl │  ★ 4.8 · 250 sessions · Technology  │                 │ │
│  └────────┘  [senior]                            │  Bookmark       │ │
│                                                   └─────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┬────────────────────────────────┐
│                                     │                                │
│  MAIN CONTENT (2/3 width)           │  SIDEBAR (1/3 width)          │
│                                     │                                │
│  ┌────────────────────────────────┐ │  ┌──────────────────────────┐ │
│  │ About                          │ │  │ $150/hour                 │ │
│  │                                │ │  │                           │ │
│  │ Lorem ipsum dolor sit amet...  │ │  │ Response time: ~24 hours  │ │
│  │ consectetur adipiscing elit... │ │  │ Average rating: 4.8/5.0   │ │
│  │                                │ │  │ Total sessions: 250       │ │
│  └────────────────────────────────┘ │  │ Member since: 2024        │ │
│                                     │  │                           │ │
│  ┌────────────────────────────────┐ │  │ [Book a Session]          │ │
│  │ Skills & Expertise             │ │  └──────────────────────────┘ │
│  │                                │ │                                │
│  │ [React] [TypeScript] [Node.js] │ │  ┌──────────────────────────┐ │
│  │ [System Design] [Leadership]   │ │  │ Availability              │ │
│  │ [Architecture]                 │ │  │                           │ │
│  └────────────────────────────────┘ │  │ 📅 Calendar coming soon   │ │
│                                     │  └──────────────────────────┘ │
│  ┌────────────────────────────────┐ │                                │
│  │ Reviews                        │ │  ┌──────────────────────────┐ │
│  │                                │ │  │ Share Profile             │ │
│  │ 💬 Reviews coming soon         │ │  │                           │ │
│  │                                │ │  │ [Copy Link] [🐦]          │ │
│  └────────────────────────────────┘ │  └──────────────────────────┘ │
│                                     │                                │
│  ← Back to All Mentors              │                                │
└─────────────────────────────────────┴────────────────────────────────┘
```

### Mobile View (<768px)
```
┌────────────────────────────────┐
│         HEADER                 │
├────────────────────────────────┤
│  ┌──────┐                      │
│  │      │  John Doe            │
│  │Avatar│  Senior Engineer     │
│  │ ● Av │  ★ 4.8 · 250 sess.  │
│  └──────┘                      │
│                                │
│  ┌──────────────────────────┐ │
│  │  Book Session            │ │
│  └──────────────────────────┘ │
│  ┌──────────────────────────┐ │
│  │  Bookmark                │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘

┌────────────────────────────────┐
│  ┌──────────────────────────┐ │
│  │ $150/hour                 │ │
│  │ Stats...                  │ │
│  │ [Book a Session]          │ │
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │ About                     │ │
│  │ ...                       │ │
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │ Skills                    │ │
│  │ [React] [TypeScript]      │ │
│  └──────────────────────────┘ │
│                                │
│  ← Back to All Mentors         │
└────────────────────────────────┘
```

## Component Details

### 1. Profile Header
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌────────────┐                                                 │
│  │            │  John Doe                                       │
│  │   Avatar   │  Senior Software Engineer at Google            │
│  │            │                                                 │
│  │    ● Avl   │  ★ 4.8  250 sessions  [Technology]  [senior]  │
│  └────────────┘                                                 │
│       ^                                                         │
│   Availability                                                  │
│   Badge                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Availability Badge States:**
```
Available:              Busy:                   Unavailable:
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ ● Available  │       │ ◐ Limited    │       │ ○ Currently  │
│              │       │   Availability│       │   Unavailable│
└──────────────┘       └──────────────┘       └──────────────┘
bg-green-100           bg-yellow-100           bg-red-100
text-green-800         text-yellow-800         text-red-800
```

### 2. Action Buttons (Header)
```
┌──────────────────────┐
│   Book Session       │  ← Primary action (indigo)
└──────────────────────┘

┌──────────────────────┐
│   Bookmark           │  ← Secondary action (white/rose when active)
└──────────────────────┘
```

**Bookmark States:**
```
Not Bookmarked:             Bookmarked:
┌──────────────────┐       ┌──────────────────┐
│ Bookmark         │       │ Bookmarked       │
│ (white bg)       │       │ (rose-600 bg)    │
└──────────────────┘       └──────────────────┘
```

### 3. About Section
```
┌─────────────────────────────────────────────────┐
│ About                                           │
├─────────────────────────────────────────────────┤
│                                                 │
│ Experienced software engineer with 10+ years    │
│ in the industry. Specialized in frontend        │
│ development and system design.                  │
│                                                 │
│ I've worked at leading tech companies and       │
│ mentored 250+ engineers in their career growth. │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 4. Skills Section
```
┌─────────────────────────────────────────────────┐
│ Skills & Expertise                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  [React] [TypeScript] [Node.js] [GraphQL]      │
│  [System Design] [AWS] [Docker] [Kubernetes]   │
│  [Leadership] [Mentorship] [Code Review]       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Skill Badge:**
```
┌──────────┐
│  React   │  bg-slate-100, hover:bg-slate-200
└──────────┘  text-slate-700, rounded-lg
```

### 5. Pricing Card (Sidebar)
```
┌───────────────────────────────┐
│                               │
│         $150                  │
│         /hour                 │
│     Session rate              │
│                               │
├───────────────────────────────┤
│                               │
│  Response time    ~24 hours   │
│  Average rating   4.8/5.0     │
│  Total sessions   250         │
│  Member since     2024        │
│                               │
├───────────────────────────────┤
│                               │
│    [Book a Session]           │
│                               │
└───────────────────────────────┘
```

### 6. Placeholder Sections

**Reviews (Coming Soon):**
```
┌─────────────────────────────────────┐
│ Reviews                             │
├─────────────────────────────────────┤
│                                     │
│         💬                          │
│    Reviews coming soon              │
│                                     │
└─────────────────────────────────────┘
```

**Availability Calendar (Coming Soon):**
```
┌─────────────────────────────────────┐
│ Availability                        │
├─────────────────────────────────────┤
│                                     │
│         📅                          │
│  Calendar integration coming soon   │
│                                     │
└─────────────────────────────────────┘
```

### 7. Share Profile
```
┌───────────────────────────────┐
│ Share Profile                 │
├───────────────────────────────┤
│                               │
│  [Copy Link]  [🐦]           │
│                               │
└───────────────────────────────┘
```

## Loading State

```
┌──────────────────────────────────────────────────────────┐
│  ┌────┐  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                 │
│  │░░░░│  ▓▓▓▓▓▓▓▓▓▓▓▓                                   │
│  │░░░░│  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒                          │
│  └────┘                                                  │
└──────────────────────────────────────────────────────────┘
   ^        ^         ^
 Avatar   Name    Badges
(skeleton)(pulse) (skeleton)

┌────────────────────────────┬─────────────────────┐
│ ┌────────────────────────┐ │ ┌─────────────────┐ │
│ │ ▓▓▓▓▓▓▓                │ │ │ ▓▓▓▓▓▓▓▓▓▓      │ │
│ │                         │ │ │                 │ │
│ │ ░░░░░░░░░░░░░░░░░░░░░  │ │ │ ▒▒▒▒ ▒▒▒▒▒▒▒  │ │
│ │ ░░░░░░░░░░░░░░░░░░░░░  │ │ │ ▒▒▒▒ ▒▒▒▒▒▒▒  │ │
│ │ ░░░░░░░░░░░░░          │ │ │                 │ │
│ └────────────────────────┘ │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │
│                             │ └─────────────────┘ │
└────────────────────────────┴─────────────────────┘
```

**Animation:** All skeleton elements pulse with opacity 40-100

## Not Found State

```
┌─────────────────────────────────────────┐
│                                         │
│              ┌─────────┐                │
│              │         │                │
│              │  👤❌   │                │
│              │         │                │
│              └─────────┘                │
│                                         │
│        Mentor Not Found                 │
│                                         │
│  We couldn't find the mentor profile    │
│  you're looking for. The profile may    │
│  have been removed or the link might    │
│  be incorrect.                          │
│                                         │
│  ┌─────────────────┐ ┌───────────────┐ │
│  │ Browse Mentors  │ │ Go to Home    │ │
│  └─────────────────┘ └───────────────┘ │
│                                         │
│  Need help? Contact support             │
│                                         │
└─────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
```
Indigo (CTA buttons):
- bg-indigo-600
- hover:bg-indigo-700
- text-white

White (Cards):
- bg-white
- border-slate-200
```

### Status Colors
```
Available (Green):
- bg-green-100
- text-green-800
- border-green-200

Busy (Yellow):
- bg-yellow-100
- text-yellow-800
- border-yellow-200

Unavailable (Red):
- bg-red-100
- text-red-800
- border-red-200
```

### Text Colors
```
Primary text: text-slate-900
Secondary text: text-slate-600
Muted text: text-slate-500

Links: text-indigo-600
Links hover: text-indigo-700
```

### Badge Colors
```
Skills: bg-slate-100, text-slate-700
Industry: bg-slate-100, text-slate-700
Experience: bg-indigo-50, text-indigo-700
```

## Interaction States

### Button Hover
```
Before:                    Hover:
┌──────────────────┐     ┌──────────────────┐
│ Book Session     │ →   │ Book Session     │
│ bg-indigo-600    │     │ bg-indigo-700    │
└──────────────────┘     └──────────────────┘
```

### Skill Badge Hover
```
Before:                    Hover:
┌──────────┐             ┌──────────┐
│  React   │      →      │  React   │
│bg-slate-100│           │bg-slate-200│
└──────────┘             └──────────┘
```

### Bookmark Toggle
```
Step 1:                   Step 2:                  Step 3:
┌────────────┐           ┌────────────┐          ┌────────────┐
│ Bookmark   │  [Click]  │ Bookmarked │ [Click] │ Bookmark   │
│ (white)    │    →      │ (rose-600) │   →     │ (white)    │
└────────────┘           └────────────┘          └────────────┘
```

## Responsive Breakpoints

### Desktop (1024px+)
- Two-column layout (2:1)
- Sidebar is sticky
- Full content width: 1280px (max-w-7xl)
- Padding: px-4 sm:px-6 lg:px-8

### Tablet (768px - 1023px)
- Two-column maintained
- Sidebar scrolls normally
- Adjusted spacing
- Padding: px-6

### Mobile (<768px)
- Single column
- Sidebar moves above main content
- Full-width components
- Padding: px-4

## Typography

```
Heading 1 (Name):
text-3xl font-bold text-slate-900

Heading 2 (Sections):
text-xl font-bold text-slate-900

Heading 3 (Sidebar):
text-lg font-bold text-slate-900

Body Text:
text-base text-slate-700

Small Text:
text-sm text-slate-600

Hourly Rate:
text-3xl font-bold text-slate-900

Price Suffix:
text-lg text-slate-600
```

## Spacing

```
Section gaps: space-y-6 (24px)
Card padding: p-6 (24px)
Button padding: px-6 py-3
Badge padding: px-4 py-2
Skill badge gap: gap-2 (8px)
```

## Avatar Display Logic

```
if (mentor.avatar exists && !imageError) {
  ┌────────┐
  │        │
  │ Image  │  ← Next.js <Image />
  │        │
  └────────┘
} else {
  ┌────────┐
  │   JD   │  ← Initials with gradient
  │        │     bg-gradient-to-br
  └────────┘     from-indigo-500 to-cyan-500
}
```

## Icon Usage

```
Star (Rating):      ★ (filled yellow)
Availability:       ● ◐ ○ (green/yellow/red)
Back Arrow:         ← (left arrow)
Calendar:           📅 (emoji placeholder)
Chat:               💬 (emoji placeholder)
User Not Found:     👤❌ (icon + X overlay)
Twitter:            🐦 (social icon)
```

## Animation

### Page Load
- Smooth fade-in
- Content slides up slightly
- Duration: 300ms

### Loading Skeletons
- Pulse animation
- Opacity: 40% → 100%
- Duration: 1.5s
- Repeat: infinite

### Hover Effects
- Transition: 150ms
- Transform: none
- Focus ring: 2px offset

## Accessibility Features

### Focus Indicators
```
Button focus:
- ring-2
- ring-indigo-500
- ring-offset-2
```

### Screen Reader
```
<div className="sr-only">
  Loading mentor profile...
</div>
```

### Semantic HTML
```
<nav>     ← Pagination
<section> ← Content sections
<article> ← Mentor card
<button>  ← All interactions
```

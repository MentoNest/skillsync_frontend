# SkillSync Mentorship Platform

A modern mentorship platform built with Next.js 14, TypeScript, and Tailwind CSS that connects mentors with mentees for meaningful skill development and knowledge sharing.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **PostCSS**: For CSS processing

## Project Structure

```
app/
├─ (public)/                 # Public routes
│ ├─ layout.tsx             # Public layout
│ └─ page.tsx               # Public landing page
│
├─ (mentor)/                # Mentor routes
│ ├─ layout.tsx             # Mentor layout
│ └─ mentor/page.tsx        # Mentor dashboard
│
├─ (mentee)/               # Mentee routes
│ ├─ layout.tsx             # Mentee layout
│ └─ mentee/page.tsx        # Mentee dashboard
│
├─ (admin)/                # Admin routes
│ ├─ layout.tsx             # Admin layout
│ └─ admin/page.tsx         # Admin dashboard
│
├─ layout.tsx              # Root layout
└─ globals.css             # Global styles

components/                # Reusable components
lib/                      # Utility functions and configurations
```

## Route Groups

The project uses Next.js App Router with route groups to organize different user roles:

- **(public)**: Public pages accessible to all users
- **(mentor)**: Mentor-specific pages and dashboard
- **(mentee)**: Mentee-specific pages and dashboard  
- **(admin)**: Admin-specific pages and dashboard

## Path Aliases

Configured path aliases for cleaner imports:

- `@/components/*`: Import from components directory
- `@/lib/*`: Import from lib directory
- `@/styles/*`: Import from styles directory
- `@/*`: Import from root directory

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Role-based dashboards (Mentor, Mentee, Admin)
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Clean, scalable folder structure
- Modern Next.js App Router architecture

## Current Status

This is initial scaffold focusing on:
- Project initialization and configuration
- Route structure and layouts
- Basic placeholder pages
- Tailwind CSS setup

**Next phases will include:**
- Authentication system
- API integration
- Database setup
- Advanced UI components
- Real-time features

## License

This project is licensed under the MIT License.

# Mentorship Platform

## Overview
This is a modern mentorship platform built using **Next.js (App Router)** and **Tailwind CSS**. It provides an interface for distinct user roles to interact within the mentorship ecosystem.

## Features & Dashboards
The application structure is built with specific route groups dedicated to various roles:
- **Public**: The landing page and general public-facing information.
- **Mentor**: Dashboard and management tools for Mentors.
- **Mentee**: Dashboard and platform interaction for Mentees.
- **Admin**: System management and administrative overview.

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Linting & Formatting**: ESLint
- **Architecture**: Role-based layouts utilizing Next.js structural Route Groups.

## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `app/` - The Next.js App Router root containing all role-based dashboards and global configurations.
- `components/` - Shared UI components used across the application.
- `lib/` - Utility functions, configurations, and core application logging/logic.
- `styles/` - Additional styling extensions or base styles if needed beyond standard Tailwind utilities.

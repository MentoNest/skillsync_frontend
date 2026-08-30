import React from "react";
import type { ReactNode } from "react";
import MentorCard from "@/components/mentor/MentorCard";
import { AuthProvider } from "@/context/AuthContext";

const featuredMentor = {
  id: "alex-chen",
  name: "Alex Chen",
  title: "Senior Product Mentor",
  bio: "Helps early-career professionals build confident, strategic career momentum.",
  avatarUrl: "/avatars/alex.svg",
  skills: [
    { id: "skill-1", name: "Product Strategy" },
    { id: "skill-2", name: "Career Growth" },
    { id: "skill-3", name: "Leadership" },
    { id: "skill-4", name: "Mentoring" },
  ],
  industry: "Tech",
  rating: 4.9,
  reviewCount: 128,
  hourlyRate: 45,
  experienceLevel: "senior" as const,
  availability: "available" as const,
  isFeatured: true,
  popularity: 96,
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors">
      <a
        href="#auth-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <main
        id="auth-main"
        className="mx-auto flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_-20px_rgba(124,58,237,0.25)] lg:grid-cols-[minmax(0,1fr)_480px]">
          <div className="flex items-center justify-center bg-white p-5 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">{children}</div>
          </div>

          <aside className="hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 p-8 text-white lg:flex lg:flex-col lg:justify-center lg:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                <span className="text-base font-semibold">S</span>
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-violet-100">
                SkillSync
              </span>
            </div>

            <div className="mb-8">
              <MentorCard mentor={featuredMentor} />
            </div>

            <div className="space-y-4">
              <p className="text-3xl font-semibold leading-tight text-white">
                “Grow confidently with support from skilled mentors who care”
              </p>
              <div className="flex items-center gap-3 text-sm text-violet-100">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Trusted by 12k+ learners
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
    </AuthProvider>
  );
}
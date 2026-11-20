"use client";

import React from "react";
import StartDiscussionButton from "./StartDiscussionButton";

export interface CommunityHeroProps {
  onStartDiscussion?: () => void;
}

/**
 * Community hero banner component with brand gradient, heading, description,
 * and Start Discussion CTA (#1424).
 */
export default function CommunityHero({ onStartDiscussion }: CommunityHeroProps) {
  return (
    <section aria-label="Community Welcome Banner" className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 p-8 text-white shadow-xl md:p-12">
        {/* Subtle decorative background circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>18,000+ Active Learners & Mentors</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            SkillSync Community
          </h1>

          <p className="text-base text-purple-100 sm:text-lg md:leading-relaxed">
            Connect with experienced engineering mentors, ask technical questions,
            collaborate on open-source projects, and accelerate your career.
          </p>

          <div className="pt-2">
            <StartDiscussionButton
              variant="header"
              onClick={onStartDiscussion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

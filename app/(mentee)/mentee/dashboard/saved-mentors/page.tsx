"use client";

import { useState, useEffect } from "react";
import { Mentor } from "@/lib/mentor-types";
import MentorCard from "@/components/landing/MentorCard";

const MOCK_SAVED_MENTORS: Mentor[] = [
  {
    id: "1",
    name: "James Okafor",
    avatar: "",
    headline: "Staff Software Engineer · Meta",
    bio: "10+ years building distributed systems at scale.",
    skills: ["System Design", "Distributed Systems", "Go", "Kubernetes", "Career Growth"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 250,
    availability: "available",
    sessions: 320,
    profileHref: "/mentors/1",
  },
  {
    id: "2",
    name: "Aisha Nwosu",
    avatar: "",
    headline: "Principal Product Manager · Stripe",
    bio: "Turned 3 zero-to-one products into market leaders.",
    skills: ["Product Strategy", "0-to-1 Products", "Stakeholder Management", "Analytics"],
    industry: "Finance",
    experienceLevel: "principal",
    rating: 4.8,
    hourlyRate: 300,
    availability: "available",
    sessions: 210,
    profileHref: "/mentors/2",
  },
  {
    id: "3",
    name: "Marcus Liu",
    avatar: "",
    headline: "Lead UX Designer · Figma",
    bio: "Obsessed with craft and clarity.",
    skills: ["UX Research", "Design Systems", "Figma", "Prototyping", "Portfolio Review"],
    industry: "Technology",
    experienceLevel: "lead",
    rating: 4.9,
    hourlyRate: 200,
    availability: "busy",
    sessions: 175,
    profileHref: "/mentors/3",
  },
];

export default function SavedMentorsPage() {
  const [savedMentors, setSavedMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedMentors = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const stored = localStorage.getItem("bookmarkedMentors");
        if (stored) {
          const ids = JSON.parse(stored);
          const mentors = MOCK_SAVED_MENTORS.filter((m) => ids.includes(m.id));
          setSavedMentors(mentors);
        } else {
          setSavedMentors([]);
        }
      } catch (error) {
        console.error("Failed to load saved mentors:", error);
        setSavedMentors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedMentors();
  }, []);

  const handleRemoveBookmark = (mentorId: string) => {
    const updated = savedMentors.filter((m) => m.id !== mentorId);
    setSavedMentors(updated);
    localStorage.setItem("bookmarkedMentors", JSON.stringify(updated.map((m) => m.id)));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-slate-900">Saved Mentors</h1>
            <div className="text-sm text-slate-500">
              {savedMentors.length} mentor{savedMentors.length !== 1 ? "s" : ""} saved
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedMentors.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No saved mentors yet</h2>
            <p className="mt-2 text-slate-600 max-w-md mx-auto">
              Start exploring mentors and bookmark your favorites to see them here.
            </p>
            <a
              href="/mentee/mentors"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore mentors
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {savedMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                name={mentor.name}
                title={mentor.headline}
                description={mentor.bio}
                skills={mentor.skills}
                avatarInitials={mentor.name.split(" ").map((n) => n[0]).join("")}
                avatarColor="bg-gradient-to-br from-indigo-500 to-cyan-500"
                rating={mentor.rating}
                sessions={mentor.sessions}
                profileHref={mentor.profileHref}
              >
                <div className="mt-auto px-6 pb-6 flex gap-3">
                  <a
                    href={mentor.profileHref}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors"
                  >
                    View profile
                  </a>
                  <button
                    onClick={() => handleRemoveBookmark(mentor.id)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    aria-label={`Remove ${mentor.name} from saved mentors`}
                  >
                    Remove
                  </button>
                </div>
              </MentorCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
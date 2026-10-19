"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mentor } from "@/lib/mentor-types";

interface MentorProfileContentProps {
  mentor: Mentor;
}

export default function MentorProfileContent({ mentor }: MentorProfileContentProps) {
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const initials = mentor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Integrate with bookmark API
  };

  const availabilityConfig = {
    available: {
      label: "Available",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: "●",
    },
    busy: {
      label: "Limited Availability",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: "◐",
    },
    unavailable: {
      label: "Currently Unavailable",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: "○",
    },
  };

  const availability = availabilityConfig[mentor.availability] || availabilityConfig.available;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 flex-shrink-0">
              {mentor.avatar && !imageError ? (
                <Image
                  src={mentor.avatar}
                  alt={mentor.name}
                  fill
                  className="rounded-full object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{initials}</span>
                </div>
              )}
              
              {/* Availability badge */}
              <div className={`absolute bottom-0 right-0 px-2 py-1 rounded-full text-xs font-semibold border ${availability.color}`}>
                <span className="mr-1">{availability.icon}</span>
                {availability.label}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {mentor.name}
              </h1>
              <p className="text-lg text-slate-600 mb-4">{mentor.headline}</p>
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-900">
                    {mentor.rating.toFixed(1)}
                  </span>
                </div>

                {/* Sessions */}
                <div className="text-sm text-slate-600">
                  {mentor.sessions} sessions completed
                </div>

                {/* Industry */}
                <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                  {mentor.industry}
                </div>

                {/* Experience level */}
                <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium capitalize">
                  {mentor.experienceLevel}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 md:w-48">
              <button className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Book Session
              </button>
              <button
                onClick={handleBookmark}
                className={`w-full px-6 py-3 rounded-lg border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isBookmarked
                    ? "bg-rose-600 text-white border-rose-600 hover:bg-rose-700 focus:ring-rose-500"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-slate-500"
                }`}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {mentor.bio}
              </p>
            </section>

            {/* Skills Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Placeholder: Reviews Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Reviews</h2>
              <div className="text-center py-8 text-slate-500">
                <svg
                  className="mx-auto h-12 w-12 text-slate-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="text-sm">Reviews coming soon</p>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Stats Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-slate-200">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  ${mentor.hourlyRate}
                  <span className="text-lg text-slate-600 font-normal">/hour</span>
                </div>
                <p className="text-sm text-slate-600">Session rate</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Response time</span>
                  <span className="text-sm font-semibold text-slate-900">~24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Average rating</span>
                  <span className="text-sm font-semibold text-slate-900">{mentor.rating}/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total sessions</span>
                  <span className="text-sm font-semibold text-slate-900">{mentor.sessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Member since</span>
                  <span className="text-sm font-semibold text-slate-900">2024</span>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Book a Session
              </button>
            </div>

            {/* Placeholder: Availability Calendar */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Availability</h3>
              <div className="text-center py-8 text-slate-500">
                <svg
                  className="mx-auto h-12 w-12 text-slate-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm">Calendar integration coming soon</p>
              </div>
            </div>

            {/* Share Profile */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Share Profile</h3>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  Copy Link
                </button>
                <button className="p-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.46 6c-.85.38-1.76.64-2.72.75 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.82 4.82 0 0 0 15.44 4c-2.65 0-4.81 2.15-4.81 4.8 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.03-.42.72-.66 1.55-.66 2.43 0 1.67.85 3.14 2.14 4-.79-.02-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.27 3.86 4.71-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.43 3.36 4.57 3.4-1.68 1.31-3.79 2.09-6.08 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63.96-.69 1.8-1.56 2.46-2.55z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to mentors list */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <Link
            href="/mentors"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Mentors
          </Link>
        </div>
      </div>
    </div>
  );
}

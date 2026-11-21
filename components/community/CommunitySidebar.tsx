"use client";

import React from "react";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_STATS,
  UPCOMING_COMMUNITY_EVENTS,
  CommunityCategory,
} from "./communityData";

export interface CommunitySidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

/**
 * Responsive Community sidebar component with categories, upcoming events,
 * and community statistics (#1423, #1434, #1435, #1437).
 */
export default function CommunitySidebar({
  selectedCategory,
  onSelectCategory,
}: CommunitySidebarProps) {
  return (
    <aside aria-label="Community Sidebar" className="space-y-6">
      {/* 1. Community Stats Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Community Impact
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-purple-50 p-3">
            <p className="text-xl font-extrabold text-purple-700">
              {COMMUNITY_STATS.totalMembers.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-gray-600">Active Members</p>
          </div>
          <div className="rounded-lg bg-indigo-50 p-3">
            <p className="text-xl font-extrabold text-indigo-700">
              {COMMUNITY_STATS.activeDiscussions.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-gray-600">Discussions</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="text-xl font-extrabold text-emerald-700">
              {COMMUNITY_STATS.mentorsOnline}
            </p>
            <p className="text-xs font-medium text-gray-600">Mentors Online</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xl font-extrabold text-blue-700">
              {COMMUNITY_STATS.solutionsProvided.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-gray-600">Solutions Solved</p>
          </div>
        </div>
      </div>

      {/* 2. Categories Filter */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Topics & Categories
        </h2>
        <nav aria-label="Filter by Topic" className="mt-3 space-y-1">
          {COMMUNITY_CATEGORIES.map((category: CommunityCategory) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                aria-pressed={isSelected}
                aria-label={`Filter discussions by ${category.name}`}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-purple-100 text-purple-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isSelected
                      ? "bg-purple-200 text-purple-900"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.postCount}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Upcoming Community Events */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Upcoming Events
          </h2>
          <span className="text-xs font-semibold text-purple-600">Live Workshops</span>
        </div>

        <div className="mt-4 space-y-4">
          {UPCOMING_COMMUNITY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="group rounded-lg border border-gray-100 bg-gray-50 p-3.5 transition-colors hover:border-purple-200 hover:bg-purple-50/50"
            >
              <span className="inline-block rounded bg-purple-200 px-2 py-0.5 text-xs font-semibold text-purple-800">
                {event.date} • {event.time}
              </span>
              <h3 className="mt-1.5 text-sm font-bold text-gray-900 group-hover:text-purple-700">
                {event.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Speaker: {event.speaker} ({event.speakerRole})
              </p>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {event.attendeesCount} RSVPed
                </span>
                <button
                  type="button"
                  className="font-semibold text-purple-700 hover:text-purple-900"
                  aria-label={`RSVP to ${event.title}`}
                >
                  RSVP &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

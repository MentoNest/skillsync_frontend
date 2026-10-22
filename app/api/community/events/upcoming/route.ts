import { NextResponse } from "next/server";
import type { CommunityEvent } from "@/lib/community-types";

// Mock data for now - will be replaced with actual database
function inDays(days: number, hour = 17): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

const events: CommunityEvent[] = [
  {
    id: "event-1",
    title: "Community AMA: Breaking into Tech",
    description:
      "Live Q&A with senior engineers on landing your first role and growing your career.",
    date: inDays(2),
    endDate: inDays(2, 18),
    location: "Online",
    category: "career",
    attendeeCount: 128,
    isOnline: true,
  },
  {
    id: "event-2",
    title: "Mentor Office Hours",
    description:
      "Drop in for 1:1 guidance, portfolio feedback, and mentorship matching.",
    date: inDays(5),
    endDate: inDays(5, 19),
    location: "Online",
    category: "mentoring",
    attendeeCount: 64,
    isOnline: true,
  },
  {
    id: "event-3",
    title: "Build Together: System Design Session",
    description:
      "Collaborative deep dive into designing scalable systems with the community.",
    date: inDays(9),
    endDate: inDays(9, 20),
    location: "Online",
    category: "technical",
    attendeeCount: 92,
    isOnline: true,
  },
];

export async function GET() {
  return NextResponse.json({ events });
}

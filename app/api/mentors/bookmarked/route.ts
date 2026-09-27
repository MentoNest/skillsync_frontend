import { NextRequest, NextResponse } from "next/server";
import { Mentor } from "@/lib/mentor-types";

const MOCK_MENTORS: Mentor[] = [
  {
    id: "1",
    name: "James Okafor",
    avatar: "",
    headline: "Staff Software Engineer · Meta",
    bio: "10+ years building distributed systems at scale. I help engineers crack senior and staff-level interviews, improve system design skills, and navigate big-tech transitions.",
    skills: ["System Design", "Distributed Systems", "Go", "Kubernetes", "Career Growth"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 250,
    availability: "available",
    sessions: 320,
  },
  {
    id: "2",
    name: "Aisha Nwosu",
    avatar: "",
    headline: "Principal Product Manager · Stripe",
    bio: "Turned 3 zero-to-one products into market leaders. I mentor aspiring PMs and help experienced PMs move into leadership with a structured, data-informed approach.",
    skills: ["Product Strategy", "0-to-1 Products", "Stakeholder Management", "Analytics"],
    industry: "Finance",
    experienceLevel: "principal",
    rating: 4.8,
    hourlyRate: 300,
    availability: "available",
    sessions: 210,
  },
  {
    id: "3",
    name: "Marcus Liu",
    avatar: "",
    headline: "Lead UX Designer · Figma",
    bio: "Obsessed with craft and clarity. I help designers build strong portfolios, master design systems, and land roles at top-tier product companies.",
    skills: ["UX Research", "Design Systems", "Figma", "Prototyping", "Portfolio Review"],
    industry: "Technology",
    experienceLevel: "lead",
    rating: 4.9,
    hourlyRate: 200,
    availability: "busy",
    sessions: 175,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];

    const mentors = MOCK_MENTORS.filter((m) => ids.includes(m.id));

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching bookmarked mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarked mentors" },
      { status: 500 }
    );
  }
}
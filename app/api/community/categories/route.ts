import { NextResponse } from "next/server";
import { COMMUNITY_CATEGORIES } from "@/lib/community-types";

// Mock data for now - will be replaced with actual database
const categoryCounts: Record<string, number> = {
  general: 45,
  career: 32,
  technical: 28,
  mentoring: 19,
  announcements: 8,
};

const categoryDescriptions: Record<string, string> = {
  general: "General discussions and introductions",
  career: "Career growth, interviews, and job hunting",
  technical: "Engineering, tools, and technical questions",
  mentoring: "Mentorship tips and mentee/mentor matching",
  announcements: "Product updates and community news",
};

export async function GET() {
  const categories = COMMUNITY_CATEGORIES.map((category) => ({
    ...category,
    slug: category.id,
    description: categoryDescriptions[category.id] ?? "",
    discussionCount: categoryCounts[category.id] ?? 0,
  }));

  return NextResponse.json({ categories });
}

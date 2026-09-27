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
  {
    id: "4",
    name: "Priya Sharma",
    avatar: "",
    headline: "Senior Data Scientist · Netflix",
    bio: "Bridging ML and business impact at Netflix. I mentor data scientists on model deployment, stakeholder communication, and breaking into ML engineering.",
    skills: ["Machine Learning", "Python", "MLOps", "SQL", "Data Strategy"],
    industry: "Technology",
    experienceLevel: "senior",
    rating: 4.7,
    hourlyRate: 220,
    availability: "available",
    sessions: 142,
  },
  {
    id: "5",
    name: "David Torres",
    avatar: "",
    headline: "Engineering Manager · Shopify",
    bio: "From IC to EM in 18 months. I coach engineers transitioning into management, help EMs build high-performing teams, and work through common leadership challenges.",
    skills: ["Engineering Leadership", "Team Building", "1-on-1s", "Roadmapping"],
    industry: "Technology",
    experienceLevel: "lead",
    rating: 4.8,
    hourlyRate: 280,
    availability: "available",
    sessions: 198,
  },
  {
    id: "6",
    name: "Fatima Al-Rashid",
    avatar: "",
    headline: "Startup Founder & Angel Investor",
    bio: "Built and sold two startups. I work with founders on fundraising strategy, product-market fit, and building lean teams that punch above their weight.",
    skills: ["Fundraising", "GTM Strategy", "Product-Market Fit", "Pitch Decks"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 350,
    availability: "unavailable",
    sessions: 87,
  },
  {
    id: "7",
    name: "Sarah Chen",
    avatar: "",
    headline: "Senior Product Designer · Airbnb",
    bio: "Designing for trust and belonging at global scale. I help designers grow into leadership roles and build inclusive design practices.",
    skills: ["Product Design", "Design Systems", "User Research", "Accessibility", "Leadership"],
    industry: "Technology",
    experienceLevel: "senior",
    rating: 4.8,
    hourlyRate: 180,
    availability: "available",
    sessions: 156,
  },
  {
    id: "8",
    name: "Michael Johnson",
    avatar: "",
    headline: "Principal Engineer · Google",
    bio: "Building scalable infrastructure for billions of users. I mentor engineers on distributed systems, performance optimization, and technical leadership.",
    skills: ["Distributed Systems", "Go", "Kubernetes", "Site Reliability", "Architecture"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 320,
    availability: "busy",
    sessions: 245,
  },
  {
    id: "9",
    name: "Emily Watson",
    avatar: "",
    headline: "Engineering Director · Microsoft",
    bio: "Leading 200+ engineers across cloud and AI platforms. I coach technical leaders on strategy, culture, and organizational design.",
    skills: ["Engineering Leadership", "Cloud Architecture", "AI/ML", "Organizational Design"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.7,
    hourlyRate: 400,
    availability: "available",
    sessions: 98,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentor = MOCK_MENTORS.find((m) => m.id === id);

    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor" },
      { status: 500 }
    );
  }
}
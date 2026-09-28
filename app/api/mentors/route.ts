import { NextRequest, NextResponse } from "next/server";
import { Mentor, MentorFilters } from "@/lib/mentor-types";
import { normalizeHourlyRateRange } from "@/lib/hourly-rate";

const NUMERIC_QUERY_KEYS = ["minRating", "minHourlyRate", "maxHourlyRate"];

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
  {
    id: "10",
    name: "Dr. Elena Rostova",
    avatar: "",
    headline: "Director of Health Informatics · Mayo Clinic",
    bio: "Pioneering clinical AI and data systems. I mentor professionals transitioning into digital health, clinical data science, and biomedical software engineering.",
    skills: ["Healthcare IT", "Health Informatics", "Python", "Data Strategy", "Clinical Systems"],
    industry: "Healthcare",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 260,
    availability: "available",
    sessions: 110,
  },
  {
    id: "11",
    name: "Lucas Vance",
    avatar: "",
    headline: "VP of Supply Chain Engineering · Wayfair",
    bio: "Scaling logistics and high-volume e-commerce infrastructure. I help engineers master marketplace architecture, cart checkouts, and fulfillment services.",
    skills: ["E-commerce", "Distributed Systems", "Architecture", "Logistics", "Java"],
    industry: "E-commerce",
    experienceLevel: "lead",
    rating: 4.8,
    hourlyRate: 240,
    availability: "available",
    sessions: 185,
  },
  {
    id: "12",
    name: "Amara Diallo",
    avatar: "",
    headline: "EdTech Curriculum Director · Coursera",
    bio: "Designing pedagogy-driven learning tools and interactive coursework. I mentor curriculum developers, instructional designers, and educational technologists.",
    skills: ["EdTech", "Curriculum Design", "Learning Analytics", "Instructional Design"],
    industry: "Education",
    experienceLevel: "senior",
    rating: 4.9,
    hourlyRate: 190,
    availability: "available",
    sessions: 130,
  },
  {
    id: "13",
    name: "Kenji Sato",
    avatar: "",
    headline: "Principal Graphics Engine Programmer · Epic Games",
    bio: "20 years in real-time rendering and game physics. I coach game developers on low-level optimization, Vulkan/DirectX, and engine architecture.",
    skills: ["Game Development", "C++", "Unreal Engine", "Graphics Programming", "Shaders"],
    industry: "Gaming",
    experienceLevel: "principal",
    rating: 4.9,
    sessions: 215,
    hourlyRate: 270,
    availability: "busy",
  },
  {
    id: "14",
    name: "Maya Lin",
    avatar: "",
    headline: "Digital Content Strategy Lead · Spotify",
    bio: "Creator economy and multimedia streaming strategist. I help content teams scale podcast networks, licensing workflows, and editorial algorithms.",
    skills: ["Media Strategy", "Streaming Tech", "Audio Production", "Audience Growth"],
    industry: "Media",
    experienceLevel: "lead",
    rating: 4.8,
    sessions: 160,
    hourlyRate: 210,
    availability: "available",
  },
  {
    id: "15",
    name: "Samuel Green",
    avatar: "",
    headline: "Technology Director · Code for America",
    bio: "Civic technology advocate building public-benefit systems. I mentor software engineers and product managers wanting to make an impact in the social sector.",
    skills: ["Civic Tech", "Open Source", "Grant Strategy", "Community Tech", "Product Strategy"],
    industry: "Non-profit",
    experienceLevel: "senior",
    rating: 4.9,
    sessions: 140,
    hourlyRate: 175,
    availability: "available",
  },
];

function applyFilters(mentors: Mentor[], filters: MentorFilters): Mentor[] {
  let result = [...mentors];

  if (filters.expertise && filters.expertise.length > 0) {
    result = result.filter((m) =>
      filters.expertise!.some((e) => m.skills.some((s) => s.toLowerCase().includes(e.toLowerCase())))
    );
  }

  if (filters.experience && filters.experience.length > 0) {
    result = result.filter((m) => filters.experience!.includes(m.experienceLevel));
  }

  if (filters.industry && filters.industry.length > 0) {
    result = result.filter((m) =>
      filters.industry!.some((ind) => ind.toLowerCase() === m.industry.toLowerCase())
    );
  }

  if (filters.minRating) {
    result = result.filter((m) => m.rating >= filters.minRating!);
  }

  // #53: both bounds come from the shared normalizer, so a malformed or
  // inverted range is corrected here exactly as the UI corrects it.
  const rateRange = normalizeHourlyRateRange({
    min: filters.minHourlyRate,
    max: filters.maxHourlyRate,
  });

  if (rateRange.min !== undefined) {
    result = result.filter((m) => m.hourlyRate >= rateRange.min!);
  }

  if (rateRange.max !== undefined) {
    result = result.filter((m) => m.hourlyRate <= rateRange.max!);
  }

  if (filters.availability && filters.availability.length > 0) {
    result = result.filter((m) => filters.availability!.includes(m.availability));
  }

  if (filters.sortBy) {
    result.sort((a, b) => {
      const aVal = a[filters.sortBy! as keyof Mentor];
      const bVal = b[filters.sortBy! as keyof Mentor];
      const order = filters.sortOrder === "desc" ? -1 : 1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * order;
      }
      return String(aVal).localeCompare(String(bVal)) * order;
    });
  }

  return result;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const filters: MentorFilters = {};
    const arrayFilterKeys: (keyof MentorFilters)[] = [
      "expertise",
      "experience",
      "industry",
      "availability",
    ];

    arrayFilterKeys.forEach((key) => {
      const allValues = searchParams.getAll(key);
      if (allValues.length > 0) {
        const flattened = allValues
          .flatMap((val) => val.split(","))
          .map((s) => s.trim())
          .filter(Boolean);
        if (flattened.length > 0) {
          (filters as Record<string, unknown>)[key] = Array.from(new Set(flattened));
        }
      }
    });

    searchParams.forEach((value, key) => {
      if (
        key !== "page" &&
        key !== "limit" &&
        !arrayFilterKeys.includes(key as keyof MentorFilters)
      ) {
        if (NUMERIC_QUERY_KEYS.includes(key)) {
          // An empty numeric param means "no filter". Coercing it with
          // Number() first would turn "" into 0, which is a real bound and
          // would exclude every mentor.
          if (value.trim() === "") return;
          (filters as Record<string, unknown>)[key] = Number(value);
        } else {
          (filters as Record<string, unknown>)[key] = value;
        }
      }
    });

    const filtered = applyFilters(MOCK_MENTORS, filters);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const mentors = filtered.slice(start, start + limit);

    return NextResponse.json({
      mentors,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}
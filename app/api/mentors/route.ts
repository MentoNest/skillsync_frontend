import { NextRequest, NextResponse } from "next/server";
import { Mentor, MentorFilters } from "@/lib/mentor-types";
import { MOCK_MENTORS } from "@/lib/mock-mentors";

function applyFilters(mentors: Mentor[], filters: MentorFilters): Mentor[] {
  let result = [...mentors];

  if (filters.expertise && filters.expertise.length > 0) {
    result = result.filter((m) =>
      filters.expertise!.some((e) =>
        (m.expertise || []).some((tag) => tag.toLowerCase() === e.toLowerCase())
      )
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

  if (filters.maxHourlyRate) {
    result = result.filter((m) => m.hourlyRate <= filters.maxHourlyRate!);
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
        if (key === "minRating" || key === "maxHourlyRate") {
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

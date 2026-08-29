// Mentor listings API endpoint — serves the static directory with server-side
// filtering, sorting and pagination until the live backend is connected (#857).
import { NextRequest, NextResponse } from "next/server";
import { MENTOR_DIRECTORY } from "@/lib/mentor-directory";
import type { ExperienceLevel, Mentor, SortOption } from "@/types/mentor";

const EXPERIENCE_ORDER: Record<ExperienceLevel, number> = {
  junior: 0,
  mid: 1,
  senior: 2,
  principal: 3,
};

const SORTERS: Record<SortOption, (a: Mentor, b: Mentor) => number> = {
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.hourlyRate - b.hourlyRate,
  experience: (a, b) => EXPERIENCE_ORDER[b.experienceLevel] - EXPERIENCE_ORDER[a.experienceLevel],
  popularity: (a, b) => b.popularity - a.popularity,
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const expertise = searchParams.get("expertise")?.toLowerCase() ?? "";
  const experience = searchParams.get("experience") as ExperienceLevel | null;
  const minRate = Number(searchParams.get("minRate")) || 0;
  const maxRate = Number(searchParams.get("maxRate")) || Number.MAX_SAFE_INTEGER;
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const sortBy = (searchParams.get("sortBy") as SortOption | null) ?? "popularity";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 12));

  let results = MENTOR_DIRECTORY.filter((mentor) => {
    if (expertise && !mentor.skills.some((skill) => skill.name.toLowerCase() === expertise)) {
      return false;
    }
    if (experience && mentor.experienceLevel !== experience) {
      return false;
    }
    if (mentor.hourlyRate < minRate || mentor.hourlyRate > maxRate) {
      return false;
    }
    if (search) {
      const haystack = `${mentor.name} ${mentor.title} ${mentor.bio} ${mentor.skills
        .map((skill) => skill.name)
        .join(" ")}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }
    return true;
  });

  const sorter = SORTERS[sortBy] ?? SORTERS.popularity;
  results = [...results].sort(sorter);

  const total = results.length;
  const start = (page - 1) * limit;
  const mentors = results.slice(start, start + limit);

  // Small artificial delay so loading states are visible while the API is mocked.
  await new Promise((resolve) => setTimeout(resolve, 350));

  return NextResponse.json({ mentors, total, page, limit });
}
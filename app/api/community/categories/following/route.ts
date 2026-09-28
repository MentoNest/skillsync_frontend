import { NextRequest, NextResponse } from "next/server";
import { COMMUNITY_CATEGORIES } from "@/lib/community-types";
import { listFollowedCategories, resolveViewerId } from "@/lib/community-store";

/**
 * GET /api/community/categories/following -> ids of the categories the viewer
 * follows, in canonical display order (#1014). One request hydrates the whole
 * sidebar followed-state.
 */
export async function GET(request: NextRequest) {
  const viewerId = resolveViewerId(request);
  const categoryIds = listFollowedCategories(viewerId);
  const categories = COMMUNITY_CATEGORIES.filter((category) =>
    categoryIds.includes(category.id)
  );

  return NextResponse.json({
    categories,
    categoryIds,
    total: categoryIds.length,
  });
}

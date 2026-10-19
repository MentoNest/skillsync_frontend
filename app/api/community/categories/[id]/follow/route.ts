import { NextRequest, NextResponse } from "next/server";
import { isCommunityCategoryId } from "@/lib/community-types";
import {
  followCategory,
  isFollowingCategory,
  resolveViewerId,
  unfollowCategory,
} from "@/lib/community-store";

/**
 * GET    /api/community/categories/[id]/follow -> current follow state (#1014)
 * POST   /api/community/categories/[id]/follow -> follow the category
 * DELETE /api/community/categories/[id]/follow -> unfollow the category
 */
type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!isCommunityCategoryId(id)) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);

  return NextResponse.json({
    categoryId: id,
    isFollowing: isFollowingCategory(viewerId, id),
  });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!isCommunityCategoryId(id)) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);
  const wasFollowing = isFollowingCategory(viewerId, id);
  followCategory(viewerId, id);

  return NextResponse.json({
    categoryId: id,
    isFollowing: true,
    changed: !wasFollowing,
  });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!isCommunityCategoryId(id)) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);
  const wasFollowing = isFollowingCategory(viewerId, id);
  unfollowCategory(viewerId, id);

  return NextResponse.json({
    categoryId: id,
    isFollowing: false,
    changed: wasFollowing,
  });
}

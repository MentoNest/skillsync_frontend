import { NextRequest, NextResponse } from "next/server";
import {
  followUser,
  getMember,
  isFollowingUser,
  resolveViewerId,
  unfollowUser,
} from "@/lib/community-store";

/**
 * GET    /api/community/users/[id]/follow -> current follow state (#1015)
 * POST   /api/community/users/[id]/follow -> follow the member
 * DELETE /api/community/users/[id]/follow -> unfollow the member
 */
type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const viewerId = resolveViewerId(request);
  const member = getMember(id);

  if (!member) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    userId: id,
    isFollowing: isFollowingUser(viewerId, id),
    followerCount: member.followerCount,
  });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const viewerId = resolveViewerId(request);

  if (!getMember(id)) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (id === viewerId) {
    return NextResponse.json(
      { error: "You cannot follow yourself" },
      { status: 400 }
    );
  }

  const wasFollowing = isFollowingUser(viewerId, id);
  followUser(viewerId, id);

  return NextResponse.json({
    userId: id,
    isFollowing: true,
    // Lets the UI show "Followed" only on a real state change.
    changed: !wasFollowing,
  });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const viewerId = resolveViewerId(request);

  if (!getMember(id)) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const wasFollowing = isFollowingUser(viewerId, id);
  unfollowUser(viewerId, id);

  return NextResponse.json({
    userId: id,
    isFollowing: false,
    changed: wasFollowing,
  });
}

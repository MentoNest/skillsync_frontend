import { describe, it, expect } from "vitest";
import { buildCommentTree } from "@/lib/community-store";
import type { Comment } from "@/lib/community-types";

describe("buildCommentTree (#1010)", () => {
  it("nests replies under parents and keeps chronological order", () => {
    const flat: Comment[] = [
      {
        id: "c1",
        discussionId: "d1",
        content: "root",
        authorId: "u1",
        authorName: "A",
        likeCount: 0,
        createdAt: "2026-01-01T00:00:00.000Z",
        parentId: null,
      },
      {
        id: "c2",
        discussionId: "d1",
        content: "reply",
        authorId: "u2",
        authorName: "B",
        likeCount: 0,
        createdAt: "2026-01-01T01:00:00.000Z",
        parentId: "c1",
      },
      {
        id: "c3",
        discussionId: "d1",
        content: "second root",
        authorId: "u3",
        authorName: "C",
        likeCount: 0,
        createdAt: "2026-01-01T02:00:00.000Z",
        parentId: null,
      },
    ];
    const tree = buildCommentTree(flat);
    expect(tree).toHaveLength(2);
    expect(tree[0]!.id).toBe("c1");
    expect(tree[0]!.replies).toHaveLength(1);
    expect(tree[0]!.replies![0]!.id).toBe("c2");
    expect(tree[1]!.id).toBe("c3");
  });
});

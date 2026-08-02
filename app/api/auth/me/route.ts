import { NextResponse } from "next/server";

function decodeToken(
  token: string,
): { userId: string; email: string; role: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (decoded?.userId) return decoded;
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const payload = decodeToken(token);
  if (!payload) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({
    id: payload.userId,
    email: payload.email,
    name:
      payload.email === "admin@skillsync.com"
        ? "Admin User"
        : payload.email === "mentor@skillsync.com"
          ? "Mentor User"
          : "Demo User",
    role: payload.role,
  });
}

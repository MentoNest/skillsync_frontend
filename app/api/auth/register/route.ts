import { NextResponse } from "next/server";

let nextId = 4;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const id = String(nextId++);
    const token = Buffer.from(
      JSON.stringify({ userId: id, email, role: "user" }),
    ).toString("base64");

    return NextResponse.json({
      user: { id, email, name, role: "user" as const },
      token,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}

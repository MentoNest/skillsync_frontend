import { NextResponse } from 'next/server';

const MOCK_USERS: Array<{ id: string; email: string; password: string; name: string; role: 'user' | 'mentor' | 'admin' }> = [
  {
    id: '1',
    email: 'demo@skillsync.com',
    password: 'password123',
    name: 'Demo User',
    role: 'user',
  },
  {
    id: '2',
    email: 'mentor@skillsync.com',
    password: 'password123',
    name: 'Mentor User',
    role: 'mentor',
  },
  {
    id: '3',
    email: 'admin@skillsync.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email, role: user.role })).toString('base64');

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 },
    );
  }
}

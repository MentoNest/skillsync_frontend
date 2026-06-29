import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for discussions (replace with actual database in production)
let discussions: any[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: { id: '1', name: 'Sarah Johnson', avatarUrl: '/avatars/sarah.svg' },
    category: 'career',
    content: 'I have been working as a graphic designer for 3 years and want to transition to UX design. What steps should I take?',
    createdAt: new Date('2025-06-25').toISOString(),
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    isTrending: true,
    tags: ['ux-design', 'career-change'],
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: { id: '2', name: 'Mike Chen', avatarUrl: '/avatars/john.svg' },
    category: 'technical',
    content: 'Looking for recommendations on the best courses and certifications for cloud computing, specifically AWS and Azure.',
    createdAt: new Date('2025-06-27').toISOString(),
    likeCount: 18,
    commentCount: 8,
    viewCount: 92,
    isTrending: false,
    tags: ['cloud', 'aws', 'azure'],
  },
  {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    author: { id: '3', name: 'Emily Rodriguez', avatarUrl: '/avatars/jane.svg' },
    category: 'career',
    content: 'I have been with my company for 2 years and have consistently exceeded my goals. Any advice on how to approach a salary negotiation?',
    createdAt: new Date('2025-06-28').toISOString(),
    likeCount: 31,
    commentCount: 23,
    viewCount: 203,
    isTrending: true,
    tags: ['salary', 'negotiation'],
  },
  {
    id: '4',
    title: 'How to build a personal brand as a developer',
    author: { id: '4', name: 'James Wilson', avatarUrl: '/avatars/john.svg' },
    category: 'general',
    content: 'I want to establish myself as an expert in my field. What are the best ways to build a personal brand as a software developer?',
    createdAt: new Date('2025-06-26').toISOString(),
    likeCount: 42,
    commentCount: 15,
    viewCount: 178,
    isTrending: false,
    tags: ['personal-brand', 'developer'],
  },
];

export async function GET() {
  return NextResponse.json(discussions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, content } = body;

    // Validate required fields
    if (!title || !category || !content) {
      return NextResponse.json(
        { message: 'Title, category, and content are required' },
        { status: 400 }
      );
    }

    // Create new discussion
    const newDiscussion = {
      id: String(discussions.length + 1),
      title,
      category,
      content,
      author: {
        id: 'current-user',
        name: 'Current User',
        avatarUrl: '/avatars/john.svg',
      },
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      isTrending: false,
      tags: [],
    };

    discussions.unshift(newDiscussion);

    return NextResponse.json(newDiscussion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

'use client';

import React from 'react';
import Link from 'next/link';
import { DiscussionCommentsSection } from '@/components/community/DiscussionCommentsSection';

interface PageProps {
  params: Promise<{ discussionId: string }>;
}

export default function DiscussionDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const discussionId = resolvedParams.discussionId;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Link href="/community" className="text-xs text-blue-600 hover:underline">
        ← Back to Discussions
      </Link>

      <article className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
            Discussion
          </span>
          <span className="text-xs text-gray-500">ID: {discussionId}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Building Scalable Frontend Architectures with Next.js & TypeScript
        </h1>

        <div className="flex items-center gap-3 text-xs text-gray-600 border-b pb-4">
          <span className="font-medium text-gray-900">By Community Author</span>
          <span>•</span>
          <span>Posted 3 hours ago</span>
          <span>•</span>
          <span>12 Replies</span>
        </div>

        <div className="prose text-sm text-gray-700 leading-relaxed">
          <p>
            When building large-scale frontend applications, modular component structure, clean routing,
            and optimistic UI updates are key to maintaining performance and developer velocity.
          </p>
        </div>
      </article>

      <DiscussionCommentsSection />
    </div>
  );
}

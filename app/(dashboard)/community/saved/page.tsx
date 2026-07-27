'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { DiscussionMetadata } from '@/lib/community-types';
import DiscussionCard from '@/components/community/DiscussionCard';
import Link from 'next/link';

export default function SavedDiscussionsPage() {
  const router = useRouter();
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch('/api/discussions');
        if (response.ok) {
          const data = await response.json();
          const allDiscussions: DiscussionMetadata[] = data;
          setDiscussions(allDiscussions.filter((d: DiscussionMetadata) => d.isBookmarked));
        }
      } catch (error) {
        console.error('Failed to fetch discussions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const handleRemoveBookmark = (id: string) => {
    setDiscussions((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Saved Discussions</h1>
          <p className="mt-3 text-gray-600">
            Your bookmarked discussions in one place.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-gray-500">Loading saved discussions...</div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">No saved discussions yet</h2>
            <p className="mt-2 text-gray-500">
              Browse the community and bookmark discussions to read later.
            </p>
            <div className="mt-6">
              <Link
                href="/community"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Browse Discussions
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                onBookmark={() => handleRemoveBookmark(discussion.id)}
                onClick={(id) => {
                  router.push(`/community/${id}`);
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SavedDiscussion {
  id: string;
  title: string;
  author: string;
  category: string;
  savedAt: string;
}

export default function SavedDiscussionsPage() {
  const [savedDiscussions, setSavedDiscussions] = useState<SavedDiscussion[]>([
    {
      id: 'd1',
      title: 'Architecting Scalable Microservices with NestJS and Event-Driven Architecture',
      author: 'Jane Doe',
      category: 'Backend',
      savedAt: '2 days ago',
    },
    {
      id: 'd2',
      title: 'Mastering React 19 Compiler and Server Components for Next-Gen Web Apps',
      author: 'John Smith',
      category: 'Frontend',
      savedAt: '1 week ago',
    },
  ]);

  const removeSaved = (id: string) => {
    setSavedDiscussions((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Saved Discussions</h1>
      <p className="text-gray-600 text-sm mb-6">
        View and manage your bookmarked discussions for quick offline or future reading.
      </p>

      {savedDiscussions.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm mb-3">You have no saved discussions yet.</p>
          <Link
            href="/community"
            className="text-xs bg-blue-600 text-white px-3 py-2 rounded font-semibold hover:bg-blue-700"
          >
            Explore Discussions
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedDiscussions.map((d) => (
            <div
              key={d.id}
              className="p-4 border rounded-lg bg-white shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium mr-2">
                  {d.category}
                </span>
                <Link
                  href={`/community/discussions/${d.id}`}
                  className="font-semibold text-gray-900 hover:text-blue-600"
                >
                  {d.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  By {d.author} • Saved {d.savedAt}
                </div>
              </div>

              <button
                onClick={() => removeSaved(d.id)}
                className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 border rounded hover:bg-red-50"
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

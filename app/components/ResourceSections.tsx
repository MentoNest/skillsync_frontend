"use client";

import Link from "next/link";

export default function ResourceSections() {
  return (
    <div className="space-y-10">
      {/* Learning Tracks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Learning Tracks</h2>
          <Link
            href="/resources/tracks"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            View All
          </Link>
        </div>
        {/* ...render featured tracks here... */}
      </div>

      {/* Articles Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Articles</h2>
          <Link
            href="/resources/articles"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            View All
          </Link>
        </div>
        {/* ...render featured articles here... */}
      </div>
    </div>
  );
}

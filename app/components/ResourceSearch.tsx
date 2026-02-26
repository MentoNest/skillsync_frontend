"use client";

import React, { useState, useMemo } from "react";
import debounce from "lodash.debounce";

interface LearningTrack {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  hours: number;
}

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
}

interface ResourceSearchProps {
  tracks: LearningTrack[];
  articles: Article[];
}

export default function ResourceSearch({ tracks, articles }: ResourceSearchProps) {
  const [query, setQuery] = useState("");

  // Debounced setter
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value.toLowerCase());
      }, 300),
    []
  );

  const filteredTracks = useMemo(() => {
    if (!query) return tracks;
    return tracks.filter((track) =>
      track.title.toLowerCase().includes(query)
    );
  }, [query, tracks]);

  const filteredArticles = useMemo(() => {
    if (!query) return articles;
    return articles.filter((article) =>
      article.title.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  }, [query, articles]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search resources..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Filtered Tracks */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Learning Tracks</h2>
        {filteredTracks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTracks.map((track) => (
              <li key={track.id} className="p-3 border rounded-md">
                <span className="font-bold">{track.title}</span> — {track.lessons} lessons, {track.hours} hours
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">No tracks match your search.</p>
        )}
      </div>

      {/* Filtered Articles */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Articles</h2>
        {filteredArticles.length > 0 ? (
          <ul className="space-y-2">
            {filteredArticles.map((article) => (
              <li key={article.id} className="p-3 border rounded-md">
                <span className="font-bold">{article.title}</span> — {article.author} ({article.category})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">No articles match your search.</p>
        )}
      </div>
    </div>
  );
}

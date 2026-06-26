'use client';

import React, { useState } from 'react';

export default function ResourceSearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search action or navigate to resources page with query
    console.log('Searching for resources matching:', query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <label htmlFor="resource-search" className="sr-only">
          Search learning resources, guides, and templates
        </label>
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Input field */}
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search learning tracks, articles, tools, and templates..."
            className="block w-full p-4 pl-12 pr-28 text-sm md:text-base text-gray-900 border border-gray-200 rounded-full bg-white shadow-sm hover:border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500/20 transition-all outline-none"
          />
          {/* Action button inside input */}
          <button
            type="submit"
            className="absolute right-2 top-1.5 bottom-1.5 px-6 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-full transition-all cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

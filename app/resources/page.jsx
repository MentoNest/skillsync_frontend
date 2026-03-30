"use client";

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import ResourcesHero from '../../components/ResourcesHero';

function ResourcesPageContent() {
  const searchParams = useSearchParams();
  const incomingQuery = searchParams.get('query') ?? '';
  const [query, setQuery] = useState(incomingQuery);

  useEffect(() => {
    setQuery(incomingQuery);
  }, [incomingQuery]);

  const trimmedQuery = useMemo(() => query.trim(), [query]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10 sm:-mt-12 lg:-mt-14">
        <div className="relative w-full max-w-3xl mx-auto">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={22}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for resources, courses, guides..."
            aria-label="Search learning resources"
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-base text-slate-700 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p>This page will host curated learning resources, guides, and tutorials.</p>
          {trimmedQuery ? (
            <p className="mt-3 text-sm text-gray-500">
              Searching for: <span className="font-medium text-gray-700">{trimmedQuery}</span>
            </p>
          ) : null}
      
      {/* Quick Access Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600">Official guides and API references</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600">Step-by-step video guides</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Books & Articles</h3>
            <p className="text-gray-600">Recommended reading list</p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">Join discussions and forums</p>
          </div>
        </div>
      </section>
      
      {/* Learning Tracks Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Learning Tracks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Track 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <h3 className="text-2xl font-bold text-white">Beginner Track</h3>
                <p className="text-purple-100 mt-2">Start your journey here</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Introduction to Mentorship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Setting Goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Building Communication Skills</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Track 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <h3 className="text-2xl font-bold text-white">Intermediate Track</h3>
                <p className="text-purple-100 mt-2">Level up your skills</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Advanced Strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Peer Mentoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Feedback Techniques</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Track 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <h3 className="text-2xl font-bold text-white">Advanced Track</h3>
                <p className="text-purple-100 mt-2">Master the craft</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Leadership Development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Program Management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700">Scaling Mentorship</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tools & Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tool 1 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Progress Tracker</h3>
            </div>
            <p className="text-gray-600 flex-grow">Monitor your learning progress and milestones</p>
          </div>
          
          {/* Tool 2 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Session Planner</h3>
            </div>
            <p className="text-gray-600 flex-grow">Plan and schedule your mentorship sessions</p>
          </div>
          
          {/* Tool 3 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 003.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Goal Setter</h3>
            </div>
            <p className="text-gray-600 flex-grow">Define and track your mentorship goals</p>
          </div>
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">More Coming Soon</h2>
            <p className="max-w-2xl mx-auto">
              This page will host additional curated learning resources, guides, and tutorials.
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ResourcesPage() {
  return (
    <main className="bg-gray-100">
      <ResourcesHero />
      <Suspense fallback={<section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-gray-500">Loading resources...</section>}>
        <ResourcesPageContent />
      </Suspense>
    </main>
  );
}

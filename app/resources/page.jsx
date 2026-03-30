"use client";

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, BookOpen, Video, FileText, Users, Star, ArrowRight, Zap, Target, BookMarked, Layers } from 'lucide-react';
import Link from 'next/link';
import ResourcesHero from '../../components/ResourcesHero';
import LargeToolCard from '../../components/LargeToolCard';
import { ResourceSkleteonContainer } from '../../components/ResourceSkeletons';

// Mock Data
const QUICK_ACCESS = [
  { icon: FileText, title: "Documentation", description: "Official guides and API references", color: "purple" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step video guides", color: "purple" },
  { icon: BookOpen, title: "Books & Articles", description: "Recommended reading list", color: "purple" },
  { icon: Users, title: "Community", description: "Join discussions and forums", color: "purple" },
];

const LEARNING_TRACKS = [
  {
    title: "Beginner Track",
    subtitle: "Start your journey here",
    items: ["Introduction to Mentorship", "Setting Goals", "Building Communication Skills"]
  },
  {
    title: "Intermediate Track",
    subtitle: "Level up your skills",
    items: ["Advanced Strategies", "Peer Mentoring", "Feedback Techniques"]
  },
  {
    title: "Advanced Track",
    subtitle: "Master the craft",
    items: ["Leadership Development", "Program Management", "Scaling Mentorship"]
  }
];

const FEATURED_TOOLS = [
  {
    icon: Zap,
    title: "Progress Tracker",
    description: "Monitor your learning progress and milestones across all your active courses and mentorship tracks.",
    buttonText: "Launch Tracker",
    gradient: "from-blue-600 to-indigo-700"
  },
  {
    icon: Target,
    title: "Goal Setter",
    description: "Define and track your mentorship goals with our smart goal-setting framework tailored for career growth.",
    buttonText: "Set New Goals",
    gradient: "from-purple-600 to-pink-600"
  }
];

const RESOURCES = [
  { icon: Layers, title: "Session Planner", description: "Plan and schedule your mentorship sessions efficiently.", type: "Article" },
  { icon: BookMarked, title: "Resource Library", description: "Access a curated collection of ebooks and case studies.", type: "Article" },
  { icon: Star, title: "Expert Guides", description: "Deep dives into specialized industry topics by verified mentors.", type: "Article" }
];

function ResourcesPageContent() {
  const searchParams = useSearchParams();
  const incomingQuery = searchParams.get('query') ?? '';
  const [query, setQuery] = useState(incomingQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setQuery(incomingQuery);
  }, [incomingQuery]);

  // Debounced search logic simulation
  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const trimmedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  // Filter Logic
  const filteredTracks = useMemo(() => 
    LEARNING_TRACKS.filter(track => 
      track.title.toLowerCase().includes(trimmedQuery) || 
      track.subtitle.toLowerCase().includes(trimmedQuery) ||
      track.items.some(item => item.toLowerCase().includes(trimmedQuery))
    ), [trimmedQuery]);

  const filteredResources = useMemo(() => 
    RESOURCES.filter(res => 
      res.title.toLowerCase().includes(trimmedQuery) || 
      res.description.toLowerCase().includes(trimmedQuery)
    ), [trimmedQuery]);

  const filteredQuickAccess = useMemo(() => 
    QUICK_ACCESS.filter(item => 
      item.title.toLowerCase().includes(trimmedQuery) ||
      item.description.toLowerCase().includes(trimmedQuery)
    ), [trimmedQuery]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
        <div>
          <div className="h-10 bg-gray-200 rounded-full w-48 mb-8" />
          <ResourceSkleteonContainer type="quick" count={4} />
        </div>
        <div>
          <div className="h-10 bg-gray-200 rounded-full w-48 mb-8" />
          <ResourceSkleteonContainer type="track" count={3} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search Bar Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10 sm:-mt-12 lg:-mt-14 relative z-20">
        <div className="relative w-full max-w-3xl mx-auto group">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isSearching ? 'text-purple-600' : 'text-slate-400'}`}
            size={22}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for resources, courses, guides..."
            aria-label="Search learning resources"
            className="w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md py-4 pl-12 pr-5 text-base text-slate-700 shadow-xl outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Quick Access</h2>
          {trimmedQuery && filteredQuickAccess.length === 0 && (
            <span className="text-sm text-gray-500">No results found for "{query}"</span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredQuickAccess.map((item, idx) => (
            <div key={idx} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <item.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Featured Tools</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_TOOLS.map((tool, idx) => (
            <LargeToolCard
              key={idx}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              buttonText={tool.buttonText}
              gradient={tool.gradient}
            />
          ))}
        </div>
      </section>
      
      {/* Learning Tracks Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Learning Tracks</h2>
            <Link 
              href="/resources/tracks" 
              className="group flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors"
            >
              View All Tracks
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {filteredTracks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredTracks.map((track, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col hover:border-purple-200 transition-colors">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
                    <h3 className="text-2xl font-bold text-white">{track.title}</h3>
                    <p className="text-purple-100 mt-2 font-light">{track.subtitle}</p>
                  </div>
                  <div className="p-8 flex-grow">
                    <ul className="space-y-4">
                      {track.items.map((item, i) => (
                        <li key={i} className="flex items-start group/item">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xs mr-3 font-bold group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors">
                            {i + 1}
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 pt-0 mt-auto">
                    <button className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-semibold hover:border-purple-600 hover:text-purple-600 transition-all">
                      Continue Path
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
               <p className="text-gray-500">No tracks match your search query.</p>
             </div>
          )}
        </div>
      </section>
      
      {/* Articles & Resources Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Articles & Guides</h2>
          <Link 
            href="/resources/articles" 
            className="group flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res, idx) => (
              <div key={idx} className="flex flex-col bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-2xl hover:border-purple-200 transition-all group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <res.icon className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">{res.type}</span>
                    <h3 className="text-lg font-bold text-gray-900">{res.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 flex-grow leading-relaxed mb-6">{res.description}</p>
                <Link href="#" className="inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                  Read Article <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-200">
             <p className="text-gray-500">No articles found.</p>
          </div>
        )}
      </section>
      
      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-purple-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-purple-200 mb-8 max-w-xl mx-auto">Suggest a resource or topic you'd like to learn more about, and we'll work with our mentors to create content for it.</p>
            <button className="bg-white text-purple-900 font-bold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-colors shadow-lg">
              Suggest Resource
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ResourcesPage() {
  return (
    <main className="bg-white min-h-screen">
      <ResourcesHero />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4" />
          <p className="text-slate-500">Wait a moment, we're preparing your resources...</p>
        </div>
      }>
        <ResourcesPageContent />
      </Suspense>
    </main>
  );
}

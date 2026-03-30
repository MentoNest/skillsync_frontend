import ArticleListItem from "@/app/components/ArticleList";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Resources | SkillSync",
  description: "Explore curated learning resources to boost your skills.",
};



const articles = [
  {
    id: 1,
    category: "Career Growth",
    title: "How to Negotiate Your Salary Like a Pro",
    author: "Sarah Johnson",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Personal Branding",
    title: "Building a Personal Brand on LinkedIn",
    author: "Marcus Williams",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Career Change",
    title: "Transitioning to Tech: A Complete Guide",
    author: "Emily Chen",
    readTime: "10 min read",
  },
];



export default function LearningResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-purple-700 via-purple-600 to-violet-500 py-20 px-6"
        aria-labelledby="resources-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            id="resources-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Learning Resources
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Explore curated guides, tutorials, and tools handpicked to help you
            grow your skills, land opportunities, and connect with the right mentors.
          </p>
        </div>
      </section>

      {/* Resources Content */}
      <section
        className="max-w-7xl mx-auto px-6 py-16 space-y-20"
        aria-labelledby="resources-content-heading"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Resource categories">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm"
              aria-label={`Resource category ${i + 1}`}
            >
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" aria-hidden="true" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2" aria-hidden="true" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse mb-2" aria-hidden="true" />
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* Featured Articles Section */}
        <section aria-labelledby="featured-articles-heading">
          <header className="w-full flex items-center justify-between mb-7">
            <h2
              id="featured-articles-heading"
              className="text-[#101828] font-semibold text-lg md:text-2xl"
            >
              Featured Articles
            </h2>
            <Link
              href={"#"}
              className="text-[#9810FA] font-medium text-sm md:text-base flex items-center justify-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="View all featured articles"
            >
              View All
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </header>

          <ul className="space-y-4" role="list" aria-label="Featured articles list">
            {articles.map((article) => (
              <ArticleListItem
                key={article.id}
                category={article.category}
                title={article.title}
                author={article.author}
                readTime={article.readTime}
              />
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

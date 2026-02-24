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
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-violet-500 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Learning Resources
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Explore curated guides, tutorials, and tools handpicked to help you
            grow your skills, land opportunities, and connect with the right mentors.
          </p>
        </div>
      </section>

      {/* Placeholder Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm"
            >
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse mb-2" />
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>


        <ul className="space-y-4">

          <div className="w-full flex items-center justify-between mb-7 " >
            <h3 className="text-[#101828] font-semibold text-lg md:text-2xl  " >Featured Articles</h3>
            <Link href={"#"} className=" text-[#9810FA] font-medium text-sm md:text-base flex items-center justify-center " >View All <ArrowRight size={17} /> </Link>
          </div>

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
      </div>

      {/* Footer */}
      <footer className="w-full">
        <div className="bg-gradient-to-r from-[#4c0699] to-[#7a00e0] py-8 px-4 flex justify-center items-center border-t border-white/10">
          <p className="text-white/80 text-sm font-light tracking-wide">
            &copy; {currentYear} SkillSync. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

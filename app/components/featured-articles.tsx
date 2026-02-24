import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

type Article = {
  id: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
};

const articles: Article[] = [
  {
    id: "1",
    category: "Career Growth",
    title: "How to Negotiate Your Salary Like a Pro",
    author: "Sarah Johnson",
    readTime: "5 min read",
  },
  {
    id: "2",
    category: "Personal Branding",
    title: "Building a Personal Brand on LinkedIn",
    author: "Marcus Williams",
    readTime: "7 min read",
  },
  {
    id: "3",
    category: "Career Change",
    title: "Transitioning to Tech: A Complete Guide",
    author: "Emily Chen",
    readTime: "10 min read",
  },
];

export default function FeaturedArticles() {
  return (
    <section className="bg-[#FAF9F6] py-16 " style={{
  border: "0.73px solid #E5E7EB"
}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Articles
          </h2>
          <Link
            href="/resources"
            className="flex items-center gap-2 text-[#9810FA] font-medium hover:text-purple-700 transition-colors"
          >
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`group px-6 py-6 md:px-8 md:py-8 flex sm:flex-row flex-col sm:items-center justify-between gap-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                  index !== articles.length - 1 ? "border-b border-[#E5E7EB]" : ""
                }`}
              >
                <div className="space-y-3 flex-1 flex flex-col items-start w-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FAF5FF] text-[#9810FA] text-xs font-semibold whitespace-nowrap">
                    {article.category}
                  </span>
                  
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>By {article.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0 transition-transform duration-200 group-hover:-translate-y-1">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

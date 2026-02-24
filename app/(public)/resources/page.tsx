import ArticleListItem from "@/app/components/ArticleList";
import { ArrowRight, Download, Calendar, FileText, BarChart3, Users, Briefcase } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/app/components/ui";

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

      {/* Tools & Templates Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tools & Templates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our collection of career-building tools designed to accelerate your growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            icon={<Download size={28} color="#3b82f6" />}
            title="Resume Builder"
            description="Create professional resumes with our easy-to-use templates"
            buttonText="Get Started"
            gradient="linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)"
            buttonColor="#3b5bdb"
          />
          <ToolCard
            icon={<FileText size={28} color="#7c3aed" />}
            title="Cover Letter Generator"
            description="Craft compelling cover letters tailored to your target role"
            buttonText="Create Now"
            gradient="linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%)"
            buttonColor="#7c3aed"
          />
          <ToolCard
            icon={<Calendar size={28} color="#059669" />}
            title="Interview Scheduler"
            description="Coordinate interviews seamlessly with our scheduling tool"
            buttonText="Schedule"
            gradient="linear-gradient(135deg, #d1fae5 0%, #dcfce7 100%)"
            buttonColor="#059669"
          />
          <ToolCard
            icon={<BarChart3 size={28} color="#ea580c" />}
            title="Career Tracker"
            description="Monitor your progress with our career advancement tracker"
            buttonText="Track Progress"
            gradient="linear-gradient(135deg, #ffedd5 0%, #fef3c7 100%)"
            buttonColor="#ea580c"
          />
          <ToolCard
            icon={<Users size={28} color="#c026d5" />}
            title="Network Builder"
            description="Build and maintain your professional network"
            buttonText="Connect"
            gradient="linear-gradient(135deg, #f0abfc 0%, #e9d5ff 100%)"
            buttonColor="#c026d5"
          />
          <ToolCard
            icon={<Briefcase size={28} color="#db2777" />}
            title="Portfolio Creator"
            description="Showcase your work with our professional portfolio builder"
            buttonText="Build Portfolio"
            gradient="linear-gradient(135deg, #fbcfe8 0%, #fad3e8 100%)"
            buttonColor="#db2777"
          />
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

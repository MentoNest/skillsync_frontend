import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SkillSync?</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Discover a better way to learn and grow professionally.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Mentorship",
                  description: "Learn directly from professionals at top-tier companies.",
                  icon: "🚀"
                },
                {
                  title: "Project-Based Learning",
                  description: "Apply your skills with real-world projects and case studies.",
                  icon: "💻"
                },
                {
                  title: "Career Tracking",
                  description: "Monitor your progress and showcase your growth to employers.",
                  icon: "📈"
                }
              ].map((feature, index) => (
                <div key={index} className="p-8 glass rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} SkillSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

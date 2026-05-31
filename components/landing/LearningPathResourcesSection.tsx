import Link from 'next/link';

export default function LearningPathResourcesSection() {
  return (
    <section className="learning-path-resources bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">Learning & Growth</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Structured paths to accelerate your career journey
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Resource Card 1 */}
          <Link href="/resources/engineering-leadership" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9v2a2 2 0 002 2h2"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Engineering Leadership</h3>
              <p className="text-slate-600 text-center flex-1">
                Develop the skills to lead technical teams, drive architectural decisions, and transition from individual contributor to engineering management.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Resource Card 2 */}
          <Link href="/resources/product-management" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c0 1.105-1.34 2-3 2s-3-.895-3-2 .895-2 2-2 3 .895 3 2zM12 14c0 2.21-1.755 4-3 4s-3-1.79-3-4 1.755-4 3-4 3 1.79 3 4z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Product Management</h3>
              <p className="text-slate-600 text-center flex-1">
                Master product strategy, user research, roadmap planning, and execution to bring impactful products to market.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Resource Card 3 */}
          <Link href="/resources/data-science" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.5 5L12 10.5l4.5-5M12 15l-3-3m0 0l-3 3m3 3l3-3"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Data Science & Analytics</h3>
              <p className="text-slate-600 text-center flex-1">
                Build expertise in statistical analysis, machine learning, and data-driven decision making to solve complex business problems.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Resource Card 4 */}
          <Link href="/resources/design-ux" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3a2.086 2.086 0 011.415.592l.047.022M5 10a2 2 0 110-4h14a2 2 0 110 4H5zm5.5 3a2 2 0 100-4 2 2 0 000 4zM15 10.5a3 3 0 110-6 3 3 0 000 6zm-6 0a1.018 1.018 0 00.027-.004M15 10.5a3.01 3.01 0 01-2.121.879l-.707.707A1 1 0 006 11v2a1 1 0 001 1h8a1 1 0 001-1v-1.414"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Design & UX</h3>
              <p className="text-slate-600 text-center flex-1">
                Learn user-centered design principles, prototyping, and design systems to create intuitive and beautiful user experiences.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Resource Card 5 */}
          <Link href="/resources/business-strategy" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Business Strategy</h3>
              <p className="text-slate-600 text-center flex-1">
                Develop strategic thinking, financial acumen, and leadership skills to drive business growth and make impactful decisions.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
          
          {/* Resource Card 6 */}
          <Link href="/resources/career-growth" className="group">
            <div className="rounded-3xl border border-slate-200 p-8 hover:border-cyan-500 hover:bg-slate-100 transition-all flex flex-col items-center">
              <div className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h10l2-2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10l2-2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7v10a2 2 0 002 2h2a2 2 0 002-2v-2"/>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Career Growth & Navigation</h3>
              <p className="text-slate-600 text-center flex-1">
                Get guidance on promotions, career transitions, salary negotiation, and long-term professional development planning.
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 font-medium text-sm">
                Explore path
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link href="/resources" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-slate-900 transition hover:border-white/20 hover:bg-white/10">
            Browse all resources
            <svg className="ml-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
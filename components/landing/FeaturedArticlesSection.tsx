import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'How to prepare for an engineering promotion',
    excerpt: 'A practical checklist for demonstrating impact, leading projects, and building influence.',
    author: 'Kwame Asante',
    date: 'May 12, 2026',
    href: '/articles/promotion-checklist',
  },
  {
    id: 2,
    title: 'Design critiques that actually help',
    excerpt: 'Techniques for giving and receiving feedback that improves product outcomes.',
    author: 'Priya Menon',
    date: 'Apr 28, 2026',
    href: '/articles/design-critiques',
  },
  {
    id: 3,
    title: 'Running effective one-on-ones',
    excerpt: 'A manager’s guide to structure, follow-up, and career conversations.',
    author: 'Sara Lindqvist',
    date: 'Mar 9, 2026',
    href: '/articles/one-on-ones',
  },
];

export default function FeaturedArticlesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Insights</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Featured Articles</h2>
          </div>
          <Link href="/articles" className="text-sm font-medium text-cyan-600 hover:underline">
            View all →
          </Link>
        </div>

        <div className="divide-y divide-slate-100 rounded-md">
          {articles.map((a, i) => (
            <Link
              key={a.id}
              href={a.href}
              className="group block p-4 transition-colors hover:bg-slate-50"
            >
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>
                  <div className="mt-3 text-xs text-slate-400">{a.author} · {a.date}</div>
                </div>

                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import ArticleListItem from '@/components/ArticleListItem';

const allArticles = [
  {
    category: 'Productivity',
    title: 'How to build meaningful mentorship goals',
    author: 'Amina Patel',
    readTime: '6 min read',
    href: '/resources/article-mentorship-goals',
  },
  {
    category: 'Career Growth',
    title: 'Design your first structured learning path',
    author: 'Noah Kim',
    readTime: '8 min read',
    href: '/resources/article-learning-path',
  },
  {
    category: 'Leadership',
    title: 'Best practices for growing trust with mentees',
    author: 'Lena Torres',
    readTime: '5 min read',
    href: '/resources/article-mentee-trust',
  },
  {
    category: 'Career Growth',
    title: 'How to prepare for an engineering promotion',
    author: 'Kwame Asante',
    readTime: '7 min read',
    href: '/resources/article-engineering-promotion',
  },
  {
    category: 'Design',
    title: 'Design critiques that actually help',
    author: 'Priya Menon',
    readTime: '5 min read',
    href: '/resources/article-design-critiques',
  },
  {
    category: 'Leadership',
    title: 'Running effective one-on-ones',
    author: 'Sara Lindqvist',
    readTime: '6 min read',
    href: '/resources/article-one-on-ones',
  },
];

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">All Articles</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allArticles.map((article) => (
          <ArticleListItem key={article.title} {...article} />
        ))}
      </div>
    </div>
  );
}

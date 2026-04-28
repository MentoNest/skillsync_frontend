import { Metadata } from 'next';
import ArticleListItem from '@/components/ArticleListItem';

export const metadata: Metadata = {
  title: 'Articles | SkillSync',
  description: 'Browse all articles on SkillSync.',
};

const articles = [
  {
    category: 'Development',
    title: 'Getting Started with Next.js App Router',
    author: 'Jane Doe',
    readTime: '5 min read',
    href: '/articles/nextjs-app-router',
    isTrending: true,
  },
  {
    category: 'Design',
    title: 'Mastering Figma for UI/UX Designers',
    author: 'John Smith',
    readTime: '8 min read',
    href: '/articles/figma-ui-ux',
  },
  {
    category: 'Data Science',
    title: 'Introduction to Machine Learning with Python',
    author: 'Alice Johnson',
    readTime: '10 min read',
    href: '/articles/ml-python-intro',
  },
];

export default function ArticlesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h1>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <ArticleListItem key={index} {...article} />
        ))}
      </div>
    </main>
  );
}

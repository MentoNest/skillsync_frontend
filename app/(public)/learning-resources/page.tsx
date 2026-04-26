import ResourceCategoryCard from '@/components/ResourceCategoryCard';

const categories = [
  { title: 'Frontend Development', description: 'React, Next.js, CSS, and modern UI tooling.', icon: '💻', link: '/learning-resources/frontend' },
  { title: 'Backend Engineering', description: 'Node.js, databases, APIs, and server architecture.', icon: '🛠️', link: '/learning-resources/backend' },
  { title: 'Data Science', description: 'Python, statistics, and machine learning fundamentals.', icon: '📊', link: '/learning-resources/data-science' },
  { title: 'DevOps & Cloud', description: 'CI/CD, Docker, Kubernetes, and cloud platforms.', icon: '☁️', link: '/learning-resources/devops' },
  { title: 'Design & UX', description: 'Figma, user research, and design systems.', icon: '🎨', link: '/learning-resources/design' },
  { title: 'Soft Skills', description: 'Communication, leadership, and career growth.', icon: '🤝', link: '/learning-resources/soft-skills' },
];

export const metadata = {
  title: 'Learning Resources | SkillSync',
  description: 'Browse curated learning resources by category.',
};

export default function LearningResourcesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
        <p className="mt-2 text-gray-500 text-base">
          Explore hand-picked resources to grow your skills across all disciplines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <ResourceCategoryCard key={cat.link} {...cat} />
        ))}
      </div>
    </main>
  );
}

interface QuickAccessItem {
  icon: string;
  label: string;
  title: string;
  description: string;
}

const items: QuickAccessItem[] = [
  {
    icon: '📄',
    label: 'Resume Templates',
    title: 'Resume Templates',
    description: 'Professional templates to help you land your next role.',
  },
  {
    icon: '🎬',
    label: 'Video Tutorials',
    title: 'Video Tutorials',
    description: 'Step-by-step video guides from industry experts.',
  },
  {
    icon: '📚',
    label: 'Career Guides',
    title: 'Career Guides',
    description: 'In-depth resources to navigate your career path.',
  },
  {
    icon: '🛠️',
    label: 'Downloadable Tools',
    title: 'Downloadable Tools',
    description: 'Handy toolkits and templates you can use right away.',
  },
];

export default function QuickAccessSection() {
  return (
    <section className="py-10 px-4" aria-labelledby="quick-access-heading">
      <h2 id="quick-access-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Quick Access
      </h2>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
      >
        {items.map((item) => (
          <li key={item.title}>
            <div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-2 shadow hover:shadow-md hover:-translate-y-0.5 transition-all h-full"
            >
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

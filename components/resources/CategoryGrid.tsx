import { ChevronRightIcon } from './icons';
import { categories } from './categories-data';

export async function CategoryGrid() {
  const items = await categories;

  return (
    <section className="max-w-screen-xl px-4 py-12 mx-auto lg:py-16" aria-labelledby="categories-heading">
      <div className="mb-10 text-center md:text-left">
        <h2 id="categories-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Browse by Topic
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Select a category to view tutorials, templates, and learning paths.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((category) => (
          <article
            key={category.slug}
            className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-600 dark:text-purple-400">
                  {category.icon}
                </span>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {category.count}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {category.title}
              </h3>
              <p className="font-normal text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-750">
              <a
                href={`/resources/${category.slug}`}
                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 focus:outline-none focus:underline"
              >
                Explore Topic
                <ChevronRightIcon className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20 px-4 text-center sm:py-28 lg:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Learning Resources
          </h1>
          <p className="mb-8 text-lg font-normal text-purple-100 lg:text-xl sm:px-16 lg:px-48">
            Explore our curated collection of guides, tutorials, and tools to help you grow your skills and advance your career.
          </p>
        </div>
      </section>
      
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for resources items */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Frontend Development</h3>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Master the basics of HTML, CSS, and JavaScript.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Backend Engineering</h3>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Learn how to build scalable APIs and databases.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">UI/UX Design</h3>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Discover principles of good design and user research.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

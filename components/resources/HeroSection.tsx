export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-800 py-16 px-4 text-center sm:py-24 lg:px-6 shadow-md" aria-label="Resources Hero">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Learning Resources
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg font-normal text-purple-100/90 leading-relaxed">
          Explore our curated collection of guides, tutorials, and tools to help you grow your skills and advance your career.
        </p>
      </div>
    </section>
  );
}

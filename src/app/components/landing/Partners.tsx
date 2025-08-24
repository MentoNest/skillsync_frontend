export function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {/* Google */}
          <div className="text-gray-400 text-2xl md:text-3xl font-medium">
            Google
          </div>

          {/* Udemy */}
          <div className="text-gray-400 text-2xl md:text-3xl font-medium">
            Udemy
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
            <span className="text-2xl md:text-3xl font-medium">LinkedIn</span>
          </div>

          {/* Microsoft */}
          <div className="flex items-center gap-2 text-gray-400">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-gray-400 w-2.5 h-2.5"></div>
              <div className="bg-gray-400 w-2.5 h-2.5"></div>
              <div className="bg-gray-400 w-2.5 h-2.5"></div>
              <div className="bg-gray-400 w-2.5 h-2.5"></div>
            </div>
            <span className="text-2xl md:text-3xl font-medium">Microsoft</span>
          </div>
        </div>
      </div>
    </section>
  );
}

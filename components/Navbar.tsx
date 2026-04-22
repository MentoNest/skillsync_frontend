'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              SkillSync
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Explore
              </Link>
              <Link href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Mentors
              </Link>
              <Link href="#" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Resources
              </Link>
              <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

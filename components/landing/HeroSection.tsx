import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors" aria-label="Hero Section">
      <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 items-center">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Find Your Perfect Mentor
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            SkillSync helps you connect with experienced professionals to
            guide you on your career path.
          </p>
          <Link href="/register" className="inline-flex">
            <Button>Get Started</Button>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center animate-pulse">
            <span className="text-6xl font-bold text-cyan-600/40 dark:text-cyan-400/40">
              S²
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

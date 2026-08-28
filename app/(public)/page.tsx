import FeaturedMentorHighlight from "@/components/landing/FeaturedMentorHighlight";
import MentorDiscoverySection from "@/components/landing/MentorDiscoverySection";
import ExpertiseFilterSection from "@/components/landing/ExpertiseFilterSection";
import FeaturedArticlesSection from "@/components/landing/FeaturedArticlesSection";
import CTASection from "@/components/landing/CTASection";
import LearningPathSection from "@/components/landing/LearningPathSection";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function Home() {
  return (
    <main>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7 text-center lg:text-left">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Find Your Perfect Mentor
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Accelerate your career with personalized mentorship from industry
              experts.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1" />
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
              width={362}
              height={724}
              priority
              sizes="(max-width: 1024px) 0px, 362px"
            />
            {/* Fixed aspect ratio reserves space and prevents layout shift */}
            <div className="relative aspect-[362/724] w-full max-w-[280px]">
              <Image
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="SkillSync product mockup on a phone"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <MentorDiscoverySection />
      <ExpertiseFilterSection />
      <FeaturedArticlesSection />
      <FeaturedMentorHighlight />
      <CTASection />
    </main>
  );
}

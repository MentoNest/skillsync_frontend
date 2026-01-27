"use client";

import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="w-full">
      <div className="bg-purple-50">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12">
          <div className="relative w-full h-65 md:h-full">
            <Image
              src="/MentorshipCTA.png"
              alt="Mentorship session"
              fill
              className="object-cover rounded-2xl"
              priority
           />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Potential Can Be <br className="hidden sm:block" />
              Unlocked Today
            </h2>

            <p className="text-gray-600 mb-6 max-w-md">
              Join thousands of professionals who have accelerated their careers
              through personalized mentorship. Whether you&apos;re switching careers,
              advancing in your role, or learning new skills, we’re here to guide you.
            </p>

            <div>
              <button className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Get Started
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

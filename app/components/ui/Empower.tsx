"use client";

import { ReactNode } from "react";

const categories = [
  {
    id: 1,
    title: "Skills",
    items: [
      {
        name: "On-Demand Learning",
        description: "Access curated content and learn at your own pace",
      },
      {
        name: "Skill Assessments",
        description: "Track your progress with regular evaluations",
      },
      {
        name: "Live Workshops",
        description: "Join interactive sessions with experts",
      },
    ],
  },
  {
    id: 2,
    title: "Sync",
    items: [
      {
        name: "1-on-1 Sessions",
        description: "Get personalized guidance from your mentor",
      },
      {
        name: "Mentorship Plans",
        description: "Structured programs tailored to your goals",
      },
      {
        name: "Community Forum",
        description: "Connect with peers and share experiences",
      },
    ],
  },
  {
    id: 3,
    title: "Fit Coaching",
    items: [
      {
        name: "Career Planning",
        description: "Define your path with expert guidance",
      },
      {
        name: "Goal Setting",
        description: "Set and achieve meaningful objectives",
      },
      {
        name: "Progress Reviews",
        description: "Regular check-ins to keep you on track",
      },
    ],
  },
];

export default function EmpowerSection() {
  return (
    <section className="bg-white flex flex-col items-center px-8 py-16">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-slate-900 text-center leading-snug m-0">
        Empowering Your Growth Journey through
      </h2>
      <h2 className="text-4xl font-bold text-purple-600 text-center leading-snug mt-1 mb-10">
        a Unique Approach
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-8"
          >
            {/* Card Title */}
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              {category.title}
            </h3>

            {/* Feature Items */}
            <div className="flex flex-col gap-5">
              {category.items.map((item, idx) => (
                <div key={`${category.id}-${idx}`}>
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
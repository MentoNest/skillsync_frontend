import React from "react";
import {
  ArrowRightIcon,
  ResumeIcon,
  CareerIcon,
  type IconComponent,
} from "@/components/ui/icons";

type ToolCard = {
  title: string;
  description: string;
  ctaLabel: string;
  icon: IconComponent;
  gradient: string;
  ctaClass: string;
};

const toolCards: ToolCard[] = [
  {
    title: "Resume Builder",
    description:
      "Craft a standout resume with smart templates and guided prompts tailored to your target role.",
    ctaLabel: "Build your resume",
    icon: ResumeIcon,
    gradient: "bg-gradient-to-br from-primary-500 to-primary-700",
    ctaClass:
      "bg-white text-primary-700 hover:bg-gray-100 focus:ring-primary-300",
  },
  {
    title: "Career Planner",
    description:
      "Map out your career path with personalized milestones, skill tracks, and mentor check-ins.",
    ctaLabel: "Plan your career",
    icon: CareerIcon,
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-700",
    ctaClass:
      "bg-white text-indigo-700 hover:bg-gray-100 focus:ring-indigo-300",
  },
];

const ToolsTemplatesSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-20 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-12 lg:mb-16">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tools &amp; Templates
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
            Practical resources to help you build, plan, and accelerate your
            career.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {toolCards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div
                key={card.title}
                className={`flex flex-col justify-between rounded-2xl p-8 sm:p-10 shadow-lg ${card.gradient}`}
              >
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-white/20 text-white">
                    <CardIcon className="w-7 h-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mb-8 font-light text-white/80">
                    {card.description}
                  </p>
                </div>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center rounded-lg focus:ring-4 transition-colors ${card.ctaClass}`}
                >
                  {card.ctaLabel}
                  <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsTemplatesSection;

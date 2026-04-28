import { FileText, Map } from 'lucide-react';
import LargeToolCard from '@/components/LargeToolCard';

export default function ToolsAndTemplatesSection() {
  return (
    <section className="w-full bg-slate-50 py-16 md:py-24" aria-labelledby="tools-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2
            id="tools-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Tools & Templates
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Everything you need to accelerate your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          <LargeToolCard
            icon={FileText}
            title="Resume Builder"
            description="Create a polished, ATS-friendly resume tailored to your target role with our guided builder and expert-approved templates."
            buttonText="Build Resume"
            gradient="from-blue-500 to-indigo-600"
            onButtonClick={() => {
              window.location.href = '/tools/resume-builder';
            }}
          />

          <LargeToolCard
            icon={Map}
            title="Career Planner"
            description="Map out your career path with personalized milestones, skill gaps analysis, and actionable roadmaps curated by industry mentors."
            buttonText="Plan Career"
            gradient="from-emerald-500 to-teal-600"
            onButtonClick={() => {
              window.location.href = '/tools/career-planner';
            }}
          />
        </div>
      </div>
    </section>
  );
}

import { Target, Zap, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Personalized Matching",
    description:
      "Our AI-powered system matches you with mentors who align with your goals and industry.",
    accentBg: "bg-pink-50",
    accentIcon: "text-pink-500",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description:
      "Get quick responses from mentors and start your learning journey without delays.",
    accentBg: "bg-yellow-50",
    accentIcon: "text-yellow-500",
  },
  {
    icon: Briefcase,
    title: "Proven Results",
    description:
      "Join thousands of successful mentees who have achieved their career goals.",
    accentBg: "bg-indigo-50",
    accentIcon: "text-indigo-500",
  },
] as const;

export default function WhyChoose() {
  return (
    <section className="w-full bg-white py-responsive">
      <div className="container-responsive max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Why Choose <span className="text-[#9333ea]">SkillSync?</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Discover how SkillSync makes it easier to connect with the right
            mentors and grow faster.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 grid-responsive">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`mb-4 md:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full shadow-md flex-shrink-0 ${benefit.accentBg}`}
              >
                <benefit.icon className={`h-8 w-8 sm:h-9 sm:w-9 ${benefit.accentIcon}`} />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
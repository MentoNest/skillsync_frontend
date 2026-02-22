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
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Why Choose <span className="text-[#9333ea]">SkillSync?</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Discover how SkillSync makes it easier to connect with the right
            mentors and grow faster.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-md ${benefit.accentBg}`}
              >
                <benefit.icon className={`h-9 w-9 ${benefit.accentIcon}`} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


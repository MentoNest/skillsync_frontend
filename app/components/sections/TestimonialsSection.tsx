import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "SkillSync paired me with a senior engineer who completely changed my trajectory. Within 6 months I landed my first role at a FAANG company. The structured sessions and accountability made all the difference.",
    name: "Amara Osei",
    role: "Software Engineer · Google",
    avatar: "https://i.pravatar.cc/96?img=47",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "I'd tried other mentorship platforms but nothing stuck. SkillSync matched me with someone who had walked the exact path I wanted. The quality of mentors here is genuinely unmatched.",
    name: "Liam Nakamura",
    role: "Product Designer · Figma",
    avatar: "https://i.pravatar.cc/96?img=11",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "As a career-switcher from finance into data science, I needed real guidance — not just a course. My mentor gave me honest feedback and a clear roadmap. I've never felt so supported.",
    name: "Sofia Reyes",
    role: "Data Scientist · Stripe",
    avatar: "https://i.pravatar.cc/96?img=5",
    rating: 5,
  },
];

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amber-400"
    >
      <path d="M8 1l1.854 3.756L14 5.5l-3 2.924.708 4.126L8 10.5l-3.708 2.05L5 8.424 2 5.5l4.146-.744L8 1z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[oklch(0.129_0.042_264.695)]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[oklch(0.488_0.243_264.376)] opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[oklch(0.696_0.17_162.48)] opacity-8 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-[oklch(0.696_0.17_162.48)] mb-4">
            Success Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[oklch(0.984_0.003_247.858)] leading-tight">
            Mentees who made{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[oklch(0.488_0.243_264.376)]">the leap</span>
              <span
                className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[oklch(0.488_0.243_264.376)] opacity-60"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="mt-5 text-lg text-[oklch(0.704_0.04_256.788)]">
            Real outcomes from real people who invested in their growth with SkillSync.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="group relative flex flex-col rounded-2xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.208_0.042_265.755)] p-8 transition-all duration-300 hover:border-[oklch(0.488_0.243_264.376_/_40%)] hover:shadow-[0_0_40px_oklch(0.488_0.243_264.376_/_12%)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-6 right-8 text-7xl leading-none font-serif text-[oklch(0.488_0.243_264.376_/_15%)] select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-[oklch(0.84_0.012_255)] text-[0.9375rem] leading-relaxed mb-8">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[oklch(1_0_0_/_6%)]">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[oklch(0.488_0.243_264.376_/_30%)]">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[oklch(0.984_0.003_247.858)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[oklch(0.704_0.04_256.788)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "4.9/5", label: "Average mentor rating" },
            { value: "12k+", label: "Successful matches" },
            { value: "94%", label: "Goal achievement rate" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[oklch(0.984_0.003_247.858)]">
                {stat.value}
              </span>
              <span className="text-sm text-[oklch(0.704_0.04_256.788)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
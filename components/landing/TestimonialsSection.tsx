import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";

const TESTIMONIALS: (TestimonialCardProps & { featured?: boolean })[] = [
  {
    quote:
      "I had been stuck at senior engineer for two years. My mentor helped me map exactly what was missing, and three months later I moved into a staff role. The structure is what made it work.",
    name: "Daniel Okonkwo",
    role: "Senior Backend Engineer · Monzo",
    avatarInitials: "DO",
    avatarColor: "bg-gradient-to-br from-indigo-500 to-violet-600",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "Switching from teaching into product was daunting. Within six weeks I had a portfolio I was proud of and interviews lined up. Worth every penny.",
    name: "Hannah Weber",
    role: "Product Designer · Atlassian",
    avatarInitials: "HW",
    avatarColor: "bg-gradient-to-br from-rose-500 to-orange-400",
    rating: 5,
  },
  {
    quote:
      "As a founder I was drowning in hiring decisions. Two sessions with an experienced ops mentor gave me a scorecard my whole team now uses.",
    name: "Ravi Deshmukh",
    role: "Co-founder, Looply",
    avatarInitials: "RD",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
    rating: 4.5,
  },
  {
    quote:
      "The matching was surprisingly good. My first session felt like talking to someone who genuinely remembered being in my shoes. That is rare.",
    name: "Sofia Marchetti",
    role: "Data Analyst · Spotify",
    avatarInitials: "SM",
    avatarColor: "bg-gradient-to-br from-cyan-500 to-sky-500",
    rating: 5,
  },
  {
    quote:
      "I used the resources library before booking anything. The career planning templates alone saved me a week of guesswork.",
    name: "Amara Bello",
    role: "Frontend Developer · Stripe",
    avatarInitials: "AB",
    avatarColor: "bg-gradient-to-br from-amber-500 to-yellow-400",
    rating: 4.5,
  },
  {
    quote:
      "Booked a session the week before a big interview. The mock interview feedback was brutal and exactly what I needed.",
    name: "Kenji Tanaka",
    role: "Engineering Manager · LINE",
    avatarInitials: "KT",
    avatarColor: "bg-gradient-to-br from-pink-500 to-fuchsia-500",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-slate-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Loved by learners and mentors alike
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Real stories from people who used SkillSync to make their next career
            move.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

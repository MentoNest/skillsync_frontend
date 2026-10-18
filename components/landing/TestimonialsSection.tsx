import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";

/**
 * Placeholder testimonials.
 *
 * ⚠️ **These are invented.** The names, roles, companies, and quotes are
 * fabricated placeholder content, following the pattern already established in
 * `HeroSection` and `MentorDiscoverySection`, which do the same for their
 * mentor profiles. Replace them with real, attributed, consented quotes before
 * this ships: a fabricated testimonial attributes a specific opinion to a
 * specific named person who never gave it, which is a different kind of
 * placeholder than a fabricated hero headline.
 */
const TESTIMONIALS: TestimonialCardProps[] = [
  {
    name: "Sofia Reyes",
    role: "Backend Engineer · Nubank",
    quote:
      "I had been stuck on the same system design interview loop for six months. One session with a staff engineer who had been on the other side of that table changed how I structured every answer. I had two offers within a month.",
    initials: "SR",
    avatarColor: "bg-gradient-to-br from-indigo-500 to-violet-600",
    rating: 5,
    context: "Two offers in one month",
  },
  {
    name: "Kwame Boateng",
    role: "Product Manager · Jumia",
    quote:
      "My mentor did not give me a framework. She read the actual doc I was struggling with and showed me what a senior PM would cut from it. That is the difference between a course and a mentor.",
    initials: "KB",
    avatarColor: "bg-gradient-to-br from-amber-500 to-orange-500",
    rating: 4.9,
    context: "Promoted to senior PM",
  },
  {
    name: "Hannah Müller",
    role: "Data Analyst · Zalando",
    quote:
      "I switched careers from marketing and the hardest part was not the SQL — it was knowing whether I was learning the right things. Three sessions gave me a reading list and a project idea that actually got me hired.",
    initials: "HM",
    avatarColor: "bg-gradient-to-br from-rose-500 to-pink-500",
    rating: 4.8,
    context: "Career switcher, hired in 5 months",
  },
  {
    name: "Diego Fernández",
    role: "Senior SWE · Glovo",
    quote:
      "After my first promotion I completely stalled. My mentor had made the same jump two years earlier and told me the parts nobody writes about — which meetings to run, which to skip. Six months later I made staff.",
    initials: "DF",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
    rating: 5,
    context: "Promoted to staff engineer",
  },
  {
    name: "Ayesha Iqbal",
    role: "UX Designer · Careem",
    quote:
      "The portfolio review alone was worth a year of free tutorials. My mentor tore my case studies apart in the kindest possible way and rebuilt the narrative with me. Callbacks tripled.",
    initials: "AI",
    avatarColor: "bg-gradient-to-br from-sky-500 to-cyan-500",
    rating: 4.9,
    context: "Triple the interview callbacks",
  },
  {
    name: "Lucas Moreau",
    role: "Engineering Manager · Qonto",
    quote:
      "I was promoted to manage the team I used to be a peer on, and it was going badly. My mentor had done exactly that transition. Four sessions later my team's retro went from silent to honest.",
    initials: "LM",
    avatarColor: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
    rating: 4.8,
    context: "First-time manager",
  },
];

/**
 * Testimonials section (#1161).
 *
 * Six cards through the reusable `TestimonialCard` in a responsive
 * 1/2/3-column grid. Cards are `h-full` inside `items-stretch` so every card
 * in a row ends at the same depth — quote lengths differ enough that without
 * it the row reads ragged.
 */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            What people say after the sessions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Six learners, six different problems — each one matched with
            someone who had already solved it.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Learner testimonials"
        >
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.name} className="flex min-w-0">
              <TestimonialCard {...testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

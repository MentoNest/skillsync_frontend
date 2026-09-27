import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";

/**
 * Placeholder testimonials.
 *
 * ⚠️ **These are invented.** The names, roles, companies and quotes are
 * fabricated, following the pattern already established in `HeroSection` and
 * `MentorDiscoverySection`, which do the same for their mentor profiles.
 *
 * They must be replaced with real, attributed, consented quotes before this
 * ships. A fabricated testimonial is not a placeholder in the way a fabricated
 * hero headline is: it attributes a specific opinion to a specific named person
 * who never gave it, and on a mentorship platform the entire product claim is
 * that the people in it are real. See the note in the PR.
 */
const TESTIMONIALS: TestimonialCardProps[] = [
  {
    name: "Priya Nair",
    role: "Frontend Engineer · Razorpay",
    quote:
      "I had been stuck at mid-level for two years and every course taught me the same things I already knew. Ninety minutes with a staff engineer who had actually made the jump was worth more than the six months before it. She didn't give me a study plan — she gave me the specific review that had been holding me back.",
    initials: "PN",
    avatarColor: "bg-gradient-to-br from-indigo-500 to-violet-600",
    rating: 5,
    context: "Promoted within four months",
  },
  {
    name: "Tomás Oliveira",
    role: "Data Scientist · Nubank",
    quote:
      "What sold me was that my mentor would not let me skip the boring part. I wanted to talk about system design and we spent three sessions on SQL query plans instead. It was the least engaging and most useful thing that has happened to my career this year.",
    initials: "TO",
    avatarColor: "bg-gradient-to-br from-cyan-500 to-teal-500",
    rating: 4.8,
    context: "Twice-matched mentor",
  },
  {
    name: "Amara Diallo",
    role: "Product Manager · Wave",
    quote:
      "I switched to a mentor in a different industry on purpose, because I wanted someone who had solved my problem without my constraints. It made the advice much more useful. Matching on topic would have given me a comfortable, useless conversation.",
    initials: "AD",
    avatarColor: "bg-gradient-to-br from-rose-500 to-orange-400",
    rating: 5,
    context: "Moved from fintech to climate",
  },
  {
    name: "Ben Whitfield",
    role: "Engineering Manager · Atlassian",
    quote:
      "I was promoted into management with zero training and no idea what I was doing. My mentor's first question was what I was going to stop doing, not what I was going to start. That reframe is the reason my team still exists.",
    initials: "BW",
    avatarColor: "bg-gradient-to-br from-amber-500 to-yellow-400",
    rating: 4.8,
    context: "First-time manager",
  },
  {
    name: "Yuki Tanaka",
    role: "Mobile Engineer · Mercari",
    quote:
      "Session times are in my timezone and so is everyone I have been matched with. That sounds trivial until you have tried to book a mentor in San Francisco from Osaka, which is what every other platform I tried assumed.",
    initials: "YT",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-green-500",
    rating: 4.7,
    context: "Matched in under 24 hours",
  },
  {
    name: "Daniel Osei",
    role: "Security Engineer · Cloudflare",
    quote:
      "I did the free intro session first, mostly to test whether these people were real. The mentor referenced specific projects from their own career, not advice anyone could find in a blog post. After that I booked four more.",
    initials: "DO",
    avatarColor: "bg-gradient-to-br from-sky-500 to-blue-600",
    rating: 5,
    context: "Referred by a colleague",
  },
];

/**
 * Testimonials section.
 *
 * A `<section>` with an `aria-labelledby` heading, matching `HeroSection` and
 * `CTASection`. The grid is one column on the narrowest screens, two from
 * `sm`, three from `lg`.
 *
 * `TestimonialCard` is `h-full` and the grid stretches its rows, so the cards in
 * a row are equal height and the bottom border on the attribution line sits at
 * the same depth in all three. Without that the row looks ragged, because quote
 * lengths differ a lot — which is the main visual failure mode of testimonial
 * grids.
 */
export default function TestimonialsSection() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-4">
            From the community
          </span>

          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            What changed for them
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Six learners, six different problems. The one thing they have in
            common is that they each met someone who had already done the thing
            they were trying to do.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

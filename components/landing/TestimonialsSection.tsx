export default function TestimonialsSection() {
  return (
    <section className="testimonials bg-white py-20 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">Success stories</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Mentorship that helps people reach their next milestone.</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">“My mentor helped me define the skills I needed to land a senior position, and the weekly check-ins kept me accountable. I got the offer in three months.”</p>
            <p className="mt-6 font-semibold text-slate-950">Amina, Product Manager</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">“The feedback on my interview strategy was clear, practical, and immediately useful. The coaching gave me the edge I needed.”</p>
            <p className="mt-6 font-semibold text-slate-950">Daniel, Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

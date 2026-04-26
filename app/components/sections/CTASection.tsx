import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.984_0.003_247.858)] py-24 sm:py-32">
      {/* Layered background blobs */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.488 0.243 264.376) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.696 0.17 162.48) 0%, transparent 70%)",
        }}
      />

      {/* Geometric accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.488 0.243 264.376 / 30%), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.488_0.243_264.376_/_25%)] bg-[oklch(0.488_0.243_264.376_/_8%)] px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.696_0.17_162.48)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.696_0.17_162.48)]" />
          </span>
          <span className="text-xs font-medium text-[oklch(0.208_0.042_265.755)] tracking-wide">
            Now accepting new mentees · Limited spots available
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-[oklch(0.129_0.042_264.695)] leading-[1.05] mb-6">
          Your breakthrough
          <br />
          <span
            className="relative"
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.696 0.17 162.48))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            starts with one conversation.
          </span>
        </h2>

        <p className="mx-auto max-w-xl text-lg text-[oklch(0.554_0.046_257.417)] mb-10 leading-relaxed">
          Join thousands of professionals who used SkillSync to accelerate
          their careers. Get matched with a mentor who&rsquo;s been exactly
          where you want to go.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-[oklch(0.488_0.243_264.376_/_25%)] hover:shadow-xl hover:shadow-[oklch(0.488_0.243_264.376_/_35%)] hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.45 0.26 270))",
            }}
          >
            Find your mentor — it&rsquo;s free
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[oklch(0.929_0.013_255.508)] bg-transparent px-8 py-4 text-sm font-semibold text-[oklch(0.208_0.042_265.755)] transition-all duration-200 hover:border-[oklch(0.488_0.243_264.376_/_50%)] hover:bg-[oklch(0.488_0.243_264.376_/_5%)] hover:-translate-y-0.5 active:translate-y-0"
          >
            See how it works
          </Link>
        </div>

        {/* Trust micro-copy */}
        <p className="mt-8 text-xs text-[oklch(0.704_0.04_256.788)] flex items-center justify-center gap-5 flex-wrap">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[oklch(0.696_0.17_162.48)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[oklch(0.696_0.17_162.48)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[oklch(0.696_0.17_162.48)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Matched in 48 hours
          </span>
        </p>
      </div>
    </section>
  );
}
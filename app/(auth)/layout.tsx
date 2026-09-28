import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-[#183b35] px-12 py-10 text-white lg:flex xl:px-20">
        <Link href="/" className="text-lg font-semibold">SkillSync</Link>
        <div className="max-w-xl pb-12">
          <p className="mb-5 text-sm font-semibold uppercase text-[#b8d7c5]">Grow with intention</p>
          <h2 className="text-5xl font-semibold leading-tight">
            Your next chapter starts with a conversation.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            Find the people, guidance, and momentum to move your career forward.
          </p>
        </div>
        <p className="border-t border-white/20 pt-5 text-sm text-white/65">
          Learn together. Build what&apos;s next.
        </p>
      </aside>
      <section className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}

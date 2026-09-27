export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mentee dashboard shell – nav/sidebar will go here */}
      <main>{children}</main>
    </div>
  );
}

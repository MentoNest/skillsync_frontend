export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mentor dashboard shell – nav/sidebar will go here */}
      <main>{children}</main>
    </div>
  );
}

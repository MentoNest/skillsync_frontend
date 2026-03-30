export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-bold">Mentee Sidebar Placeholder</h2>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin dashboard shell – nav/sidebar will go here */}
      <main>{children}</main>
    </div>
  );
}

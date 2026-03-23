export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <header className="bg-zinc-900 text-white p-4">
        <h1 className="text-xl font-bold">Admin Topbar Placeholder</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-zinc-100 border-r p-4">
          <p className="font-semibold">Admin Nav Placeholder</p>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

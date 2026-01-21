export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

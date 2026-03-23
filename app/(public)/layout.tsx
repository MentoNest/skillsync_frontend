export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">Public Header Placeholder</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

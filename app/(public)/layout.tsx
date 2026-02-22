export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col" id="main-content">
        {children}
      </main>
    </div>
  );
}

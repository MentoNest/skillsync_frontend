export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <header className="p-4 border-b">
        <p className="text-xl font-bold">Public Header Placeholder</p>
      </header>
      <main id="main-content" className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}

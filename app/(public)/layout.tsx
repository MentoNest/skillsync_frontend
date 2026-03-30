import Footer from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

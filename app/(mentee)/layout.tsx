export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">SkillSync - Mentee Dashboard</h1>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Find Mentors</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">My Sessions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Profile</a>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

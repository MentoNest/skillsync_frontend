export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">SkillSync - Admin Dashboard</h1>
            <nav className="flex space-x-8">
              <a href="#" className="hover:text-purple-200">Dashboard</a>
              <a href="#" className="hover:text-purple-200">Users</a>
              <a href="#" className="hover:text-purple-200">Sessions</a>
              <a href="#" className="hover:text-purple-200">Settings</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default function MenteeDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Mentee Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Active Mentors</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Sessions Completed</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Learning Hours</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">36</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Skills Learned</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">7</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
        <p className="text-gray-600">Your scheduled mentoring sessions will appear here.</p>
      </div>
    </div>
  )
}

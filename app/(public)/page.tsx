export default function PublicPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to SkillSync
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Connecting mentors and mentees for meaningful growth
      </p>
      <div className="space-x-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Find a Mentor
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Become a Mentor
        </button>
      </div>
    </div>
  )
}

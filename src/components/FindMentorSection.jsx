import { useState } from "react";
import { Search, Filter, ChevronDown, CheckCircle } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Ifunaya Chigozie",
    university: "University of Lagos",
    religion: "Christian",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Johnson Dwarne",
    university: "University of Lagos",
    religion: "Muslim",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Ijeoma Eunice",
    university: "University of Lagos",
    religion: "Christian",
    img: "https://via.placeholder.com/150",
  },
];

const FindMentorSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="py-10 px-6 bg-gray-100 md:px-12 lg:px-20">
      <h2 className="mb-6 text-3xl font-semibold text-center">Find Mentors</h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col justify-between items-center mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or university"
            className="py-2 pr-4 pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Filter className="mr-2" /> Filters
        </button>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
          >
            <img
              src={mentor.img}
              alt={mentor.name}
              className="object-cover w-full h-48 rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">{mentor.name}</h3>
              <p className="text-gray-600">{mentor.university}</p>
              <p className="text-gray-500">{mentor.religion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <button className="flex items-center py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Load More <ChevronDown className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default FindMentorSection;

'use client';

import { useMemo, useState } from 'react';

type Mentor = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  experience: 'Junior' | 'Mid-Level' | 'Senior' | 'Executive';
  availability: string;
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Ava Patel',
    role: 'Product Designer',
    specialty: 'UX Strategy',
    experience: 'Senior',
    availability: 'Available this week',
  },
  {
    id: 2,
    name: 'Daniel Kim',
    role: 'Frontend Engineer',
    specialty: 'React & Accessibility',
    experience: 'Mid-Level',
    availability: 'Available next week',
  },
  {
    id: 3,
    name: 'Nia Thompson',
    role: 'Engineering Manager',
    specialty: 'Leadership & Delivery',
    experience: 'Executive',
    availability: 'Available this month',
  },
  {
    id: 4,
    name: 'Marcus Lee',
    role: 'Data Analyst',
    specialty: 'SQL & BI Dashboards',
    experience: 'Junior',
    availability: 'Available tomorrow',
  },
];

const experienceOptions = ['All', 'Junior', 'Mid-Level', 'Senior', 'Executive'] as const;

export default function MenteeDashboard() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experienceOptions)[number]>('All');

  const filteredMentors = useMemo(() => {
    if (selectedExperience === 'All') {
      return mentors;
    }

    return mentors.filter((mentor) => mentor.experience === selectedExperience);
  }, [selectedExperience]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Active Mentors</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{mentors.length}</p>
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

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Find Mentors</h2>
            <p className="text-gray-600 mt-1">Filter mentors by experience level to find the right match.</p>
          </div>

          <label className="flex flex-col text-sm font-medium text-gray-700">
            <span className="mb-2">Experience Level</span>
            <select
              value={selectedExperience}
              onChange={(event) => setSelectedExperience(event.target.value as (typeof experienceOptions)[number])}
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
            >
              {experienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredMentors.length} of {mentors.length} mentors
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div key={mentor.id} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {mentor.experience}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">Specialty: {mentor.specialty}</p>
                <p className="mt-1 text-sm text-gray-600">{mentor.availability}</p>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-600">
              No mentors match the selected experience level.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
        <p className="text-gray-600">Your scheduled mentoring sessions will appear here.</p>
      </div>
    </div>
  );
}


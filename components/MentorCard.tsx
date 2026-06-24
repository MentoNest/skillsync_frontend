import React from 'react';
import Image from 'next/image';

interface MentorCardProps {
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

export default function MentorCard({ name, role, description, avatarUrl }: MentorCardProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image className="rounded-t-lg object-cover" src={avatarUrl} alt={`Avatar of ${name}`} width={400} height={300} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{role}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
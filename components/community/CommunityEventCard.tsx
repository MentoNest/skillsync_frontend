'use client';

interface CommunityEventCardProps {
  title: string;
  host: string;
  date: string;
  time: string;
  attendeeCount: number;
  onRegister?: () => void;
}

export default function CommunityEventCard({ title, host, date, time, attendeeCount, onRegister }: CommunityEventCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 mb-2">Hosted by {host}</p>
      <div className="flex gap-3 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {time}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-3">{attendeeCount} attending</p>
      {onRegister && (
        <button onClick={onRegister} className="w-full px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">
          Register
        </button>
      )}
    </div>
  );
}

import { Button } from './button';

interface EventCardProps {
  title: string;
  host: string;
  date: string;
  time: string;
  registrationCount: number;
  maxRegistrations?: number;
  onRegister: () => void;
  isRegistered?: boolean;
  className?: string;
}

export function EventCard({
  title,
  host,
  date,
  time,
  registrationCount,
  maxRegistrations,
  onRegister,
  isRegistered = false,
  className = ''
}: EventCardProps) {
  const isFull = maxRegistrations ? registrationCount >= maxRegistrations : false;
  
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">Hosted by {host}</p>
      
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{registrationCount}{maxRegistrations ? `/${maxRegistrations}` : ''} registered</span>
        </div>
      </div>

      <Button 
        onClick={onRegister} 
        variant={isRegistered ? "secondary" : "primary"}
        disabled={isFull || isRegistered}
        className="w-full justify-center"
      >
        {isRegistered ? "Already Registered" : isFull ? "Event Full" : "Register Now"}
      </Button>
    </div>
  );
}
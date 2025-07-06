import { FC } from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  location: string;
  feedback: string;
  rating?: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  title,
  location,
  feedback,
  rating = 5,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-left flex flex-col gap-4">
      <div className="text-yellow-400 text-lg">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">"{feedback}"</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-blue-600">{title}</p>
        <p className="text-xs text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;

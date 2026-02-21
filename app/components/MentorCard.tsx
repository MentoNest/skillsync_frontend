import { Star } from "lucide-react"

interface MentorCardProps {
  name: string
  title: string
  experience: string
  rating: number
  price: string
  imageSrc?: string
  initials?: string
}

export default function MentorCard({ 
  name, 
  title, 
  experience, 
  rating, 
  price, 
  imageSrc, 
  initials 
}: MentorCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto shadow-xl">
      <div className="flex items-center mb-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
            <span className="text-gray-600 text-lg font-semibold">{initials}</span>
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm">{title}, {experience}</p>
        </div>
      </div>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>

      {/* Price */}
      <div className="text-2xl font-bold text-gray-900">{price}</div>
    </div>
  )
}

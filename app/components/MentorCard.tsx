import { Star } from "lucide-react"
import Image from "next/image"

interface MentorCardProps {
  name: string
  role: string
  description: string
  rating: number
  reviewCount: number
  price: string
  imageSrc?: string
  initials?: string
}

export default function MentorCard({ 
  name, 
  role, 
  description, 
  rating, 
  reviewCount, 
  price, 
  imageSrc, 
  initials 
}: MentorCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto shadow-xl h-72 flex flex-col">
      <div className="flex items-center mb-4">
        {imageSrc ? (
          <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              quality={75}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 mr-4 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-lg font-semibold">{initials}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
          <p className="text-gray-600 text-sm truncate">{role}</p>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
      
      {/* Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating} ({reviewCount})</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-2xl font-bold text-gray-900">{price}</div>
    </div>
  )
}

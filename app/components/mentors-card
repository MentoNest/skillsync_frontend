import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface MentorCardProps {
  id: string
  name: string
  role: string
  description: string
  image: string
  rating: number
  reviewCount: number
  price: string
}

export function MentorCard({
  name,
  role,
  description,
  image,
  rating,
  reviewCount,
  price,
}: MentorCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name and Role */}
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{role}</p>

        {/* Description */}
        <p className="text-sm text-card-foreground/80 mb-4 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-card-foreground ml-1">
            {rating}
          </span>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-card-foreground">{price}</span>
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

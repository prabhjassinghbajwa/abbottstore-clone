import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({ 
  rating, 
  maxRating = 5, 
  showValue = false, 
  size = 'md',
  className = '' 
}: RatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${
              star <= rating 
                ? 'fill-amber-400 text-amber-400' 
                : 'fill-gray-200 text-gray-200'
            } ${
              size === 'sm' ? 'h-3 w-3' : 
              size === 'md' ? 'h-4 w-4' : 
              'h-5 w-5'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
} 
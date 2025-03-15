import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex space-x-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

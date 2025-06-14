import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface Props {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

const MAX = 5;
const MIN = 0;

export const StarRating: React.FC<Props> = ({
  rating,
  className,
  iconClassName,
  text,
}) => {
  const safeRating = Math.max(MIN, Math.min(MAX, rating));

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: MAX }).map((_, index) => {
        return (
          <StarIcon
            key={"rating" + index}
            className={cn(
              "size-4",
              index < safeRating ? "fill-black" : "",
              iconClassName,
            )}
          />
        );
      })}
      {text && <p>{text}</p>}
    </div>
  );
};

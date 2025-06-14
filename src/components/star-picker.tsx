import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  value?: number;
  className?: string;
  disable?: boolean;
  onChange?: (value: number) => void;
}

export const StarPicker: React.FC<Props> = ({
  value,
  className,
  disable,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div
      className={cn(
        "flex items-center",
        disable && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <button
            key={star}
            type="button"
            disabled={disable}
            className={cn(
              "p-0.5 hover:scale-110 transition",
              !disable && "cursor-pointer",
            )}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
          >
            <StarIcon
              className={cn(
                "size-5",
                (hoverValue || (value ?? 0)) >= star
                  ? "fill-black stroke-black"
                  : "stroke-black",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

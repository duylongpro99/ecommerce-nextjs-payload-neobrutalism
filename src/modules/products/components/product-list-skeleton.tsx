import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { cn } from "@/lib/utils";
import { ProductCardSkeleton } from "./product-card-sekeleton";

interface Props {
  narrowView?: boolean;
}

export const ProductListSkeleton: React.FC<Props> = ({ narrowView }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
      )}
    >
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => {
        return <ProductCardSkeleton key={index} />;
      })}
    </div>
  );
};

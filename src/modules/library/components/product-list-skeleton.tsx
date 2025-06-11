import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { ProductCardSkeleton } from "./product-card-sekeleton";

export const ProductListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => {
        return <ProductCardSkeleton key={index} />;
      })}
    </div>
  );
};

import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { ProductCardSkeleton } from "./product-card-sekeleton";

export const ProductListSkeleton: React.FC = () => {
  return (
    <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => {
        return <ProductCardSkeleton key={index} />;
      })}
    </div>
  );
};

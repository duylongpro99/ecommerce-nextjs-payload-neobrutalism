import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReviewForm } from "./review-form";

interface Props {
  productId: string;
}

export const ReviewSidebar: React.FC<Props> = ({ productId }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    }),
  );

  return <ReviewForm productId={productId} intialData={data} />;
};

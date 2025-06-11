import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

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

  console.log(":data", data);
  return <div></div>;
};

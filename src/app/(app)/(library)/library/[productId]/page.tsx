import {
  ProductView,
  ProductViewSkeleton,
} from "@/modules/library/views/product.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { productId } = await params;
  const queryClient = getQueryClient();
  void (await queryClient.prefetchQuery(
    trpc.library.getOne.queryFilter({
      productId,
    }),
  ));

  void (await queryClient.prefetchQuery(
    trpc.reviews.getOne.queryFilter({
      productId,
    }),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

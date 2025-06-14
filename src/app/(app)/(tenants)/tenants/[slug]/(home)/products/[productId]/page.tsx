import {
  ProductView,
  ProductViewSkeleton,
} from "@/modules/products/views/product.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: {
    slug: string;
    productId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void (await queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    }),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView id={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

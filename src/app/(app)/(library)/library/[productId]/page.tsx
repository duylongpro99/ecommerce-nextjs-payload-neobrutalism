import { ProductView } from "@/modules/library/views/product.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { productId } = await params;

  const queryClient = getQueryClient();
  void (await queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    }),
  ));

  // void (await queryClient.prefetchQuery(
  //   trpc.reviews.getOne.queryOptions({
  //     productId,
  //   }),
  // ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} />
    </HydrationBoundary>
  );
};

export default Page;

import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/views/product-list.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    subCategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const { subCategory } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subCategory,
      limit: DEFAULT_PAGE_SIZE,
      ...filters,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subCategory} />
    </HydrationBoundary>
  );
};

export default Page;

import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { LibraryView } from "@/modules/library/views/library.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page: React.FC = async () => {
  const queryClient = getQueryClient();
  void (await queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_PAGE_SIZE,
    }),
  ));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  );
};

export default Page;

"use client";

import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { Button } from "@/components/ui/button";
import { Media } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import { ProductCard } from "./product-card";

export const ProductList: React.FC = () => {
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.library.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_PAGE_SIZE,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  if (data?.pages?.[0]?.docs?.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No products</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages
          ?.flatMap((page) => page.docs || [])
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.image?.url}
                tenantSlug={product.tenant?.name}
                tenantImageUrl={(product.tenant?.image as Media)?.url || ""}
                reviewRating={product.reviewRating}
                reviewCount={product.reviewCount}
              />
            );
          })}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="elevated"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

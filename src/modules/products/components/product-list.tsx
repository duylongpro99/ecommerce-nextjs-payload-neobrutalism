'use client';

import { DEFAULT_PAGE_SIZE } from '@/common/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Media } from '@/payload-types';
import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { InboxIcon } from 'lucide-react';
import { useProductFilters } from '../hooks/use-product-filters';
import { ProductCard } from './product-card';

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}

export const ProductList: React.FC<Props> = ({ category, tenantSlug, narrowView }) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions(
            {
                category,
                tenantSlug,
                limit: DEFAULT_PAGE_SIZE,
                ...filters,
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
            <div
                className={cn(
                    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
                    narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3',
                )}
            >
                {data?.pages
                    ?.flatMap((page) => page.docs || [])
                    .map((product) => {
                        return (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.image?.url}
                                tenantSlug={product.tenant?.name}
                                tenantImageUrl={(product.tenant?.image as Media)?.url || ''}
                                reviewRating={product.reviewRating}
                                reviewCount={product.reviewCount}
                                refs={product.refs || []}
                                isEnabledRefs={!!product.isEnabledRefs}
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

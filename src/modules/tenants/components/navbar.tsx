'use client';

import { Button } from '@/components/ui/button';
import { generateTenantUrl } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface Props {
    slug: string;
}

const CheckoutButton = dynamic(() => import('../../checkout/components/checkout-button').then((mod) => mod.CheckoutButton), {
    ssr: false,
    loading: () => (
        <Button variant={'elevated'} disabled className="bg-white">
            <ShoppingCartIcon className="text-black" />
        </Button>
    ),
});

export const Navbar: React.FC<Props> = ({ slug }) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Suspense fallback={<></>}>
                    <Link prefetch href={generateTenantUrl(slug)} className="flex items-center gap-2">
                        {data?.image?.url && (
                            <Image
                                src={data?.image.url}
                                alt={slug}
                                width={32}
                                height={32}
                                className="border shrink-0 size-[32px] rounded-full"
                            />
                        )}
                        <p className="text-xl">{data?.name}</p>
                    </Link>
                </Suspense>

                <CheckoutButton className="bg-white" tenantSlug={slug} hideIfEmpty />
            </div>
        </nav>
    );
};

export const NavbarSkeleton: React.FC = () => {
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Button variant={'elevated'} disabled className="bg-white">
                    <ShoppingCartIcon className="text-black" />
                </Button>
            </div>
        </nav>
    );
};

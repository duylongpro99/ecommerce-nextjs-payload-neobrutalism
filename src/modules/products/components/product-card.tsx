import { useProductRefs } from '@/hooks/use-product-refs';
import { currency, generateTenantUrl } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string;
    reviewRating: number;
    reviewCount: number;
    price: number;
    refs: Array<{ id?: string | null; url: string }>;
    isEnabledRefs: boolean;
}

export const ProductCard: React.FC<Props> = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    reviewCount,
    price,
    refs = [],
    isEnabledRefs,
}) => {
    const router = useRouter();
    const { openRef } = useProductRefs({
        refs,
    });

    const onGotoTenant = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        router.push(generateTenantUrl(tenantSlug));
    };

    const onClickCard = () => {
        if (!isEnabledRefs) return;
        openRef();
    };

    return (
        <Link prefetch href={`${generateTenantUrl(tenantSlug)}/products/${id}`}>
            <div
                className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col"
                onClick={onClickCard}
            >
                <div className="relative aspect-square">
                    <Image alt={name} src={imageUrl ?? '/placeholder.png'} fill className="object-cover" />
                </div>
                <div className="p-4 border-y flex flex-col gap-3 flex-1">
                    <h2 className=" text-lg font-medium line-clamp-4">{name}</h2>

                    <div className="flex items-center gap-2" onClick={onGotoTenant}>
                        {tenantImageUrl && (
                            <Image
                                alt={tenantSlug}
                                src={tenantImageUrl}
                                width={16}
                                height={16}
                                className="rounded-full border shrink-0 size-[16px]"
                            />
                        )}
                        <p className="text-sm underline font-medium">{tenantSlug}</p>
                    </div>

                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-3.5 fill-black" />
                            <p className="text-sm font-medium">
                                {reviewRating} ({reviewCount})
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="relative px-2 py-1 border bg-cyan-400 w-fit">
                        <p className="text-sm font-medium">{currency(price)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

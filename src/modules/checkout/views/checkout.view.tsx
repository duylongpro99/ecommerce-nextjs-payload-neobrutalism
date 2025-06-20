'use client';

import { generateTenantUrl } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InboxIcon, LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { CheckoutItem } from '../components/checkout-item';
import { CheckoutSidebar } from '../components/checkout-sidebar';
import { useCart } from '../hooks/use-cart';
import { useCheckoutStates } from '../hooks/use-checkout-states';

interface Props {
    tenantSlug: string;
}

export const CheckoutView: React.FC<Props> = ({ tenantSlug }) => {
    const { productIds, removeProduct, clearCart } = useCart({
        tenantSlug,
    });
    const trpc = useTRPC();
    const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({ ids: productIds }));
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (error?.data?.code === 'NOT_FOUND') {
            clearCart();
            toast.warning('Invalid products found, clear all carts.');
        }
    }, [error, clearCart]);

    /**Checkout */
    const [checkoutStates, setCheckoutStates] = useCheckoutStates();
    useEffect(() => {
        if (checkoutStates?.success) {
            setCheckoutStates({
                success: false,
                cancel: false,
            });
            clearCart();
            toast.success('Checkout successful!');

            queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());
            router.push('/library');
        }
        if (checkoutStates?.cancel) {
            toast.error('Checkout cancelled.');
        }
    }, [checkoutStates, clearCart, router, setCheckoutStates, queryClient, trpc.library.getMany]);

    const purchase = useMutation(
        trpc.checkout.purchase.mutationOptions({
            onMutate: () => {
                setCheckoutStates({
                    success: false,
                    cancel: false,
                });
            },
            onSuccess: (data) => {
                window.location.href = data.url;
            },
            onError: (error) => {
                if (error.data?.code === 'UNAUTHORIZED') {
                    router.push('/sign-in');
                }
                toast.error(error.message);
            },
        }),
    );
    const onCheckout = () => {
        purchase.mutate({
            productIds,
            tenantSlug,
        });
    };

    if (isLoading) {
        return (
            <div className="lg:pt-16 pt-4 px-4 lg:px-12">
                <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
                    <LoaderIcon className="text-muted-foreground animate-spin" />
                </div>
            </div>
        );
    }

    if (data?.totalDocs === 0) {
        return (
            <div className="lg:pt-16 pt-4 px-4 lg:px-12">
                <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
                    <InboxIcon />
                    <p className="text-base font-medium">No products</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pt-16 pt-4 px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="border rounded-md overflow-hidden bg-white">
                        {data?.docs.map((product, index) => (
                            <CheckoutItem
                                key={product.id}
                                isLast={index === data.docs.length - 1}
                                imageUrl={product.image?.url}
                                name={product.name}
                                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                                tenantUrl={generateTenantUrl(product.tenant.slug)}
                                tenantName={product.tenant.name}
                                price={product.price}
                                onRemove={() => {
                                    removeProduct(product.id);
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <CheckoutSidebar
                        totalPrice={data?.totalPrice ?? 0}
                        onCheckout={onCheckout}
                        isCancel={checkoutStates.cancel}
                        disabled={purchase.isPending}
                    />
                </div>
            </div>
        </div>
    );
};

import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";

export const useCart = ({ tenantSlug }: { tenantSlug: string }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);
  const productIds = useCartStore(
    (state) => state.cart[tenantSlug]?.productIds || [],
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [removeProduct, addProduct, productIds, tenantSlug],
  );

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  const clearTenantCart = () => {
    clearCart(tenantSlug);
  };

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantSlug, productId),
    removeProduct: (productId: string) => removeProduct(tenantSlug, productId),
    toggleProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    isProductInCart,
    totalItems: productIds.length,
  };
};

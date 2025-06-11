import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/use-cart-store";

export const useCart = ({ tenantSlug }: { tenantSlug: string }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);
  const productIds = useCartStore(
    useShallow((state) => state.cart[tenantSlug]?.productIds || []),
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        void removeProduct(tenantSlug, productId);
      } else {
        void addProduct(tenantSlug, productId);
      }
    },
    [removeProduct, addProduct, productIds, tenantSlug],
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds],
  );

  const clearTenantCart = useCallback(() => {
    void clearCart(tenantSlug);
  }, [tenantSlug, clearCart]);

  const handleAddProduct = useCallback(
    (productId: string) => {
      void addProduct(tenantSlug, productId);
    },
    [tenantSlug, addProduct],
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => {
      void removeProduct(tenantSlug, productId);
    },
    [tenantSlug, removeProduct],
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    toggleProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    isProductInCart,
    totalItems: productIds.length,
  };
};

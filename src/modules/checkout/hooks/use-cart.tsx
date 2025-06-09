import { useCartStore } from "../store/use-cart-store";

export const useCart = ({ tenantSlug }: { tenantSlug: string }) => {
  const { addProduct, removeProduct, clearCart, clearAllCarts, getCart } =
    useCartStore();

  const productIds = getCart(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  };

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

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Cart {
  productIds: string[];
}

export interface CartState {
  cart: Record<string, Cart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: {},
      addProduct: (tenantSlug, productId) => {
        return set((state) => {
          return {
            ...state,
            cart: {
              ...state.cart,
              [tenantSlug]: {
                productIds: [
                  ...(state.cart[tenantSlug]?.productIds || []),
                  productId,
                ],
              },
            },
          };
        });
      },
      removeProduct: (tenantSlug, productId) => {
        return set((state) => {
          return {
            ...state,
            cart: {
              ...state.cart,
              [tenantSlug]: {
                productIds: (state.cart[tenantSlug]?.productIds || []).filter(
                  (id) => id !== productId,
                ),
              },
            },
          };
        });
      },
      clearCart: (tenantSlug) => {
        return set((state) => {
          return {
            ...state,
            cart: {
              ...state.cart,
              [tenantSlug]: {
                productIds: [],
              },
            },
          };
        });
      },
      clearAllCarts: () => set({ cart: {} }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product, type CartItem } from '../types';

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== productId),
        }));
      },

      updateQuantity: (productId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity + delta } : i
            )
            .filter((i) => i.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'furniture-cart',
    }
  )
);

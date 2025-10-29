import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;

  // ✅ جدید برای استفاده در کارت غذاها
  getItemQuantity: (id: string) => number;
  setItemQuantity: (item: CartItem, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ افزودن آیتم جدید یا افزایش مقدار آن اگر از قبل وجود دارد
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      // ✅ حذف کامل آیتم از سبد
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // ✅ افزایش تعداد
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      // ✅ کاهش تعداد (و حذف در صورت رسیدن به صفر)
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        })),

      // ✅ پاک کردن کامل سبد خرید
      clearCart: () => set({ items: [] }),

      // ✅ دریافت تعداد یک آیتم خاص (برای نمایش در کارت)
      getItemQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },

      // ✅ تنظیم مستقیم تعداد خاص برای آیتم
      setItemQuantity: (item, quantity) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          if (exists) {
            if (quantity <= 0) {
              // اگر مقدار ۰ شد، حذفش کن
              return {
                items: state.items.filter((i) => i.id !== item.id),
              };
            }
            // در غیر این صورت، مقدار جدید رو اعمال کن
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity } : i
              ),
            };
          } else {
            // اگر وجود نداشت و quantity > 0 بود، اضافه کن
            if (quantity > 0)
              return { items: [...state.items, { ...item, quantity }] };
            return state;
          }
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

"use client";
import React from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <FaShoppingCart size={80} className="text-gray-400 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-2">سبد خرید خالی است</h2>
        <p className="text-center text-lg">هیچ محصولی در سبد خرید شما وجود ندارد.</p>
      </div>
    );

  return (
    <div className="min-h-screen mt-10 bg-gray-50 px-4 md:px-12 py-12 flex flex-col items-center">
      <h1 className="text-3xl mt-10 md:text-4xl font-bold text-red-600 mb-10 text-center">
        سبد خرید شما
      </h1>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 hover:shadow-xl transition-all"
            >
              {/* تصویر */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3 sm:mb-0 ">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* اطلاعات محصول */}
              <div className="flex-1 sm:px-4 text-center sm:text-right">
                <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                <p className="text-red-600 font-bold mt-1 text-base sm:text-lg">
                  {item.price.toLocaleString()} تومان
                </p>
              </div>

              {/* کنترل تعداد و حذف */}
              <div className="flex items-center justify-center sm:justify-end gap-3 mt-3 sm:mt-0">
                {/* کنترل تعداد */}
                <div className="flex items-center bg-gray-100 rounded-full shadow-inner px-1 sm:px-2 py-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-100 transition text-red-500 text-sm sm:text-base"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-2 text-base sm:text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white rounded-full shadow hover:bg-green-100 transition text-green-600 text-sm sm:text-base"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* دکمه حذف */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition text-sm sm:text-base"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Summary Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl border-t p-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 z-50">
        <div className="text-base md:text-lg font-semibold text-center md:text-right">
          تعداد کالا: <span className="text-red-600">{totalItems}</span> | جمع کل:{" "}
          <span className="text-red-600">{totalPrice.toLocaleString()} تومان</span>
        </div>
        <div className="flex gap-3 md:gap-4 mt-2 md:mt-0">
          <button
            onClick={clearCart}
            className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition font-medium text-sm sm:text-base"
          >
            پاک کردن سبد خرید
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition font-medium text-sm sm:text-base">
            نهایی کردن خرید
          </button>
        </div>
      </div>
    </div>
  );
}

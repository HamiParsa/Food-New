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
        <FaShoppingCart size={100} className="text-gray-400 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-2">سبد خرید خالی است</h2>
        <p className="text-center text-lg">هیچ محصولی در سبد خرید شما وجود ندارد.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-12">
      <div className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center">
  <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-12 text-center">
    سبد خرید شما
  </h1>

  <div className="w-full max-w-5xl flex flex-col gap-6">
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          layout
          className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 hover:shadow-2xl transition-all"
        >
          {/* تصویر */}
          <div className="relative w-32 h-32  mb-4 sm:mb-0">
            <Image
              src={item.img}
              alt={item.name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          {/* اطلاعات محصول */}
          <div className="flex-1 sm:px-6 text-center sm:text-right">
            <h2 className="text-xl sm:text-2xl font-semibold">{item.name}</h2>
            <p className="text-red-600 font-bold mt-1 text-lg sm:text-xl">
              {item.price.toLocaleString()} تومان
            </p>
          </div>

          {/* کنترل تعداد و حذف */}
          <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6 mt-4 sm:mt-0 w-full sm:w-auto">
            {/* کنترل تعداد */}
            <div className="flex items-center bg-gray-100 rounded-full shadow-inner px-2 sm:px-3 py-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-100 transition text-red-500 text-lg"
              >
                <FaMinus />
              </button>
              <span className="px-4 text-lg sm:text-xl font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-green-100 transition text-green-600 text-lg"
              >
                <FaPlus />
              </button>
            </div>

            {/* دکمه حذف */}
            <button
              onClick={() => removeItem(item.id)}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition text-lg sm:text-xl"
            >
              <FaTrash />
            </button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
</div>


      {/* Sticky Summary Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl border-t p-5 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 z-50">
        <div className="text-lg md:text-xl font-semibold">
          تعداد کالا: <span className="text-red-600">{totalItems}</span> | جمع کل:{" "}
          <span className="text-red-600">{totalPrice.toLocaleString()} تومان</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300 transition font-medium"
          >
            پاک کردن سبد خرید
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition font-medium">
            نهایی کردن خرید
          </button>
        </div>
      </div>
    </div>
  );
}

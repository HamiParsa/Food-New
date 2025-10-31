"use client";
import Link from "next/link";
import {
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import Image from "next/image";

export default function HeaderWithMobileNav() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="fixed inset-x-0 top-0 z-30 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* فقط عنوان و لوگو در همه سایزها */}
          <h1 className="text-lg font-semibold flex justify-center items-center flex-row-reverse">
            <div
              onContextMenu={(e) => e.preventDefault()}
              className="relative w-20 h-20"
            >
              <Image
                src="https://yourimageshare.com/ib/vIuiZbk1LX.png"
                fill
                alt=""
                className="object-contain rounded-md select-none pointer-events-none"
                draggable={false}
              />
            </div>
            رستوران غذای خونگی مامان پز
          </h1>

          {/* منو فقط برای دسکتاپ */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className="hover:text-red-600 transition flex items-center gap-1"
            >
              <FaHome /> خانه
            </Link>

            <Link
              href="/"
              className="hover:text-red-600 transition flex items-center gap-1"
            >
              <FaUtensils /> منو
            </Link>

            <Link
              href="/contact"
              className="hover:text-red-600 transition flex items-center gap-1"
            >
              <FaPhone /> تماس
            </Link>

            <Link
              href="/account"
              className="hover:text-red-600 transition flex items-center gap-1"
            >
              <FaUser /> حساب کاربری
            </Link>

            <Link href="/cart" className="relative">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition flex items-center gap-1">
                <FaShoppingCart /> سبد خرید
              </button>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- Mobile Bottom Navigation ---------- */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white shadow md:hidden flex justify-around items-center h-16">
        <Link
          href="/"
          className="text-gray-600 flex flex-col items-center justify-center"
        >
          <FaHome size={24} />
          <span className="text-xs">خانه</span>
        </Link>

        <Link
          href="/"
          className="text-gray-600 flex flex-col items-center justify-center"
        >
          <FaUtensils size={24} />
          <span className="text-xs">منو</span>
        </Link>

        <Link href="/cart" className="relative">
          <div className="bg-red-600 text-white p-4 rounded-full -mt-4 shadow-lg flex items-center justify-center relative">
            <FaShoppingCart size={28} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-600 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        <Link
          href="/account"
          className="text-gray-600 flex flex-col items-center justify-center"
        >
          <FaUser size={24} />
          <span className="text-xs">حساب</span>
        </Link>

        <Link
          href="/contact"
          className="text-gray-600 flex flex-col items-center justify-center"
        >
          <FaPhone size={24} />
          <span className="text-xs">تماس</span>
        </Link>
      </nav>
    </>
  );
}

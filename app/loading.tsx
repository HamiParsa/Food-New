"use client";

import { useState, useEffect } from "react";
import { GiKnifeFork } from "react-icons/gi";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // تایمر 5 ثانیه
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000); // 5 ثانیه

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading ? (
        <div className="flex flex-col items-center justify-center h-screen  from-amber-100 to-yellow-200 overflow-hidden">
          <div className="text-8xl text-amber-800 mb-6">
            <GiKnifeFork />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-8">
            رستوران غذای خونگی مامان پز
          </h1>
        </div>
      ) : (
        children
      )}
    </>
  );
}

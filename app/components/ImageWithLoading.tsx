"use client";
import { useState } from "react";
import Image from "next/image";

type ImageWithLoadingProps = {
  src: string;
  alt: string;
  fallback?: string; // عکس پیش‌فرض اگر لود نشد
  className?: string; // برای دادن کلاس دلخواه
  aspectRatio?: string; // مثلاً "16/6" برای اسلایدر
};

export default function ImageWithLoading({
  src,
  alt,
  fallback = "/images/default-food.png",
  className = "",
  aspectRatio,
}: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl shadow-md ${
        aspectRatio ? `aspect-[${aspectRatio}]` : "h-full"
      }`}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`transition-opacity duration-700 ease-in-out ${
            loading ? "opacity-0 scale-105" : `opacity-100 scale-100 ${className}`
          }`}
          onLoadingComplete={() => setLoading(false)}
          onError={() => setError(true)}
        />
      ) : (
        <Image
          src={fallback}
          alt="fallback"
          fill
          className={`object-cover w-full h-full ${className}`}
        />
      )}

      {/* shimmer effect */}
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-300/60 animate-pulse"></div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const slides = [
  { img: "https://yourimageshare.com/ib/WuaML3izkg.png" },
  { img: "https://yourimageshare.com/ib/CGg44f76rr.png" },
  { img: "https://yourimageshare.com/ib/mZrdBMjzLX.png" },
  { img: "https://yourimageshare.com/ib/uthEdvlDXU.png" },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // AutoPlay
  useEffect(() => {
    if (hover) return;
    const timeout = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timeout);
  }, [current, hover]);

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) nextSlide();
    if (info.offset.x < -threshold) prevSlide();
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[150px] overflow-hidden select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* اسلایدها */}
      <motion.div
        className="relative aspect-16/6 flex items-center justify-center overflow-hidden rounded-3xl shadow-lg"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={current}>
          <motion.div
            key={slides[current].img}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full bg-center bg-cover rounded-3xl"
            style={{ backgroundImage: `url(${slides[current].img})` }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </AnimatePresence>
      </motion.div>

      {/* دات‌های پایین */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setCurrent(i)}
            className={`cursor-pointer transition-all duration-300 ${
              current === i
                ? "w-6 h-2 rounded-full bg-red-500"
                : "w-2 h-2 rounded-full bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

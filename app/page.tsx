"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaUtensils,
  FaHamburger,
  FaPizzaSlice,
  FaHotdog,
  FaDrumstickBite,
  FaLeaf,
  FaShoppingCart,
  FaInfoCircle,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import { useCartStore } from "./store/cartStore";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";

type Star = { x: number; y: number; size: number; speed: number };

function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const totalStars = 200;
    const starsArray: Star[] = [];
    for (let i = 0; i < totalStars; i++) {
      starsArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    Promise.resolve().then(() => setStars(starsArray));
    let animationFrame: number;
    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((s) => ({
          ...s,
          y: s.y + s.speed > window.innerHeight ? 0 : s.y + s.speed,
        }))
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute bg-black rounded-full"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.y}px`,
            left: `${s.x}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const addToCart = useCartStore((state) => state.addItem);

  // Foods list
  const foods = [
    // --- برگرها ---
    {
      name: "برگر کلاسیک",
      price: 50000,
      img: "https://nodehfood.com/wp-content/uploads/2019/03/%D8%A8%D8%B1%DA%AF%D8%B1-%DA%A9%D9%84%D8%A7%D8%B3%DB%8C%DA%A9-min.jpg",
      category: "برگر",
      ingredients: ["گوشت", "نان", "سبزیجات", "سس"],
    },
    {
      name: "چیز برگر",
      price: 55000,
      img: "https://filfilworld.com/content/uploads/images/cheese-burger-.jpg",
      category: "برگر",
      ingredients: ["گوشت", "پنیر", "نان", "سبزیجات", "سس"],
    },
    {
      name: "برگر مخصوص",
      price: 60000,
      img: "https://farmfastfood.ir/wp-content/uploads/2023/03/1199662_180-1024x684.jpg",
      category: "برگر",
      ingredients: ["گوشت", "پنیر", "نان", "تخم مرغ", "سس مخصوص"],
    },
    {
      name: "برگر مرغ",
      price: 55000,
      img: "https://andre.shop/wp-content/uploads/2021/11/image-1.png",
      category: "برگر",
      ingredients: ["مرغ", "نان", "سبزیجات", "سس"],
    },
    {
      name: "برگر قارچ و پنیر",
      price: 60000,
      img: "https://statics.hesetazegi.com/files/images/recipes/mushroom-and-cheese-hamburger/mushroom_and_cheese_hamburger_w_hese_tazegi.jpg",
      category: "برگر",
      ingredients: ["گوشت", "قارچ", "پنیر", "نان", "سس"],
    },
    {
      name: "برگر اسپایسی",
      price: 65000,
      img: "https://filfilworld.com/content/uploads/images/Burger.jpg",
      category: "برگر",
      ingredients: ["گوشت", "نان", "سبزیجات", "سس تند"],
    },
    {
      name: "برگر دودی",
      price: 65000,
      img: "https://lomenzrestaurant.com/wp-content/uploads/2022/10/Lomenz-Mordad-751.jpg",
      category: "برگر",
      ingredients: ["گوشت دودی", "نان", "سبزیجات", "سس"],
    },
    {
      name: "برگر دست ساز سر آشپز",
      price: 70000,
      img: "https://andre.shop/wp-content/uploads/2024/05/royal-burger-2.jpg",
      category: "برگر",
      ingredients: ["گوشت", "پنیر", "سبزیجات", "سس ویژه"],
    },
    {
      name: "برگر مامان پز",
      price: 65000,
      img: "https://blog.snappfood.ir/wp-content/uploads/2021/09/A2191.jpg",
      category: "برگر",
      ingredients: ["گوشت", "نان", "سبزیجات", "سس خانگی"],
    },

    // --- پیتزاها ---
    {
      name: "پیتزا مخصوص",
      price: 75000,
      img: "https://foodotto.com/wp-content/uploads/2020/06/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D9%BE%DB%8C%D8%AA%D8%B2%D8%A7-%D9%85%D8%AE%D9%84%D9%88%D8%B7.jpg",
      category: "پیتزا",
      ingredients: ["خمیر", "پنیر", "گوشت", "سبزیجات", "سس"],
    },
    {
      name: "پیتزا پپرونی",
      price: 70000,
      img: "https://chishi.ir/wp-content/uploads/2020/02/pitza-peperoni.jpg",
      category: "پیتزا",
      ingredients: ["خمیر", "پنیر", "پپرونی", "سس"],
    },
    {
      name: "پیتزا گوشت و قارچ",
      price: 75000,
      img: "https://chishi.ir/wp-content/uploads/2020/09/pitza-gharch-goosht.jpg",
      category: "پیتزا",
      ingredients: ["خمیر", "گوشت", "قارچ", "پنیر", "سس"],
    },
    {
      name: "پیتزا بندری تند",
      price: 75000,
      img: "https://cdn.niniban.com/thumbnail/yMjMAxVrgCo5/23FydLsFZ5DkRkAbDZ_exYOQtNwT4kDXsmxiX7yqEEGTUGGyOJ-2oXd8oEtswBfdy6XXT7dAWOroy9u6vq1f1ESzr8ooFYn4gUHviGW6ok9icN-2Z4fczA,,/homemade-mixed-pizza_11zon.jpg",
      category: "پیتزا",
      ingredients: ["خمیر", "گوشت", "فلفل تند", "پنیر", "سس"],
    },
    {
      name: "پیتزا سبزیجات",
      price: 70000,
      img: "https://blog.snappfood.ir/wp-content/uploads/2020/12/A2157.jpg",
      category: "پیتزا",
      ingredients: ["خمیر", "سبزیجات", "پنیر", "سس"],
    },

    // --- فست‌فود و ساندویچ ---
    {
      name: "ساندویچ بندری تند",
      price: 45000,
      img: "https://taamtalaei.com/wp-content/uploads/2021/04/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%B3%D8%A7%D9%86%D8%AF%D9%88%DB%8C%DA%86-%D8%A8%D9%86%D8%AF%D8%B1%DB%8C-min.jpg",
      category: "فست‌فود و ساندویچ",
      ingredients: ["نان", "گوشت", "فلفل", "سس"],
    },
    {
      name: "اسنک مرغ و قارچ",
      price: 45000,
      img: "https://baradland.com/wp-content/uploads/2023/12/gh-resize-66_11zon.jpg",
      category: "فست‌فود و ساندویچ",
      ingredients: ["مرغ", "قارچ", "نان", "سس"],
    },
    {
      name: "اسنک ژامبون و پنیر",
      price: 40000,
      img: "https://panamag.ir/wp-content/uploads/2023/05/snack-zhambon.jpg",
      category: "فست‌فود و ساندویچ",
      ingredients: ["ژامبون", "پنیر", "نان", "سس"],
    },
    {
      name: "سیب زمینی ویژه با سس مخصوص",
      price: 35000,
      img: "https://crispy-chicken.ir/wp-content/uploads/2025/05/maxresdefault-2-2-1024x576.webp",
      category: "فست‌فود و ساندویچ",
      ingredients: ["سیب زمینی", "سس ویژه"],
    },
    {
      name: "ساندویچ ژامبون تنوری",
      price: 40000,
      img: "https://rang-rangi.ir/images/800/sandevich-zhambon-tanoori-second.webp",
      category: "فست‌فود و ساندویچ",
      ingredients: ["نان", "ژامبون", "سس"],
    },
    {
      name: "ساندویچ دست ساز مخصوص سر آشپز",
      price: 50000,
      img: "https://api2.kojaro.com/media/2022-1-27e9bd84-8129-4a12-9293-cb69b20abd44-67c4610dc1067c5ba767b8fb",
      category: "فست‌فود و ساندویچ",
      ingredients: ["نان", "گوشت", "سبزیجات", "سس ویژه"],
    },

    // --- کباب ---
    {
      name: "چلو کباب کوبیده",
      price: 70000,
      img: "https://shandizborujen.ir/wp-content/uploads/2024/04/%DA%A9%D8%A8%D8%A7%D8%A8-250.jpg",
      category: "کباب",
      ingredients: ["گوشت", "برنج", "سبزیجات", "سس"],
    },
    {
      name: "چلو جوجه زعفرانی",
      price: 75000,
      img: "https://restaurant.asemanix.ir/wp-content/uploads/2025/08/1b875cc6-af8c-4828-93a3-5ab4c81f29a49af50f13176a459f96d7eba2e09fb33b.jpg",
      category: "کباب",
      ingredients: ["مرغ", "برنج", "زعفران", "سس"],
    },
    {
      name: "چلو جوجه ترش",
      price: 75000,
      img: "https://www.abessi.ir/wp-content/uploads/2023/10/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%AC%D9%88%D8%AC%D9%87-%DA%A9%D8%A8%D8%A7%D8%A8-%D8%AA%D8%B1%D8%B4-%D9%81%D9%88%D9%82-%D8%A7%D9%84%D8%B9%D8%A7%D8%AF%D9%87-%D9%88-%D8%B1%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%86%DB%8C.jpg",
      category: "کباب",
      ingredients: ["مرغ", "برنج", "سس ترش"],
    },
    {
      name: "اکبر جوجه",
      price: 80000,
      img: "https://narijeh.com/wp-content/uploads/2024/12/Akbar-the-northern-chicken.webp",
      category: "کباب",
      ingredients: ["مرغ", "برنج", "سس ویژه"],
    },
    {
      name: "بال و کتف اسپایسی",
      price: 65000,
      img: "https://rooziato.com/wp-content/uploads/2017/03/P033016132457_3.jpg",
      category: "کباب",
      ingredients: ["مرغ", "فلفل تند", "سس"],
    },

    // --- غذاهای سنتی ---
    {
      name: "قورمه سبزی",
      price: 60000,
      img: "https://www.digikala.com/mag/wp-content/uploads/2024/07/Untitled-7-1.jpg",
      category: "غذاهای سنتی",
      ingredients: ["گوشت", "سبزی", "لوبیا", "پیاز", "ادویه"],
    },
    {
      name: "قیمه سیب زمینی",
      price: 55000,
      img: "https://express.snapp.market/mag/wp-content/uploads/2022/06/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1-%D9%BE%D8%AE%D8%AA-%D9%82%DB%8C%D9%85%D9%87-%D8%AE%D8%A7%D9%86%DA%AF%DB%8C.jpg",
      category: "غذاهای سنتی",
      ingredients: ["گوشت", "سیب زمینی", "لوبیا", "ادویه"],
    },
    {
      name: "عدس پلو با مرغ",
      price: 55000,
      img: "https://kalleh.com/book/wp-content/uploads/sites/2/2023/08/adas-polow-ba-morgh.jpg.webp",
      category: "غذاهای سنتی",
      ingredients: ["عدس", "مرغ", "برنج", "ادویه"],
    },
    {
      name: "کشک بادمجون",
      price: 50000,
      img: "https://blog.okala.com/wp-content/uploads/2024/12/kashk-bademjan2.jpg",
      category: "غذاهای سنتی",
      ingredients: ["بادمجان", "کشک", "پیاز", "ادویه"],
    },
    {
      name: "خوراک مرغ",
      price: 55000,
      img: "https://chishi.ir/wp-content/uploads/2024/02/khorak-morgh-sibzamini.jpg",
      category: "غذاهای سنتی",
      ingredients: ["مرغ", "سبزیجات", "ادویه"],
    },
  ];

  const categories = [
    { name: "همه", icon: <FaUtensils size={32} /> },
    { name: "برگر", icon: <FaHamburger size={32} /> },
    { name: "پیتزا", icon: <FaPizzaSlice size={32} /> },
    { name: "فست‌فود و ساندویچ", icon: <FaHotdog size={32} /> },
    { name: "کباب", icon: <FaDrumstickBite size={32} /> },
    { name: "غذاهای سنتی", icon: <FaLeaf size={32} /> },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [modalFood, setModalFood] = useState<(typeof foods)[0] | null>(null);

  const filteredFoods =
    selectedCategory === "همه"
      ? foods
      : foods.filter((f) => f.category === selectedCategory);

  const heroImages = [
    "https://prettyhome.co.in/wp-content/uploads/2023/05/burger4_01-scaled.jpg",
    "https://prettyhome.co.in/wp-content/uploads/2023/05/fast-comfortable-food-form-burger-french-fries-with-soft-golden-bun-1024x683.jpg",
    "https://prettyhome.co.in/wp-content/uploads/2023/05/6-1024x1024.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setHeroIndex((prev) => (prev + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <main className="min-h-screen relative bg-white overflow-hidden">
      <StarBackground />

      {/* Hero Slider */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center z-10">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
              index === heroIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`hero ${index}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={100}
            />
          </div>
        ))}

        {/* محتوای اصلی */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          {/* محتوای اصلی */}
          <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
            <div className="content-card">
              <h2 className="text-4xl md:text-6xl font-bold text-gradient-main">
                طعم واقعی غذاهای خونگی
              </h2>

              <p className="mt-4 text-lg md:text-xl text-gradient-sub max-w-2xl mx-auto drop-shadow">
                رستوران غذای خانگی مامان پز، تجربه‌ای از طعم‌های آشنا با کیفیتی
                مدرن.
              </p>

              {/* دکمه‌ها */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/#menu"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300"
                >
                  <FaUtensils className="text-lg" />
                  مشاهده منو
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-gray-800 font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300"
                >
                  <FaPhone className="text-lg" />
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* افکت گرادیانت متحرک */}
        <style jsx>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
          }
        `}</style>
      </section>

      {/* Categories & Food Grid */}
      <section id="menu" className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center text-red-600 mb-6">
            منوی محبوب
          </h3>
          <div className="flex justify-center px-2">
            <div className="overflow-x-auto no-scrollbar inline-flex gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition border min-w-max ${
                    selectedCategory === cat.name
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-800 border-gray-300"
                  } hover:bg-red-600 hover:text-white`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="mt-1 font-semibold">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredFoods.map((f) => (
              <article
                key={f.name}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition relative z-10"
              >
                <div className="h-44 w-full relative">
                  <Image
                    src={f.img}
                    alt={f.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-right">
                  <h4 className="text-lg font-semibold">{f.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {f.price.toLocaleString("fa-IR")} تومان
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => setModalFood(f)}
                      className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaInfoCircle /> جزئیات
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          id: f.name,
                          name: f.name,
                          price: f.price,
                          img: f.img,
                          quantity: 1,
                        })
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition flex items-center gap-1"
                    >
                      <FaShoppingCart /> افزودن
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-16 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold text-red-600 mb-4 text-center">
              درباره ما
            </h3>
            <div className="flex justify-center gap-6 flex-wrap mb-4">
              <div className="flex flex-col items-center gap-2">
                <FaLeaf size={28} className="text-green-500" />
                <p>مواد تازه</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaClock size={28} className="text-blue-500" />
                <p>ارسال سریع</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaUtensils size={28} className="text-red-500" />
                <p>طعم اصیل</p>
              </div>
            </div>
            <p className="text-center max-w-3xl mx-auto leading-relaxed">
              رستوران غذای خانگی مامان پز متعهد به استفاده از تازه‌ترین مواد
              اولیه و ارائهٔ بهترین غذا است.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setModalFood(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <div className="relative h-64 w-full mb-4">
              <Image
                src={modalFood.img}
                alt={modalFood.name}
                fill
                className="object-cover mt-4 rounded-xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{modalFood.name}</h3>
            <p className="text-red-600 text-lg mb-4">
              {modalFood.price.toLocaleString("fa-IR")} تومان
            </p>
            <h4 className="font-semibold mb-2">مواد به کار رفته:</h4>
            <ul className="list-disc list-inside mb-4">
              {modalFood.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                modalFood &&
                addToCart({
                  id: modalFood.name,
                  name: modalFood.name,
                  price: modalFood.price,
                  img: modalFood.img,
                  quantity: 1,
                })
              }
              className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition"
            >
              <FaShoppingCart /> افزودن به سبد خرید
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

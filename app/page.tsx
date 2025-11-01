"use client";
import React, { useState, useEffect } from "react";

import {
  FaUtensils,
  FaHamburger,
  FaPizzaSlice,
  FaHotdog,
  FaDrumstickBite,
  FaLeaf,
  FaShoppingCart,
  FaClock,
} from "react-icons/fa";
import { useCartStore } from "./store/cartStore";
import { RiDrinks2Fill } from "react-icons/ri";
import { MdOutlineRoomService } from "react-icons/md";
import Slider from "./components/Slider";
import { FaSearch } from "react-icons/fa";

import ImageWithLoading from "./components/ImageWithLoading";

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

// --- کارت غذا به صورت جداگانه ---
type Food = {
  name: string;
  price: number;
  img: string;
  category: string;
  ingredients: string[];
};

type FoodCardProps = { food: Food };

function FoodCard({ food }: FoodCardProps) {
  const quantity = useCartStore(
    (state) => state.items.find((i) => i.id === food.name)?.quantity || 0
  );
  const addToCart = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition relative z-10 flex flex-col">
      <div className="h-44 w-full relative">
        <ImageWithLoading
          src={food.img}
          alt={food.name}
          fallback="/images/default-food.png" // عکس پیش‌فرض اگر لود نشد
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 text-right flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold">{food.name}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {food.price.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-xs text-gray-500 mt-2">
            مواد: {food.ingredients.join("، ")}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          {quantity === 0 ? (
            <button
              onClick={() =>
                addToCart({
                  id: food.name,
                  name: food.name,
                  price: food.price,
                  img: food.img,
                  quantity: 1,
                })
              }
              className="bg-red-600 w-[300px] flex justify-center text-white px-6 py-2 rounded-md text-sm hover:bg-red-700 transition-all transform hover:scale-110  items-center gap-2"
            >
              <FaShoppingCart /> افزودن
            </button>
          ) : (
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={() => decreaseQuantity(food.name)}
                className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => increaseQuantity(food.name)}
                className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// --- صفحه اصلی ---
export default function Home() {
  const foods: Food[] = [
    {
      // --- برگرها ---

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

    {
      name: "فانتا",
      price: 15000,
      img: "https://dkstatics-public.digikala.com/digikala-reviews/1396357.jpg?x-oss-process=image/resize,w_960/quality,q_70",
      category: "نوشیدنی",
      ingredients: ["آب گازدار", "شکر", "طعم‌دهنده طبیعی پرتقال"],
    },
    {
      name: "کوکا",
      price: 15000,
      img: "https://chashmak.ir/wp-content/uploads/2022/06/0124.jpg",
      category: "نوشیدنی",
      ingredients: ["آب گازدار", "شکر", "طعم‌دهنده کارامل", "کافئین"],
    },
    {
      name: "اسپرایت",
      price: 15000,
      img: "https://tanasob-online.com/wp-content/uploads/2023/02/%D8%A7%D8%B3%D9%BE%D8%B1%D8%A7%DB%8C%D8%AA.jpg",
      category: "نوشیدنی",
      ingredients: ["آب گازدار", "شکر", "طعم‌دهنده لیمو و لیموترش"],
    },
    {
      name: "دوغ سنتی",
      price: 10000,
      img: "https://media.hamshahrionline.ir/d/2021/08/21/4/4592985.jpg",
      category: "نوشیدنی",
      ingredients: ["ماست", "آب", "نمک", "نعنا"],
    },
    {
      name: "دوغ نعنا",
      price: 12000,
      img: "https://cdn.55online.news/thumbnail/dLgC5EqP5ugH/odJ5qJgIOksnDoJdBenUlE48u50d9ntalnDkvdNYgn6tNZnxhsYvkc-zhltB_746/%D8%AF%D9%88%D8%BA.jpg",
      category: "نوشیدنی",
      ingredients: ["ماست", "آب", "نمک", "نعنا تازه"],
    },
    {
      name: "دوغ موسیر",
      price: 13000,
      img: "https://blog.okcs.com/wp-content/uploads/2023/04/fgbe-1.jpg",
      category: "نوشیدنی",
      ingredients: ["ماست", "آب", "نمک", "موسیر"],
    },
    {
      name: "دوغ هشت گیاه",
      price: 14000,
      img: "https://shp.aradbranding.com/images/2025/09/1759131502_1%20(139).jpg",
      category: "نوشیدنی",
      ingredients: ["ماست", "آب", "نمک", "سبزیجات معطر هشت‌گانه"],
    },
    {
      name: "آب معدنی",
      price: 8000,
      img: "https://shp.aradbranding.com/images/2024/06/5DSR7389-Copy-min.jpg",
      category: "نوشیدنی",
      ingredients: ["آب تصفیه شده"],
    },
    {
      name: "گوجه (یک سیخ)",
      price: 5000,
      img: "https://dolopifood.ir/wp-content/uploads/2024/12/646a763cf0fcd.jpg",
      category: "سرویس",
      ingredients: ["گوجه تازه"],
    },
    {
      name: "لیمو",
      price: 3000,
      img: "https://chishi.ir/wp-content/uploads/2023/05/taze-limoo-torsh.jpg",
      category: "سرویس",
      ingredients: ["لیمو تازه"],
    },
    {
      name: "فلفل سبز",
      price: 4000,
      img: "https://media.mehrnews.com/d/2025/09/02/4/5662166.jpg?ts=1756802501567",
      category: "سرویس",
      ingredients: ["فلفل سبز تازه"],
    },
    {
      name: "پیاز",
      price: 3000,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVxnYEBsyAnbWrjurF6IpvRjRpCFRH5qMow&s",
      category: "سرویس",
      ingredients: ["پیاز تازه"],
    },
    {
      name: "زیتون پرورده",
      price: 7000,
      img: "https://blog.okala.com/wp-content/uploads/2024/11/zaytoon-parvarde.jpg",
      category: "سرویس",
      ingredients: ["زیتون پرورده"],
    },
    {
      name: "زیتون هسته‌دار",
      price: 7000,
      img: "https://asankeshtazar.ir/wp-content/uploads/2023/03/01.webp",
      category: "سرویس",
      ingredients: ["زیتون هسته‌دار"],
    },
    {
      name: "ترشی لیته",
      price: 6000,
      img: "https://shincel.ir/wp-content/uploads/2025/05/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%AA%D8%B1%D8%B4%DB%8C-%D9%84%DB%8C%D8%AA%D9%87-%D8%AE%D8%A7%D9%86%DA%AF%DB%8C-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1-%D8%B3%D8%A7%D8%AF%D9%87-%D9%88-%D8%AE%D9%88%D8%B4%D9%85%D8%B2%D9%87.webp",
      category: "سرویس",
      ingredients: ["ترشی لیته خانگی"],
    },
    {
      name: "ترشی کلم",
      price: 6000,
      img: "https://blog.okala.com/wp-content/uploads/2024/01/pickled-white-cabbage-0.jpg",
      category: "سرویس",
      ingredients: ["ترشی کلم"],
    },
    {
      name: "ترشی سیر",
      price: 6000,
      img: "https://bazargam.com/blog/images/posts/garlic-pickle-jar.webp",
      category: "سرویس",
      ingredients: ["ترشی سیر"],
    },
    {
      name: "سس چیلی",
      price: 5000,
      img: "https://www.veechini.com/wp-content/uploads/2025/01/%D8%B3%D8%B3-%DA%86%DB%8C%D9%84%DB%8C-%D8%B1%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%86%DB%8C-1.webp",
      category: "سرویس",
      ingredients: ["سس چیلی"],
    },
    {
      name: "سس اسپایسی",
      price: 5000,
      img: "https://khabarnama.net/wp-content/uploads/2025/09/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%B3%D8%B3-%D8%A7%D8%B3%D9%BE%D8%A7%DB%8C%D8%B3%DB%8C1.webp",
      category: "سرویس",
      ingredients: ["سس اسپایسی"],
    },
    {
      name: "سس سیر",
      price: 5000,
      img: "https://i1.delgarm.com/i/811/0106/28/1663600008cb49.jpg",
      category: "سرویس",
      ingredients: ["سس سیر"],
    },
    {
      name: "سس قرمز",
      price: 5000,
      img: "https://kalleh.com/book/wp-content/uploads/sites/2/2019/04/salsatoamte.jpg.webp",
      category: "سرویس",
      ingredients: ["سس قرمز"],
    },
    {
      name: "سس فرانسوی",
      price: 5000,
      img: "https://files.namnak.com/users/ms/aup/202201/214_pics/%D8%B3%D8%B3-%D9%81%D8%B1%D8%A7%D9%86%D8%B3%D9%88%DB%8C-%D8%AE%D8%A7%D9%86%DA%AF%DB%8C.webp",
      category: "سرویس",
      ingredients: ["سس فرانسوی"],
    },
    {
      name: "نان لواش",
      price: 4000,
      img: "https://salamdonya.com/assets/images/12/1272nnlzq.jpg",
      category: "سرویس",
      ingredients: ["نان لواش تازه"],
    },
    {
      name: "نان سنگک",
      price: 5000,
      img: "https://media.hamshahrionline.ir/d/2021/12/18/4/4623436.jpg",
      category: "سرویس",
      ingredients: ["نان سنگک تازه"],
    },
    {
      name: "نان همبرگر",
      price: 5000,
      img: "https://www.pak-fan.com/wp-content/uploads/2022/06/nan-hamberger.jpg",
      category: "سرویس",
      ingredients: ["نان همبرگر تازه"],
    },
    {
      name: "ماست چکیده",
      price: 6000,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBHc-bRGLRn8yTl0wlFEha-0z8r3Ng9CVjQ&s",
      category: "سرویس",
      ingredients: ["ماست چکیده تازه"],
    },
    {
      name: "ماست موسیر",
      price: 7000,
      img: "https://express.snapp.market/mag/wp-content/uploads/2024/06/%D8%AE%D9%88%D8%A7%D8%B5-%D9%85%D8%A7%D8%B3%D8%AA-%D9%85%D9%88%D8%B3%DB%8C%D8%B1.jpg",
      category: "سرویس",
      ingredients: ["ماست موسیر تازه"],
    },
    {
      name: "ماست مخصوص",
      price: 7000,
      img: "https://media.imna.ir/d/2021/09/25/4/1731198.jpg",
      category: "سرویس",
      ingredients: ["ماست مخصوص تازه"],
    },
  ];

  const categories = [
    { name: "همه", icon: <FaUtensils size={32} /> },
    { name: "برگر", icon: <FaHamburger size={32} /> },
    { name: "پیتزا", icon: <FaPizzaSlice size={32} /> },
    { name: "فست‌فود و ساندویچ", icon: <FaHotdog size={32} /> },
    { name: "کباب", icon: <FaDrumstickBite size={32} /> },
    { name: "غذاهای سنتی", icon: <FaLeaf size={32} /> },
    { name: "نوشیدنی", icon: <RiDrinks2Fill size={32} /> },
    { name: "سرویس", icon: <MdOutlineRoomService size={32} /> },
  ];
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("همه");

  const filteredFoods = foods
    .filter(
      (f) => selectedCategory === "همه" || f.category === selectedCategory
    ) // فیلتر بر اساس دسته
    .filter(
      (f) =>
        f.name.includes(searchQuery) || // جستجو در نام غذا
        f.ingredients.some((i) => i.includes(searchQuery)) // جستجو در مواد تشکیل‌دهنده
    );

  return (
    <main className="min-h-screen relative bg-white overflow-hidden">
      <StarBackground />
      <Slider />

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
          {/* Search Box */}
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-md">
              {/* آیکون سرچ داخل input */}
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaSearch size={18} />
              </span>
              <input
                type="text"
                placeholder="جستجو بین غذاها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gray-300 shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                 placeholder-gray-400 text-gray-800 transition-all duration-300
                 hover:scale-105 hover:shadow-xl"
              />
            </div>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredFoods.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 text-lg mt-6">
                متأسفیم، غذای مورد نظرت در منو موجود نیست 😔
              </p>
            ) : (
              filteredFoods.map((f) => <FoodCard key={f.name} food={f} />)
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredFoods.map((f) => (
              <FoodCard key={f.name} food={f} />
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
    </main>
  );
}

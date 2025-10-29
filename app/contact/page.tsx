"use client";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to from-red-50 to-white pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-red-700 mb-3">تماس با ما</h1>
        <p className="text-gray-600 text-lg">
          خوشحال می‌شویم نظرات، پیشنهادات و انتقادات شما را بشنویم 🌿
        </p>
      </div>

      {/* بخش تماس و نقشه */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* اطلاعات تماس */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-right">
          <h2 className="text-2xl font-semibold text-red-600 mb-6">راه‌های ارتباطی</h2>
          <div className="space-y-5 text-gray-700">
            <div className="flex items-center gap-3">
              <FaPhone className="text-red-600 text-xl" />
              <span>۰۲۱-۲۲۳۳۴۴۵۵</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600 text-xl" />
              <span>تهران، خیابان ولیعصر، بالاتر از پارک ملت، پلاک ۱۲۳</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-600 text-xl" />
              <span>info@mamanpaz.ir</span>
            </div>
          </div>

          {/* ساعات کاری */}
          <div className="mt-8 border-t border-gray-200 pt-4 text-gray-700">
            <h3 className="text-lg font-semibold mb-2">ساعات کاری</h3>
            <p>هر روز از ساعت ۱۱ صبح تا ۱۱ شب</p>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="mt-8 flex gap-5 justify-center md:justify-start text-2xl text-red-600">
            <a href="#" className="hover:scale-110 transition"><FaInstagram /></a>
            <a href="#" className="hover:scale-110 transition"><FaTelegram /></a>
            <a href="#" className="hover:scale-110 transition"><FaWhatsapp /></a>
          </div>
        </div>

        {/* فرم تماس */}
        <form className="bg-white shadow-lg rounded-2xl p-8 space-y-5">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 text-right">
            ارسال پیام
          </h2>

          <input
            type="text"
            placeholder="نام شما"
            className="w-full border border-gray-300 rounded-xl p-3 text-right focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full border border-gray-300 rounded-xl p-3 text-right focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="text"
            placeholder="موضوع پیام"
            className="w-full border border-gray-300 rounded-xl p-3 text-right focus:ring-2 focus:ring-red-500 outline-none"
          />
          <textarea
            placeholder="متن پیام شما..."
            rows={5}
            className="w-full border border-gray-300 rounded-xl p-3 text-right focus:ring-2 focus:ring-red-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
          >
            ارسال پیام
          </button>
        </form>
      </div>

      {/* نقشه */}
     <div className="mt-16 max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.2248!2d49.6858!3d34.0918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f0f929f8a2d4b6f%3A0x1d2b4d97b8902b99!2sArak%20City%20Center!5e0!3m2!1sen!2s!4v1690202156197!5m2!1sen!2s"
    width="100%"
    height="400"
    allowFullScreen
    loading="lazy"
  ></iframe>
</div>

    </main>
  );
}

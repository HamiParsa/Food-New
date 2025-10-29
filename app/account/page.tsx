"use client";
import { useState } from "react";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // پاک کردن خطا وقتی کاربر تایپ می‌کنه
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (tab === "register" && !form.name.trim()) {
      newErrors.name = "لطفاً نام خود را وارد کنید.";
    }
    if (!form.email.includes("@")) {
      newErrors.email = "ایمیل نامعتبر است.";
    }
    if (form.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (tab === "login") {
      console.log("ورود:", form);
    } else {
      console.log("ثبت نام:", form);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to from-red-100 via-white to-red-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-semibold transition ${
              tab === "login" ? "border-b-2 border-red-600 text-red-600" : "text-gray-400"
            }`}
            onClick={() => setTab("login")}
          >
            ورود
          </button>
          <button
            className={`py-2 px-4 font-semibold transition ${
              tab === "register" ? "border-b-2 border-red-600 text-red-600" : "text-gray-400"
            }`}
            onClick={() => setTab("register")}
          >
            ثبت نام
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-red-400"
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-red-400"
              }`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-red-400"
              }`}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            {tab === "login" ? "ورود" : "ثبت نام"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          با ورود یا ثبت نام، قوانین ما را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Users, Heart, MessageCircle, Shield, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LandingPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("حالت تاریک فعال شد  ");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("حالت روشن فعال شد  ");
    }
  };

  const features = [
    { icon: Users, title: "ارتباط با دوستان", desc: "با دوستان خود در ارتباط باشید و لحظات خود را به اشتراک بگذارید" },
    { icon: Heart, title: "اشتراک‌گذاری", desc: "عکس‌ها، ویدیوها و افکار خود را با دیگران به اشتراک بگذارید" },
    { icon: MessageCircle, title: "چت و گفتگو", desc: "ارسال پیام خصوصی و چت گروهی با دوستان" },
    { icon: Shield, title: "امنیت بالا", desc: "حفظ حریم خصوصی و امنیت اطلاعات شما" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* هدر */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">د</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              دالی
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="تغییر تم"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="px-5 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all hover:scale-105"
            >
              شروع کنید
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">نسخه جدید</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              دالی
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">پلتفرم اجتماعی مدرن</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            به دالی بپیوندید و لحظات خاص خود را با دوستان و خانواده به اشتراک بگذارید.
            تجربه‌ای جدید از شبکه‌های اجتماعی.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              شروع کنید
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              بیشتر بدانید
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
                <div className="aspect-video bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">پیش‌نمایش اپلیکیشن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              ویژگی‌های دالی
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              تمام امکاناتی که برای ارتباط با دوستان نیاز دارید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            آماده شروع هستید؟
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            همین حالا ثبت‌نام کنید و به جامعه بزرگ دالی بپیوندید
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            ثبت‌نام کنید
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 دالی. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
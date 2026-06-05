"use client";

import Link from 'next/link';
import { Home, Search, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300 relative">
      {/* دکمه دارک مود */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 left-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 z-50"
        aria-label="تغییر تم"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="max-w-md w-full text-center">
        {/* عدد 404 */}
        <div className="relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-bold text-gray-800 dark:text-gray-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        {/* متن اصلی */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-4">
          صفحه پیدا نشد
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.
        </p>
        
        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
          >
            <Home size={18} />
            <span>صفحه اصلی</span>
          </Link>
          
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200"
          >
            <Search size={18} />
            <span>جستجو</span>
          </Link>
        </div>
        
        {/* راهنما */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-8">
          خطای 404 • صفحه مورد نظر یافت نشد
        </p>
      </div>
    </div>
  );
}
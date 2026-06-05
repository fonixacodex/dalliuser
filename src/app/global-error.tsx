"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 dark:bg-gray-900">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
          
            <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              خطایی رخ داد
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              مشکلی در اجرای برنامه پیش آمده است
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={reset}
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                تلاش مجدد
              </button>
              <Link
                href="/"
                className="px-5 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <Home size={16} />
                صفحه اصلی
              </Link>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-6">
              خطا: {error.digest || "unknown"}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
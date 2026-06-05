"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
 

export default function CreateError({ error, reset }: any) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* آیکون خطا */}
        <div className="pt-8 text-center">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
        </div>

        {/* متن */}
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            خطا در بارگذاری
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            {error.message || "مشکلی پیش آمده است"}
          </p>

          {/* دکمه‌ها */}
          <div className="space-y-2">
            <button
              onClick={reset}
              className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              تلاش مجدد
            </button>
            
            
          </div>

          {/* کد خطا */}
          {error.digest && (
            <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-4">
              خطا: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import { AlertTriangle, RefreshCw, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationsError({ error, reset }: any) {
  const router = useRouter();

  const handleRefresh = () => {
    reset();
    router.refresh();
  };
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <Bell size={36} className="text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        خطا در دریافت اعلان‌ها
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {error.message || "مشکلی در بارگذاری اعلان‌ها پیش آمده است"}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleRefresh}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCw size={16} />
          تلاش مجدد
        </button>
    
      </div>
      {error.digest && (
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-6">
          کد خطا: {error.digest}
        </p>
      )}
    </div>
  );
}
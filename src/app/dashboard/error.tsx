"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({ error, reset }: any) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-xl font-bold mb-2">خطا در بارگذاری</h2>
      <p className="text-gray-500 mb-6">{error.message || "مشکلی پیش آمده"}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
      >
        <RefreshCw size={16} /> تلاش مجدد
      </button>
    </div>
  );
}
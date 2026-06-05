"use client";

import { AlertTriangle} from "lucide-react";
import Link from "next/link";

export default function AuthError({ error, reset }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">خطا در ورود</h1>
        <p className="text-gray-500 mb-6">{error.message || "مشکلی پیش آمده"}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            تلاش مجدد
          </button>
          <Link href="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
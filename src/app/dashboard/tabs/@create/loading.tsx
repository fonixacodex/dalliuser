"use client";

export default function CreateLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-full mx-auto">
        {/* دکمه‌ها */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 h-12 bg-white dark:bg-gray-800 rounded-xl animate-pulse shadow-sm"></div>
          <div className="flex-1 h-12 bg-white dark:bg-gray-800 rounded-xl animate-pulse shadow-sm"></div>
        </div>

        {/* کارت اصلی */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {/* هدر */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-6 w-32 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>

          {/* محتوا */}
          <div className="p-5">
            {/* باکس آپلود */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse mb-5"></div>

            {/* فیلدها */}
            <div className="space-y-3">
              <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-11 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-11 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              
              {/* دکمه */}
              <div className="h-11 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
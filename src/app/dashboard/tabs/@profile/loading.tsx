"use client";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* هدر اسکلتون */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* اطلاعات پروفایل */}
        <div className="bg-white dark:bg-gray-800 px-4 pt-6 pb-4">
          <div className="flex gap-4">
            {/* آواتار */}
            <div className="shrink-0">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>

            {/* آمار */}
            <div className="flex-1">
              <div className="flex justify-around mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-9 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-9 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* بیوگرافی */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-1">
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex gap-3 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* هایلایت‌ها */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="flex gap-4 px-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* تب‌ها */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 py-3 flex justify-center">
                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* گرید پست‌ها */}
        <div className="grid grid-cols-3 gap-0.5 bg-gray-50 dark:bg-gray-900 p-0.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
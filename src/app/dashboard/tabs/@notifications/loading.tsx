"use client";

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        {/* هدر اسکلتون */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* عنوان */}
              <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              {/* تعداد جدید */}
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* تب‌ها */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 py-3 flex justify-center">
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* لیست اعلان‌های اسکلتون */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-4">
              <div className="flex gap-3">
                {/* آواتار */}
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>

                {/* محتوای اعلان */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* نام کاربری */}
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                      {/* متن اعلان */}
                      <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                      {/* زمان */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                    {/* تصویر پست */}
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  </div>

                  {/* دکمه‌های اقدام */}
                  <div className="flex gap-2 mt-3">
                    <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* نقطه نخوانده */}
                <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* فوتر اسکلتون */}
        <div className="text-center py-6 mt-4">
          <div className="h-3 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
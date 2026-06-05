"use client";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* اسکلتون سایدبار (برای دسکتاپ) */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-20 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
        </div>
        <div className="p-3 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto"></div>
          ))}
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="md:mr-20">
        <div className="max-w-2xl mx-auto p-4">
          
          {/* اسکلتون هدر */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>

          {/* اسکلتون استوری‌ها */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 animate-pulse">
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5,6,7,8,9,10].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* اسکلتون پست‌ها */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                {/* هدر پست */}
                <div className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
                
                {/* تصویر پست */}
                <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                
                {/* دکمه‌ها */}
                <div className="p-3">
                  <div className="flex gap-4 mb-3">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
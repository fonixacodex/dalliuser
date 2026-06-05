"use client";

export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* سرچ بار اسکلتون */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="relative max-w-full mx-auto">
          <div className="w-full h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* گرید اسکلتون */}
      <div className="px-4 py-4">
        <div className="flex gap-1 max-w-6xl mx-auto">
          {/* ستون ۱ */}
          <div className="flex-1 space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                style={{ aspectRatio: `${Math.random() * 0.5 + 0.8}` }}
              />
            ))}
          </div>
          
          {/* ستون ۲ */}
          <div className="flex-1 space-y-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                style={{ aspectRatio: `${Math.random() * 0.5 + 0.8}` }}
              />
            ))}
          </div>
          
          {/* ستون ۳ */}
          <div className="flex-1 space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                style={{ aspectRatio: `${Math.random() * 0.5 + 0.8}` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
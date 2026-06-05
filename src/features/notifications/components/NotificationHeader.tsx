"use client";

interface NotificationHeaderProps {
  unreadCount: number;
}

export default function NotificationHeader({ unreadCount }: NotificationHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">اعلان‌ها</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
              {unreadCount} جدید
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
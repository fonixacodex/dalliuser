"use client";

import { NotificationTabType } from "../types/notification.types";

interface NotificationTabsProps {
  activeTab: NotificationTabType;
  onTabChange: (tab: NotificationTabType) => void;
  unreadCount: number;
  requestCount: number;
}

export default function NotificationTabs({
  activeTab,
  onTabChange,
  unreadCount,
  requestCount,
}: NotificationTabsProps) {
  const tabs: { id: NotificationTabType; label: string; badge?: number }[] = [
    { id: "all", label: "همه", badge: unreadCount },
    { id: "follows", label: "دنبال‌کننده‌ها", badge: requestCount },
    { id: "comments", label: "کامنت‌ها" },
    { id: "likes", label: "لایک‌ها" },
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab.label}
            {tab.badge && tab.badge > 0 && isActive && (
              <span className="mr-1 text-xs">({tab.badge})</span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
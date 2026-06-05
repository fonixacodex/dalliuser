"use client";

import { Tab } from "../types/dashboard.types";

interface MobileBottomNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: any) => void;
}

export default function MobileBottomNav({ tabs, activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex justify-around items-center px-4 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon size={24} fill={isActive ? "#3B82F6" : "none"} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
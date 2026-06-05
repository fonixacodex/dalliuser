"use client";

import { Grid, Bookmark, Heart } from "lucide-react";
import { TabType } from "../types/profile.types";

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: "posts" as TabType, label: "پست‌ها", icon: Grid },
    { id: "saved" as TabType, label: "ذخیره", icon: Bookmark },
    { id: "liked" as TabType, label: "لایک", icon: Heart },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-3 flex justify-center items-center gap-2 transition-colors relative ${
                isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
import { Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { Tab } from "../types/dashboard.types";

interface DesktopSidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: any) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function DesktopSidebar({
  tabs,
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
}: DesktopSidebarProps) {
  return (
    <aside className="fixed right-0 top-0 h-full w-20 hover:w-64 transition-all duration-300 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg z-50 group overflow-hidden">
      <div className="h-full flex flex-col">
 
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-center items-center group-hover:justify-start">
          <div className="bg-gray-100 dark:bg-gray-200 rounded-md p-1">
            <Image src="/logo/org.png" alt="Logo" width={35} height={35} className="object-contain"  
 
  loading="lazy"
  />
          </div>
          <span className="hidden group-hover:inline mr-3 text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            دالی
          </span>
        </div>

     
        <nav className="flex-1 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center justify-center group-hover:justify-start gap-4 px-3 py-3 mx-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={22} fill={isActive ? "#3B82F6" : "none"} />
                <span className={`hidden group-hover:inline font-medium ${isActive ? "text-blue-500" : ""}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

         
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <button className="w-full flex items-center justify-center group-hover:justify-start gap-4 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <Settings size={20} />
            <span className="hidden group-hover:inline">تنظیمات</span>
          </button>

          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />

          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
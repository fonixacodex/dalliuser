"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        {isDarkMode ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-500" />}
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {isDarkMode ? "حالت روشن" : "حالت تاریک"}
        </span>
      </div>
      <div className="relative">
        <div className={`w-8 h-4 rounded-full transition-colors ${isDarkMode ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? "translate-x-4" : "translate-x-0.5"}`} />
        </div>
      </div>
    </button>
  );
}
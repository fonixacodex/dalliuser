"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/darkmoode/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
}

export default function ThemeToggle({ 
  className = "", 
  iconSize = 18,
  showText = false 
}: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        isDarkMode
          ? "bg-gray-800 text-yellow-500 hover:bg-gray-700   border-amber-600 border-4"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-amber-600 border-4"
      } ${className}`}
      aria-label="تغییر تم"
    >
      {isDarkMode ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      {showText && (
        <span className="mr-2 text-sm">
          {isDarkMode ? "حالت روشن" : "حالت تاریک"}
        </span>
      )}
    </button>
  );
}
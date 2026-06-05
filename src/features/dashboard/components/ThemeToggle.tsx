"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-center group-hover:justify-start gap-4 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      <span className="hidden group-hover:inline">{isDarkMode ? "حالت روشن" : "حالت تاریک"}</span>
    </button>
  );
}
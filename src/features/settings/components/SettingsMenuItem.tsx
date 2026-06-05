"use client";

import { ChevronRight } from "lucide-react";
import { MenuItem } from "../types/settings.types";

interface SettingsMenuItemProps {
  item: MenuItem;
}

export default function SettingsMenuItem({ item }: SettingsMenuItemProps) {
  const Icon = item.icon;

  const handleClick = () => {
    if (item.href) {
      window.location.href = item.href;
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <Icon size={16} className="text-gray-500" />
        <span className={`text-sm ${item.danger ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>
          {item.label}
        </span>
      </div>
      <ChevronRight size={14} className="text-gray-400" />
    </button>
  );
}
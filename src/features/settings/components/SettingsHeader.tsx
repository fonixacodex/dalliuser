"use client";

import { X } from "lucide-react";

interface SettingsHeaderProps {
  onClose: () => void;
}

export default function SettingsHeader({ onClose }: SettingsHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
      <h2 className="font-semibold text-gray-800 dark:text-white">تنظیمات</h2>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <X size={16} className="text-gray-500" />
      </button>
    </div>
  );
}
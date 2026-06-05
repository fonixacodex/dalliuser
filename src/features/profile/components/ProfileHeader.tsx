"use client";

 
import { Settings } from "lucide-react";

interface ProfileHeaderProps {
  avatar: string;
  onSettingsClick: () => void;
}

export default function ProfileHeader({ avatar, onSettingsClick }: ProfileHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          پروفایل
        </h1>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
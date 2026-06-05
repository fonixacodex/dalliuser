"use client";

import { Bell } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Bell size={32} className="text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-center">هیچ اعلانی وجود ندارد</p>
    </div>
  );
}
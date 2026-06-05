"use client";

import { Search, Image } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {searchQuery ? (
        <>
          <Search size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-center">
          هیچ نتیجه‌ای برای "{searchQuery}" یافت نشد
          </p>
        </>
      ) : (
        <>
          <Image size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-center">
          پستی وجود ندارد
          </p>
        </>
      )}
    </div>
  );
}
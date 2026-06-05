"use client";

import { Search, X } from "lucide-react";
import { useSearch } from "../hooks/useSearch";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { query, isTyping, handleChange, handleClear } = useSearch(onSearch, 500);

  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <div className="relative max-w-full mx-auto">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="جستجو در اکسپلور..."
          className="w-full pr-10 pl-10 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
        />
        {isTyping && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {query && !isTyping && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
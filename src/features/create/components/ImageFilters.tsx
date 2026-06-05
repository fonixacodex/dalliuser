"use client";

import { FilterType, Filter } from "../types/create.types";

interface ImageFiltersProps {
  selected: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: Filter[] = [
  { name: "عادی", value: "normal", style: "" },
  { name: "کلرندون", value: "clarendon", style: "contrast(1.2) brightness(1.1)" },
  { name: "گینگهام", value: "gingham", style: "sepia(0.2) brightness(1.05)" },
  { name: "مون", value: "moon", style: "grayscale(1) contrast(1.1)" },
  { name: "لارک", value: "lark", style: "saturate(1.2) brightness(1.05)" },
  { name: "ریس", value: "reyes", style: "sepia(0.3) brightness(0.95)" },
  { name: "جونو", value: "juno", style: "contrast(1.1) saturate(1.3)" },
  { name: "اسلامبر", value: "slumber", style: "sepia(0.2) brightness(0.95)" },
];

export default function ImageFilters({ selected, onChange }: ImageFiltersProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 p-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              selected === filter.value
                ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-pink-400 rounded-lg" />
              <div
                className="absolute inset-0 rounded-lg"
                style={{ filter: filter.style }}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
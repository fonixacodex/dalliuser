"use client";

import { AspectRatio } from "../types/create.types";
import { Square, Tv, RectangleHorizontal, RectangleVertical } from "lucide-react";

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const ratios: { value: AspectRatio; label: string; icon: any }[] = [
  { value: "1:1", label: "۱:۱", icon: Square },
  { value: "4:5", label: "۴:۵", icon: RectangleVertical },
  { value: "16:9", label: "۱۶:۹", icon: Tv },
  { value: "9:16", label: "۹:۱۶", icon: RectangleHorizontal },
];

export default function AspectRatioSelector({ selected, onChange }: AspectRatioSelectorProps) {
  return (
    <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {ratios.map((ratio) => {
        const Icon = ratio.icon;
        const isSelected = selected === ratio.value;
        return (
          <button
            key={ratio.value}
            onClick={() => onChange(ratio.value)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg transition-all ${
              isSelected
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Icon size={16} />
            <span className="text-sm">{ratio.label}</span>
          </button>
        );
      })}
    </div>
  );
}
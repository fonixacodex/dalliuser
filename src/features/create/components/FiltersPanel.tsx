"use client";

import { Sun, Contrast, Droplet, Thermometer } from "lucide-react";

interface FiltersPanelProps {
  settings: {
    brightness: number;
    contrast: number;
    saturation: number;
    temperature: number;
  };
  onChange: (key: string, value: number) => void;
}

export default function FiltersPanel({ settings, onChange }: FiltersPanelProps) {
  const controls = [
    { key: "brightness", label: "روشنایی", icon: Sun, min: -1, max: 1, step: 0.01 },
    { key: "contrast", label: "کنتراست", icon: Contrast, min: -1, max: 1, step: 0.01 },
    { key: "saturation", label: "اشباع", icon: Droplet, min: -1, max: 1, step: 0.01 },
    { key: "temperature", label: "دما", icon: Thermometer, min: -1, max: 1, step: 0.01 },
  ];

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      {controls.map((control) => {
        const Icon = control.icon;
        const value = settings[control.key as keyof typeof settings];
        return (
          <div key={control.key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{control.label}</span>
              </div>
              <span className="text-xs text-gray-500">{Math.round(value * 100)}%</span>
            </div>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={value}
              onChange={(e) => onChange(control.key, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
}
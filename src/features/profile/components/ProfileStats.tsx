"use client";

import { ProfileStats as StatsType } from "../types/profile.types";

interface ProfileStatsProps {
  stats: StatsType;
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { label: "پست‌ها", value: stats.posts },
    { label: "دنبال‌کننده", value: stats.followers },
    { label: "دنبال‌شونده", value: stats.following },
  ];

  return (
    <div className="flex justify-around mb-4">
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {item.value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
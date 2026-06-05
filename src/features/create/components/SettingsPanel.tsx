"use client";

import { MessageCircle, Heart, Share2, Shield } from "lucide-react";
import { PostSettings } from "../types/create.types";

interface SettingsPanelProps {
  settings: PostSettings;
  onChange: (settings: PostSettings) => void;
}

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  const updateSetting = (key: keyof PostSettings, value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  const options = [
    { key: "disableComments", label: "غیرفعال کردن کامنت‌ها", icon: MessageCircle, description: "هیچ کسی نمی‌تواند کامنت بگذارد" },
    { key: "disableLikes", label: "غیرفعال کردن لایک", icon: Heart, description: "تعداد لایک‌ها نمایش داده نشود" },
    { key: "allowSharing", label: "اجازه اشتراک‌گذاری", icon: Share2, description: "دیگران بتوانند پست شما را به اشتراک بگذارند" },
    { key: "ageRestriction", label: "محدودیت سنی", icon: Shield, description: "فقط بالای ۱۸ سال ببینند" },
  ];

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">تنظیمات پیشرفته</h3>
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <div key={option.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{option.label}</p>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting(option.key as keyof PostSettings, !settings[option.key as keyof PostSettings])}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                settings[option.key as keyof PostSettings] ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  settings[option.key as keyof PostSettings] ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
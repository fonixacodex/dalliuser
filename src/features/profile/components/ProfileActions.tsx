"use client";

import { Edit3, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileActionsProps {
  isFollowing: boolean;
  onFollow: () => void;
  onEdit: () => void;
  onShare: () => void;
}

export default function ProfileActions({ isFollowing, onFollow, onEdit, onShare }: ProfileActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://dalli.ir/dali");
    setCopied(true);
    toast.success("لینک پروفایل کپی شد");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onFollow}
        className={`flex-1 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
          isFollowing
            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isFollowing ? "دنبال می‌کنید" : "دنبال کردن"}
      </button>
      <button
        onClick={onEdit}
        className="flex-1 py-1.5 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
      >
        <Edit3 size={14} />
        <span>ویرایش</span>
      </button>
      <button
        onClick={onShare}
        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <Share2 size={18} />
      </button>
      <button
        onClick={handleCopyLink}
        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
      </button>
    </div>
  );
}
"use client";

import { useRef, useEffect } from "react";
import { MoreHorizontal, Flag, EyeOff, Copy, UserX } from "lucide-react";
import toast from "react-hot-toast";

interface PostDropdownProps {
  postId: number;
  username: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function PostDropdown({ postId, username, isOpen, onToggle }: PostDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://dalli.ir/p/${postId}`);
    toast.success("لینک پست کپی شد ");
    onToggle();
  };

  const handleNotInterested = () => {
    toast.success("پست از فید شما حذف شد 👌");
    onToggle();
  };

  const handleReport = () => {
    toast.success("گزارش شما ثبت شد. تیم ما بررسی می‌کند ");
    onToggle();
  };

  const handleBlockUser = () => {
    toast.success(`${username} مسدود شد 🔒`);
    onToggle();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-8 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
          <div className="py-1">
            <button
              onClick={handleNotInterested}
              className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <EyeOff size={18} />
              <span>عدم علاقه به این پست</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <Copy size={18} />
              <span>کپی لینک پست</span>
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={handleReport}
              className="w-full px-4 py-2.5 text-right text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
            >
              <Flag size={18} />
              <span>گزارش پست</span>
            </button>
            
            <button
              onClick={handleBlockUser}
              className="w-full px-4 py-2.5 text-right text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
            >
              <UserX size={18} />
              <span>مسدود کردن {username}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
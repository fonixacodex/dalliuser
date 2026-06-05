"use client";

import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

interface PostActionsProps {
  postId: number;
  isLiked: boolean;
  isSaved: boolean;
  likesCount: number;
  onLike: () => void;
  onSave: () => void;
  onCommentClick: () => void;
  onShare: () => void;
}

export default function PostActions({
  postId,
  isLiked,
  isSaved,
  likesCount,
  onLike,
  onSave,
  onCommentClick,
  onShare,
}: PostActionsProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(`https://dalli.ir/p/${postId}`);
    toast.success("لینک پست کپی شد ");
    onShare();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between mb-2">
        <div className="flex gap-4">
          <button onClick={onLike} className="transition-transform hover:scale-110">
            <Heart
              size={22}
              fill={isLiked ? "#EF4444" : "none"}
              className={isLiked ? "text-red-500" : "text-gray-700 dark:text-gray-300"}
            />
          </button>
          <button onClick={onCommentClick} className="transition-transform hover:scale-110">
            <MessageCircle size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button onClick={handleShare} className="transition-transform hover:scale-110">
            <Send size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <button onClick={onSave} className="transition-transform hover:scale-110">
          <Bookmark
            size={22}
            fill={isSaved ? "#3B82F6" : "none"}
            className={isSaved ? "text-blue-500" : "text-gray-700 dark:text-gray-300"}
          />
        </button>
      </div>

      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
        {likesCount.toLocaleString()} لایک
      </p>
    </div>
  );
}
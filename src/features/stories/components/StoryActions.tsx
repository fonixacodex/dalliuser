"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, Share2, Download, Flag, Link2 } from "lucide-react";
import toast from "react-hot-toast";

interface StoryActionsProps {
  storyId: number;
  username: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onReport?: () => void;
}

export default function StoryActions({ 
  storyId, 
  username, 
  onLike, 
  onComment, 
  onShare, 
  onSave, 
  onDownload, 
  onReport 
}: StoryActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
    toast.success(isLiked ? "لایک برداشته شد" : "لایک شد ");
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
    toast.success(isSaved ? "از ذخیره خارج شد" : "در استوری‌های ذخیره شده اضافه شد ");
  };

  const handleShare = () => {
    onShare?.();
    navigator.clipboard.writeText(`https://dalli.ir/story/${storyId}`);
    toast.success("لینک استوری کپی شد  ");
  };

  const handleDownload = () => {
    onDownload?.();
    toast.success("در حال دانلود استوری... ");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://dalli.ir/story/${storyId}`);
    toast.success("لینک استوری کپی شد 🔗");
    setShowMore(false);
  };

  const handleReport = () => {
    onReport?.();
    toast.success(`گزارش استوری ${username} ثبت شد `);
    setShowMore(false);
  };

  const handleSendMessage = () => {
    toast.success("پیام خصوصی برای کاربر ارسال شد ");
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 z-10 px-4">
      {/* دکمه‌های اصلی */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors group"
            aria-label="لایک"
          >
            <Heart 
              size={20} 
              className={`transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-white group-hover:text-red-400"}`} 
            />
            {likesCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] text-white bg-red-500 rounded-full px-1">
                {likesCount}
              </span>
            )}
          </button>
          
          <button
            onClick={onComment}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors group"
            aria-label="کامنت"
          >
            <MessageCircle size={20} className="text-white group-hover:text-blue-400" />
          </button>
          
          <button
            onClick={handleSendMessage}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors group"
            aria-label="پیام"
          >
            <Send size={20} className="text-white group-hover:text-green-400" />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors group"
            aria-label="اشتراک"
          >
            <Share2 size={20} className="text-white group-hover:text-blue-400" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            aria-label="ذخیره"
          >
            <Bookmark size={20} className={isSaved ? "text-yellow-500 fill-yellow-500" : "text-white"} />
          </button>
          
      
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              aria-label="بیشتر"
            >
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </button>
            
            
            {showMore && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowMore(false)} />
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-30">
                  <button
                    onClick={handleDownload}
                    className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Download size={16} />
                    <span>دانلود استوری</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Link2 size={16} />
                    <span>کپی لینک</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleReport}
                    className="w-full px-4 py-2.5 text-right text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                  >
                    <Flag size={16} />
                    <span>گزارش استوری</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

 
      {likesCount > 0 && (
        <div className="mt-3 text-right">
          <p className="text-xs text-white/60">
            {likesCount} نفر این استوری را لایک کرده‌اند
          </p>
        </div>
      )}
    </div>
  );
}
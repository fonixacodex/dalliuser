"use client";

import { useState } from "react";
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Flag, UserX, Share2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { formatLikes } from "../utils/explore.utils";

interface PostModalProps {
  post: {
    id: number;
    username: string;
    userAvatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
  };
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
      toast.success("لایک برداشته شد");
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      toast.success("پست لایک شد  ");
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "از ذخیره خارج شد" : "پست ذخیره شد  ");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://dalli.ir/p/${post.id}`);
    toast.success("لینک پست کپی شد  ");
  };

  const handleReport = () => {
    toast.success("گزارش شما ثبت شد  ");
    setShowDropdown(false);
    onClose();
  };

  const handleBlockUser = () => {
    toast.success(`${post.username} مسدود شد  `);
    setShowDropdown(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
      
          <div className="md:w-3/5 bg-black">
            <div className="relative aspect-square md:aspect-auto md:h-[80vh]">
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </div>

        
          <div className="md:w-2/5 flex flex-col bg-white dark:bg-gray-900">
         
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
                    <Image
                      src={post.userAvatar}
                      alt={post.username}
                      width={28}
                      height={28}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{post.username}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full"
                >
                  <MoreHorizontal size={18} />
                </button>
                {showDropdown && (
                  <div className="absolute left-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-10 overflow-hidden">
                    <button
                      onClick={handleReport}
                      className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Flag size={14} /> گزارش
                    </button>
                    <button
                      onClick={handleBlockUser}
                      className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <UserX size={14} /> مسدود کردن
                    </button>
                  </div>
                )}
              </div>
            </div>

       
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
       
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
                    <Image
                      src={post.userAvatar}
                      alt={post.username}
                      width={28}
                      height={28}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </p>
                </div>
              </div>

           
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0 flex items-center justify-center text-xs font-bold">
                  ع
                </div>
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">علی_رضایی</span> عالی بود! 😍
                  </p>
                  <p className="text-xs text-gray-500 mt-1">۲ ساعت پیش</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0 flex items-center justify-center text-xs font-bold">
                  س
                </div>
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">سارا_محمدی</span> دستت درد نکنه 👏
                  </p>
                  <p className="text-xs text-gray-500 mt-1">۱ ساعت پیش</p>
                </div>
              </div>
            </div>

 
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                  <button onClick={handleLike} className="transition-transform hover:scale-110">
                    <Heart
                      size={24}
                      fill={liked ? "#EF4444" : "none"}
                      className={liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"}
                    />
                  </button>
                  <button className="transition-transform hover:scale-110">
                    <MessageCircle size={24} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button onClick={handleShare} className="transition-transform hover:scale-110">
                    <Send size={24} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                <button onClick={handleSave} className="transition-transform hover:scale-110">
                  <Bookmark
                    size={24}
                    fill={saved ? "#3B82F6" : "none"}
                    className={saved ? "text-blue-500" : "text-gray-700 dark:text-gray-300"}
                  />
                </button>
              </div>

              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {formatLikes(likesCount)} لایک
              </p>
              <p className="text-xs text-gray-400">{post.timestamp}</p>

   
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                <input
                  type="text"
                  placeholder="کامنت خود را بنویسید..."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button className="text-sm text-blue-500 font-semibold">
                  ارسال
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
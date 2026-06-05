"use client";

import { X, Volume2, VolumeX, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StoryHeaderProps {
  username: string;
  avatar: string;
  timestamp: string;
  onClose: () => void;
  onMuteToggle?: () => void;
  isMuted?: boolean;
}

export default function StoryHeader({ 
  username, 
  avatar, 
  timestamp, 
  onClose, 
  onMuteToggle, 
  isMuted = false 
}: StoryHeaderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-linear-to-b from-black/60 to-transparent">
      <div className="flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-black p-0.5">
              {!imageError ? (
                <Image
                  src={avatar}
                  alt={username}
                  width={36}
                  height={36}
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  {username[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{username}</p>
            <p className="text-white/60 text-xs">{timestamp}</p>
          </div>
        </div>
        
      
        <div className="flex items-center gap-2">
          {onMuteToggle && (
            <button
              onClick={onMuteToggle}
              className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              aria-label={isMuted ? "فعال کردن صدا" : "غیرفعال کردن صدا"}
            >
              {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
            </button>
          )}
          <button
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            aria-label="بیشتر"
          >
            <MoreHorizontal size={18} className="text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            aria-label="بستن"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
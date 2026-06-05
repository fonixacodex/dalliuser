"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import PostDropdown from "./PostDropdown";

interface PostHeaderProps {
  postId: number;
  username: string;
  userAvatar: string;
  timestamp: string;
}

export default function PostHeader({ postId, username, userAvatar, timestamp }: PostHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-0.5">
            {!avatarError ? (
              <Image
                src={userAvatar}
                alt={username}
                width={28}
                height={28}
                className="w-full h-full rounded-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-xs font-bold">
                {username[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
        </div>
        <div>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">
            {username}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 block">
            {timestamp}
          </span>
        </div>
      </div>

      <PostDropdown 
        postId={postId} 
        username={username} 
        isOpen={showDropdown} 
        onToggle={() => setShowDropdown(!showDropdown)} 
      />
    </div>
  );
}
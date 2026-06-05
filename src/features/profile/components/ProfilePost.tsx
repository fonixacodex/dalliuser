"use client";

import Image from "next/image";
import { Heart, MessageCircle, Film } from "lucide-react";
import { ProfilePost as ProfilePostType } from "../types/profile.types";

interface ProfilePostProps {
  post: ProfilePostType;
}

export default function ProfilePost({ post }: ProfilePostProps) {
  return (
    <button className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden group">
      <Image
        src={post.image}
        alt={`Post ${post.id}`}
        fill
        sizes="33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {post.type === "video" && (
        <div className="absolute top-2 right-2">
          <Film size={16} className="text-white drop-shadow-md" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-white">
          <Heart size={16} fill="white" />
          <span className="text-xs font-semibold">{post.likes}</span>
        </div>
        <div className="flex items-center gap-1 text-white">
          <MessageCircle size={16} />
          <span className="text-xs font-semibold">{post.comments}</span>
        </div>
      </div>
    </button>
  );
}
"use client";

import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { formatLikes } from "../utils/explore.utils";

interface ExplorePostProps {
  post: {
    id: number;
    username: string;
    userAvatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
    width: number;
    height: number;
  };
  onClick: () => void;
}

export default function ExplorePost({ post, onClick }: ExplorePostProps) {
  return (
    <button
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 w-full"
      style={{ aspectRatio: `${post.width}/${post.height}` }}
    >
      <Image
        src={post.image}
        alt={post.caption}
        fill
        sizes="(max-width: 768px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
 
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1 text-white">
          <Heart size={20} fill="white" />
          <span className="text-sm font-semibold">{formatLikes(post.likes)}</span>
        </div>
        <div className="flex items-center gap-1 text-white">
          <MessageCircle size={20} />
          <span className="text-sm font-semibold">{post.comments}</span>
        </div>
      </div>
    </button>
  );
}
"use client";

import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard";

export default function PostsList() {
  const { posts, isLoading, likePost, savePost } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
            <div className="flex gap-4 mb-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">هیچ پستی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={likePost}
          onSave={savePost}
        />
      ))}
    </div>
  );
}
"use client";

import { ProfilePost as ProfilePostType } from "../types/profile.types";
import ProfilePost from "./ProfilePost";

interface ProfileGridProps {
  posts: ProfilePostType[];
}

export default function ProfileGrid({ posts }: ProfileGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 dark:text-gray-400">هیچ پستی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 bg-gray-50 dark:bg-gray-900">
      {posts.map((post) => (
        <ProfilePost key={post.id} post={post} />
      ))}
    </div>
  );
}
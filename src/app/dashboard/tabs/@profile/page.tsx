"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileAvatar from "@/features/profile/components/ProfileAvatar";
import ProfileStats from "@/features/profile/components/ProfileStats";
import ProfileActions from "@/features/profile/components/ProfileActions";
import ProfileBio from "@/features/profile/components/ProfileBio";
import Highlights from "@/features/profile/components/Highlights";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import ProfileGrid from "@/features/profile/components/ProfileGrid";
import SettingsDrawer from "@/features/settings/components/SettingsDrawer";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { useProfilePosts } from "@/features/profile/hooks/useProfilePosts";

export default function ProfilePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, stats, isLoading, isFollowing, handleFollow } = useProfile();
  const { activeTab, setActiveTab, posts, isLoading: postsLoading } = useProfilePosts();

  const handleEditProfile = () => {
    toast.success("ویرایش پروفایل باز شد");
  };

  const handleShare = () => {
    toast.success("لینک پروفایل برای اشتراک‌گذاری کپی شد");
  };

  if (isLoading || !user || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader avatar={user.avatar} onSettingsClick={() => setIsSettingsOpen(true)} />
        
        <div className="bg-white dark:bg-gray-800 px-4 pt-6 pb-4">
          <div className="flex gap-4">
            <ProfileAvatar avatar={user.avatar} />
            <div className="flex-1">
              <ProfileStats stats={stats} />
              <ProfileActions
                isFollowing={isFollowing}
                onFollow={handleFollow}
                onEdit={handleEditProfile}
                onShare={handleShare}
              />
            </div>
          </div>
          <ProfileBio user={user} />
        </div>

        <Highlights />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {postsLoading ? (
          <div className="grid grid-cols-3 gap-0.5 p-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        ) : (
          <ProfileGrid posts={posts} />
        )}
      </div>

      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
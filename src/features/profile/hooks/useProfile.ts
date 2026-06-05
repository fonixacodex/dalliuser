"use client";

import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import { ProfileUser, ProfileStats } from "../types/profile.types";
import toast from "react-hot-toast";

export const useProfile = () => {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userData, statsData] = await Promise.all([
          profileService.getUser(),
          profileService.getStats(),
        ]);
        setUser(userData);
        setStats(statsData);
        setIsFollowing(userData.isFollowing);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFollow = async () => {
    if (!user) return;
    
    if (isFollowing) {
      const success = await profileService.unfollowUser(user.id);
      if (success) {
        setIsFollowing(false);
        setStats(prev => prev ? { ...prev, followers: prev.followers - 1 } : null);
        toast.success("دنبال نکردن");
      }
    } else {
      const success = await profileService.followUser(user.id);
      if (success) {
        setIsFollowing(true);
        setStats(prev => prev ? { ...prev, followers: prev.followers + 1 } : null);
        toast.success("شروع به دنبال کردن");
      }
    }
  };

  return {
    user,
    stats,
    isLoading,
    isFollowing,
    handleFollow,
  };
};
"use client";

import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import { ProfilePost, TabType } from "../types/profile.types";

export const useProfilePosts = () => {
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [posts, setPosts] = useState<ProfilePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await profileService.getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return {
    activeTab,
    setActiveTab,
    posts,
    isLoading,
  };
};
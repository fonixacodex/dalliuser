"use client";

import { useState, useEffect } from "react";
import { Post } from "../types/posts.types";

const mockPosts: Post[] = [
  {
    id: 1,
    username: "سارا_محمدی",
    userAvatar: "/post/1.webp",
    image: "/post/1.webp",
    caption: "چه روز قشنگی! امروز هوا خیلی عالی بود 😍",
    likes: 1234,
    comments: 89,
    timestamp: "۲ ساعت پیش",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    username: "رضا_احمدی",
    userAvatar: "/post/2.webp",
    image: "/post/2.webp",
    caption: "تازه‌ترین پروژه‌ام رو رونمایی کردم 🚀",
    likes: 3456,
    comments: 234,
    timestamp: "۵ ساعت پیش",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 3,
    username: "مریم_حسینی",
    userAvatar: "/post/3.webp",
    image: "/post/3.webp",
    caption: "غروب دل‌انگیز امروز 🌅",
    likes: 7890,
    comments: 567,
    timestamp: "دیروز",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 4,
    username: "علی_کریمی",
    userAvatar: "/post/4.webp",
    image: "/post/4.webp",
    caption: "لحظاتی که تکرار نمی‌شن 📸",
    likes: 234,
    comments: 45,
    timestamp: "۲ روز پیش",
    isLiked: false,
    isSaved: false,
  },
];

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
 
    const fetchPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(mockPosts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const updatePost = (postId: number, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const likePost = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: post.likes + (isLiked ? 1 : -1),
        };
      }
      return post;
    }));
  };

  const savePost = (postId: number) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  return {
    posts,
    isLoading,
    likePost,
    savePost,
    updatePost,
  };
};
"use client";

import { useState, useEffect, useCallback } from "react";
import { ExplorePost } from "../types/explore.types";
import { exploreService } from "../services/explore.service";

export const useExplore = () => {
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = useCallback(async (pageNum: number, reset: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await exploreService.getPosts(pageNum, 12);
      if (reset) {
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }
      setHasMore(response.hasMore);
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // لود اولیه
  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  // لود مجدد با جستجو
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts(1, true);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchPosts(page, false);
    }
  }, [isLoading, hasMore, page, fetchPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = filterPostsByQuery(posts, searchQuery);

  return {
    posts: filteredPosts,
    isLoading,
    hasMore,
    loadMore,
    handleSearch,
    searchQuery,
  };
};

 
const filterPostsByQuery = (posts: ExplorePost[], query: string): ExplorePost[] => {
  if (!query.trim()) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.username.toLowerCase().includes(lowerQuery) ||
      post.caption.toLowerCase().includes(lowerQuery)
  );
};
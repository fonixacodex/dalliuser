"use client";

import SearchBar from "@/features/explore/components/SearchBar";
import ExploreGrid from "@/features/explore/components/ExploreGrid";
import { useExplore } from "@/features/explore/hooks/useExplore";

export default function ExplorePage() {
  const { posts, isLoading, handleSearch, searchQuery } = useExplore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SearchBar onSearch={handleSearch} />
      <ExploreGrid 
        posts={posts} 
        isLoading={isLoading} 
        searchQuery={searchQuery} 
      />
    </div>
  );
}
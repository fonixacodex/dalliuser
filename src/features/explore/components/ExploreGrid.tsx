"use client";

import { useState } from "react";
import ExplorePost from "./ExplorePost";
import PostModal from "./PostModal";
import { getColumnPosts } from "../utils/explore.utils";
import { ExplorePost as ExplorePostType } from "../types/explore.types";
import EmptyState from "./EmptyState";

interface ExploreGridProps {
  posts: ExplorePostType[];
  isLoading?: boolean;
  searchQuery?: string;
}

export default function ExploreGrid({ posts, isLoading, searchQuery }: ExploreGridProps) {
  const [selectedPost, setSelectedPost] = useState<ExplorePostType | null>(null);

  if (isLoading && posts.length === 0) {
    return (
      <div className="px-4 py-4">
        <div className="flex gap-1 max-w-6xl mx-auto">
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex-1 space-y-1">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" style={{ aspectRatio: "1/1" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  const columns = getColumnPosts(posts, 3);

  return (
    <>
      <div className="px-4 py-4">
        <div className="flex gap-1 max-w-6xl mx-auto">
     
          <div className="flex-1 space-y-1">
            {columns[0]?.map((post) => (
              <ExplorePost key={post.id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
          
 
          <div className="flex-1 space-y-1">
            {columns[1]?.map((post) => (
              <ExplorePost key={post.id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
          
      
          <div className="flex-1 space-y-1">
            {columns[2]?.map((post) => (
              <ExplorePost key={post.id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
        </div>
      </div>

 
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}
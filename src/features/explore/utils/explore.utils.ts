import { ExplorePost } from "../types/explore.types";

 
export const getColumnPosts = (posts: ExplorePost[], columnCount: number = 3): ExplorePost[][] => {
  const columns: ExplorePost[][] = Array(columnCount).fill(null).map(() => []);
  posts.forEach((post, index) => {
    columns[index % columnCount].push(post);
  });
  return columns;
};

 
export const filterPostsByQuery = (posts: ExplorePost[], query: string): ExplorePost[] => {
  if (!query.trim()) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.username.toLowerCase().includes(lowerQuery) ||
      post.caption.toLowerCase().includes(lowerQuery)
  );
};

 
export const formatLikes = (likes: number): string => {
  if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
  if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`;
  return likes.toString();
};

 
export const getAspectRatio = (width: number, height: number): number => {
  return height / width;
};
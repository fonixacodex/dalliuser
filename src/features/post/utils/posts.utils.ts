import { Post, Comment } from "../types/posts.types";

 
export const formatLikes = (likes: number): string => {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1) + "M";
  }
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + "K";
  }
  return likes.toString();
};

 
export const getRelativeTime = (timestamp: string | Date): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "لحظاتی پیش";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقیقه پیش`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعت پیش`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} روز پیش`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} هفته پیش`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} ماه پیش`;
  return `${Math.floor(diffInSeconds / 31536000)} سال پیش`;
};

 
export const truncateCaption = (caption: string, maxLength: number = 150): string => {
  if (caption.length <= maxLength) return caption;
  return caption.slice(0, maxLength) + "...";
};

 
export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[\w\u0600-\u06FF]+/g;
  return text.match(hashtagRegex) || [];
};

 
export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@[\w\u0600-\u06FF]+/g;
  return text.match(mentionRegex) || [];
};

 
export const sortPosts = (posts: Post[], sortBy: "latest" | "oldest" | "mostLiked" | "mostCommented"): Post[] => {
  const sorted = [...posts];
  switch (sortBy) {
    case "latest":
      return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    case "mostLiked":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "mostCommented":
      return sorted.sort((a, b) => b.comments - a.comments);
    default:
      return sorted;
  }
};

 
export const filterPostsBySearch = (posts: Post[], searchTerm: string): Post[] => {
  if (!searchTerm.trim()) return posts;
  const term = searchTerm.toLowerCase();
  return posts.filter(
    (post) =>
      post.username.toLowerCase().includes(term) ||
      post.caption.toLowerCase().includes(term) ||
      extractHashtags(post.caption).some(tag => tag.toLowerCase().includes(term))
  );
};

 
export const filterPostsByDate = (posts: Post[], startDate?: Date, endDate?: Date): Post[] => {
  return posts.filter((post) => {
    const postDate = new Date(post.timestamp);
    if (startDate && postDate < startDate) return false;
    if (endDate && postDate > endDate) return false;
    return true;
  });
};

 
export const getPostsStats = (posts: Post[]) => {
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const averageLikes = posts.length > 0 ? totalLikes / posts.length : 0;
  const averageComments = posts.length > 0 ? totalComments / posts.length : 0;
  const mostLikedPost = posts.length > 0 ? posts.reduce((max, post) => post.likes > max.likes ? post : max, posts[0]) : null;
  const mostCommentedPost = posts.length > 0 ? posts.reduce((max, post) => post.comments > max.comments ? post : max, posts[0]) : null;

  return {
    totalPosts: posts.length,
    totalLikes,
    totalComments,
    averageLikes: Math.round(averageLikes),
    averageComments: Math.round(averageComments),
    mostLikedPost,
    mostCommentedPost,
  };
};

 
export const isValidComment = (comment: string): boolean => {
  return comment.trim().length > 0 && comment.trim().length <= 500;
};

 
export const filterInappropriateComments = (comments: Comment[]): Comment[] => {
  const badWords = ["کثیف", "زشت", "بد"];
  return comments.filter(comment => {
    const lowerText = comment.text.toLowerCase();
    return !badWords.some(word => lowerText.includes(word));
  });
};

 
export const sortComments = (comments: Comment[], sortBy: "latest" | "oldest" | "mostLiked"): Comment[] => {
  const sorted = [...comments];
  switch (sortBy) {
    case "latest":
      return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    case "mostLiked":
      return sorted.sort((a, b) => b.likes - a.likes);
    default:
      return sorted;
  }
};

 
export const groupPostsByDate = (posts: Post[]): Record<string, Post[]> => {
  const groups: Record<string, Post[]> = {};
  
  posts.forEach(post => {
    const date = new Date(post.timestamp).toLocaleDateString("fa-IR");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
  });
  
  return groups;
};

 
export const getShareText = (post: Post): string => {
  return `${post.caption}\n\nhttps://dali.ir/p/${post.id}`;
};

 
export const isPostOwner = (post: Post, currentUserId: number): boolean => {
  return post.userId === currentUserId;
};

 
export const getPostShareLink = (postId: number): string => {
  return `https://dali.ir/p/${postId}`;
};
 
export const copyPostLink = async (postId: number): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(getPostShareLink(postId));
    return true;
  } catch {
    return false;
  }
};

 
export const getRandomAvatarColor = (username: string): string => {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
  ];
  const index = username.length % colors.length;
  return colors[index];
};

 
export const isValidImage = (file: File): boolean => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize;
};

 
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
import { ProfilePost, ProfileStats, ProfileUser } from "../types/profile.types";
 
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

 
export const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "لحظاتی پیش";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقیقه پیش`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعت پیش`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} روز پیش`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} هفته پیش`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} ماه پیش`;
  return `${Math.floor(diffInSeconds / 31536000)} سال پیش`;
};

 
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_\u0600-\u06FF]{3,30}$/;
  return usernameRegex.test(username);
};

 
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

 
export const truncateBio = (bio: string, maxLength: number = 150): string => {
  if (bio.length <= maxLength) return bio;
  return bio.slice(0, maxLength) + "...";
};

 
export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[\w\u0600-\u06FF]+/g;
  return text.match(hashtagRegex) || [];
};

 
export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@[\w\u0600-\u06FF]+/g;
  return text.match(mentionRegex) || [];
};

 
export const getProfileCompletion = (user: ProfileUser): number => {
  let completed = 0;
  let total = 5;

  if (user.name && user.name !== "") completed++;
  if (user.bio && user.bio !== "") completed++;
  if (user.avatar && user.avatar !== "/default-avatar.png") completed++;
  if (user.website && user.website !== "") completed++;
  
  return Math.round((completed / total) * 100);
};

 
export const sortPosts = (posts: ProfilePost[], sortBy: "latest" | "oldest" | "mostLiked" | "mostCommented"): ProfilePost[] => {
  const sorted = [...posts];
  switch (sortBy) {
    case "latest":
      return sorted.sort((a, b) => b.id - a.id);
    case "oldest":
      return sorted.sort((a, b) => a.id - b.id);
    case "mostLiked":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "mostCommented":
      return sorted.sort((a, b) => b.comments - a.comments);
    default:
      return sorted;
  }
};

 
export const filterPostsByType = (posts: ProfilePost[], type: "all" | "image" | "video"): ProfilePost[] => {
  if (type === "all") return posts;
  return posts.filter(post => post.type === type);
};

 
export const getPostsStats = (posts: ProfilePost[]) => {
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const averageLikes = posts.length > 0 ? totalLikes / posts.length : 0;
  const averageComments = posts.length > 0 ? totalComments / posts.length : 0;
  const videoCount = posts.filter(post => post.type === "video").length;
  const imageCount = posts.filter(post => post.type === "image").length;

  return {
    totalLikes,
    totalComments,
    averageLikes: Math.round(averageLikes),
    averageComments: Math.round(averageComments),
    videoCount,
    imageCount,
  };
};

 
export const getRandomAvatarColor = (username: string): string => {
  const colors = [
    "from-red-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-indigo-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
  ];
  const index = username.length % colors.length;
  return colors[index];
};

 
export const saveProfileSettings = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    const settings = JSON.parse(localStorage.getItem("profile_settings") || "{}");
    settings[key] = value;
    localStorage.setItem("profile_settings", JSON.stringify(settings));
  }
};

 
export const getProfileSettings = (key: string): any => {
  if (typeof window !== "undefined") {
    const settings = JSON.parse(localStorage.getItem("profile_settings") || "{}");
    return settings[key];
  }
  return null;
};

 
export const isUserOnline = (lastSeen: Date): boolean => {
  const now = new Date();
  const diffInMinutes = (now.getTime() - lastSeen.getTime()) / 1000 / 60;
  return diffInMinutes < 5;
};

 
export const formatPostDate = (date: Date | string): string => {
  const d = new Date(date);
  const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  
  return `${d.getDate()} ${persianMonths[d.getMonth()]} ${d.getFullYear()}`;
};
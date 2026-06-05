import { ProfilePost, ProfileStats, ProfileUser } from "../types/profile.types";

// دیتای نمونه
const mockUser: ProfileUser = {
  id: 1,
  username: "dali",
  name: "دالی | Dali",
  avatar: "/logo/org.png",
  bio: "دالی رو یه پلتفرم اجتماعی برای به اشتراک‌گذاری لحظات ناب و ارتباط با افراد خلاق 🌟",
  website: "https://dalli.ir",
  isVerified: true,
  isFollowing: false,
};

const mockStats: ProfileStats = {
  posts: 7,
  followers: 5,
  following: 14,
};

const mockPosts: ProfilePost[] = [
  { id: 1, image: "/post/1.webp", type: "image", likes: 1234, comments: 89 },
  { id: 2, image: "/post/2.webp", type: "video", likes: 2345, comments: 123 },
  { id: 3, image: "/post/3.webp", type: "image", likes: 3456, comments: 234 },
  { id: 4, image: "/post/1.webp", type: "image", likes: 4567, comments: 345 },
  { id: 5, image: "/post/2.webp", type: "video", likes: 5678, comments: 456 },
  { id: 6, image: "/post/3.webp", type: "image", likes: 6789, comments: 567 },
];

export const profileService = {
  async getUser(): Promise<ProfileUser> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },

  async getStats(): Promise<ProfileStats> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockStats;
  },

  async getPosts(): Promise<ProfilePost[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPosts;
  },

  async followUser(userId: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },

  async unfollowUser(userId: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },
};
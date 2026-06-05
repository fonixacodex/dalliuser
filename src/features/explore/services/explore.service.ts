import { ExplorePost } from "../types/explore.types";

// دیتای نمونه
const mockPosts: ExplorePost[] = [
  {
    id: 1,
    username: "سارا_محمدی",
    userAvatar: "/post/1.webp",
    image: "/post/1.webp",
    caption: "غروب قشنگ امروز 🌅",
    likes: 1234,
    comments: 89,
    timestamp: "۲ ساعت پیش",
    width: 400,
    height: 500,
  },
  {
    id: 2,
    username: "رضا_احمدی",
    userAvatar: "/post/2.webp",
    image: "/post/2.webp",
    caption: "تازه‌ترین پروژه‌ام 🚀",
    likes: 3456,
    comments: 234,
    timestamp: "۵ ساعت پیش",
    width: 400,
    height: 400,
  },
  {
    id: 3,
    username: "مریم_حسینی",
    userAvatar: "/post/3.webp",
    image: "/post/3.webp",
    caption: "طبیعت زیبا 🏔️",
    likes: 7890,
    comments: 567,
    timestamp: "دیروز",
    width: 400,
    height: 600,
  },
  {
    id: 4,
    username: "علی_کریمی",
    userAvatar: "/post/1.webp",
    image: "/post/1.webp",
    caption: "لحظات قشنگ 📸",
    likes: 234,
    comments: 45,
    timestamp: "۲ روز پیش",
    width: 400,
    height: 350,
  },
  {
    id: 5,
    username: "زهرا_رضایی",
    userAvatar: "/post/2.webp",
    image: "/post/2.webp",
    caption: "قهوه صبح ☕",
    likes: 5678,
    comments: 345,
    timestamp: "۳ روز پیش",
    width: 400,
    height: 480,
  },
  {
    id: 6,
    username: "محمد_نوری",
    userAvatar: "/post/3.webp",
    image: "/post/3.webp",
    caption: "سفر به شمال 🚗",
    likes: 9012,
    comments: 678,
    timestamp: "۴ روز پیش",
    width: 400,
    height: 520,
  },
  {
    id: 7,
    username: "نگار_کاظمی",
    userAvatar: "/post/1.webp",
    image: "/post/1.webp",
    caption: "دوستی ",
    likes: 3456,
    comments: 234,
    timestamp: "۵ روز پیش",
    width: 400,
    height: 450,
  },
  {
    id: 8,
    username: "حسین_مرادی",
    userAvatar: "/post/2.webp",
    image: "/post/2.webp",
    caption: "ورزش روزانه 💪",
    likes: 1234,
    comments: 89,
    timestamp: "۶ روز پیش",
    width: 400,
    height: 380,
  },
  {
    id: 9,
    username: "فاطمه_کریمی",
    userAvatar: "/post/3.webp",
    image: "/post/3.webp",
    caption: "کتاب جدید 📚",
    likes: 5678,
    comments: 345,
    timestamp: "۱ هفته پیش",
    width: 400,
    height: 550,
  },
];

export const exploreService = {
  async getPosts(page: number = 1, limit: number = 12): Promise<{ posts: ExplorePost[]; hasMore: boolean }> {
    // شبیه‌سازی درخواست API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const posts = mockPosts.slice(start, end);
    const hasMore = end < mockPosts.length;
    
    return { posts, hasMore };
  },
};
export type TabType = "posts" | "saved" | "liked";

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export interface ProfileUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  website?: string;
  isVerified: boolean;
  isFollowing: boolean;
}

export interface Highlight {
  id: number;
  title: string;
  icon: any;
  color: string;
}

export interface ProfilePost {
  id: number;
  image: string;
  type: "image" | "video";
  likes: number;
  comments: number;
}
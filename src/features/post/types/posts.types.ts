export interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  userAvatar?: string;
  replies?: Comment[];
}

export interface Post {
  id: number;
  userId?: number;   
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}
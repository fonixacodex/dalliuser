export interface ExplorePost {
  id: number;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  width: number;
  height: number;
}

export interface ExploreState {
  posts: ExplorePost[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  searchQuery: string;
}
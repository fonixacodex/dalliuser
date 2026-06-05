export interface Viewer {
  id: number;
  username: string;
  avatar: string;
  timestamp: string;
}

export interface Story {
  id: number;
  username: string;
  avatar: string;
  storyImage: string;
  hasStory: boolean;
  isUser?: boolean;
  timestamp: string;
  viewers: Viewer[];
  viewCount: number;
}

export interface StoryGroup {
  user: Story;
  stories: Story[];
  currentIndex: number;
}
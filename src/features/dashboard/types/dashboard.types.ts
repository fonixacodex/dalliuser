export type TabType = "home" | "search" | "create" | "notifications" | "profile";

export interface Tab {
  id: TabType;
  label: string;
  icon: any;
 
}

export interface Suggestion {
  id: number;
  name: string;
  username: string;
  avatar: string;
  mutual: number;
}
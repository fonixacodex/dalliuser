export type NotificationTabType = "all" | "follows" | "comments" | "likes";
export type NotificationEventType = "follow" | "comment" | "like" | "mention" | "request";

export interface Notification {
  id: number;
  type: NotificationEventType;
  username: string;
  userAvatar: string;
  action: string;
  target?: string;
  time: string;
  isRead: boolean;
  isFollowRequest?: boolean;
  postImage?: string;
  commentText?: string;
}

export interface NotificationTab {
  id: NotificationTabType;
  label: string;
  count?: number;
}
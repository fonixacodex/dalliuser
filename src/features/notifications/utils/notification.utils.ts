import { NotificationEventType, NotificationTabType, Notification } from "../types/notification.types";
import { UserPlus, Users, MessageCircle, Heart, AtSign, Bell } from "lucide-react";

export const getNotificationIcon = (type: NotificationEventType) => {
  switch (type) {
    case "follow":
      return { icon: UserPlus, color: "text-blue-500" };
    case "request":
      return { icon: Users, color: "text-yellow-500" };
    case "comment":
      return { icon: MessageCircle, color: "text-green-500" };
    case "like":
      return { icon: Heart, color: "text-red-500" };
    case "mention":
      return { icon: AtSign, color: "text-purple-500" };
    default:
      return { icon: Bell, color: "text-gray-500" };
  }
};

export const getTabFilters = (
  notifications: Notification[],
  tab: NotificationTabType
): Notification[] => {
  switch (tab) {
    case "all":
      return notifications;
    case "follows":
      return notifications.filter((n) => n.type === "follow" || n.type === "request");
    case "comments":
      return notifications.filter((n) => n.type === "comment" || n.type === "mention");
    case "likes":
      return notifications.filter((n) => n.type === "like");
    default:
      return notifications;
  }
};

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => !n.isRead).length;
};

export const getRequestCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => n.isFollowRequest).length;
};
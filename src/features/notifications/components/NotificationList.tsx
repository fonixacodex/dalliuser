"use client";

import { Notification } from "../types/notification.types";
import NotificationItem from "./NotificationItem";
import EmptyState from "./EmptyState";
import { getTabFilters } from "../utils/notification.utils";
import { NotificationTabType } from "../types/notification.types";

interface NotificationListProps {
  notifications: Notification[];
  activeTab: NotificationTabType;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onMarkAsRead: (id: number) => void;
  onFollowBack: (username: string) => void;
}

export default function NotificationList({
  notifications,
  activeTab,
  onAccept,
  onReject,
  onMarkAsRead,
  onFollowBack,
}: NotificationListProps) {
  const filteredNotifications = getTabFilters(notifications, activeTab);

  if (filteredNotifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {filteredNotifications.map((notif) => (
        <NotificationItem
          key={notif.id}
          notification={notif}
          onAccept={onAccept}
          onReject={onReject}
          onMarkAsRead={onMarkAsRead}
          onFollowBack={onFollowBack}
        />
      ))}
    </div>
  );
}
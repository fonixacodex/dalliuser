"use client";

import NotificationHeader from "@/features/notifications/components/NotificationHeader";
import NotificationTabs from "@/features/notifications/components/NotificationTabs";
import NotificationList from "@/features/notifications/components/NotificationList";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { getUnreadCount, getRequestCount } from "@/features/notifications/utils/notification.utils";

export default function NotificationsPage() {
  const {
    activeTab,
    setActiveTab,
    notifications,
    handleAcceptRequest,
    handleRejectRequest,
    handleMarkAsRead,
    handleFollowBack,
  } = useNotifications();

  const unreadCount = getUnreadCount(notifications);
  const requestCount = getRequestCount(notifications);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <NotificationHeader unreadCount={unreadCount} />
        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadCount={unreadCount}
          requestCount={requestCount}
        />
        <NotificationList
          notifications={notifications}
          activeTab={activeTab}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
          onMarkAsRead={handleMarkAsRead}
          onFollowBack={handleFollowBack}
        />
      </div>
    </div>
  );
}
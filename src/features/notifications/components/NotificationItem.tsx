"use client";

import { Clock, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Notification } from "../types/notification.types";
import { getNotificationIcon } from "../utils/notification.utils";

interface NotificationItemProps {
  notification: Notification;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onMarkAsRead?: (id: number) => void;
  onFollowBack?: (username: string) => void;
}

export default function NotificationItem({
  notification,
  onAccept,
  onReject,
  onMarkAsRead,
  onFollowBack,
}: NotificationItemProps) {
  const { icon: Icon, color } = getNotificationIcon(notification.type);

  return (
    <div
      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
        !notification.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
      }`}
    >
      <div className="flex gap-3">
        {/* آواتار */}
        <Link href={`/profile/${notification.username}`} className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-0.5">
              <Image
                src={notification.userAvatar}
                alt={notification.username}
                width={36}
                height={36}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </Link>

 
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm">
                <Link href={`/profile/${notification.username}`} className="font-semibold hover:underline">
                  {notification.username}
                </Link>
                <span className="text-gray-600 dark:text-gray-400"> {notification.action} </span>
                {notification.target && (
                  <span className="text-gray-500 dark:text-gray-500">{notification.target}</span>
                )}
              </p>
              {notification.commentText && (
                <p className="text-xs text-gray-500 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg inline-block">
                  "{notification.commentText}"
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Icon size={14} className={color} />
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={10} />
                  {notification.time}
                </span>
              </div>
            </div>

 
            {notification.postImage && (
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={notification.postImage}
                  alt="Post"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
 
          {notification.isFollowRequest && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onAccept?.(notification.id)}
                className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                <Check size={14} /> تایید
              </button>
              <button
                onClick={() => onReject?.(notification.id)}
                className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
              >
                <X size={14} /> حذف
              </button>
            </div>
          )}

          {notification.type === "follow" && !notification.isFollowRequest && (
            <button
              onClick={() => onFollowBack?.(notification.username)}
              className="mt-2 px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              دنبال کردن
            </button>
          )}
        </div>

 
        {!notification.isRead && (
          <button
            onClick={() => onMarkAsRead?.(notification.id)}
            className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"
          />
        )}
      </div>
    </div>
  );
}
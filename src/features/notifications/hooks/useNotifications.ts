"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Notification, NotificationTabType } from "../types/notification.types";

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "request",
    username: "سارا_محمدی",
    userAvatar: "/post/1.webp",
    action: "درخواست دنبال کردن",
    time: "۵ دقیقه پیش",
    isRead: false,
    isFollowRequest: true,
  },
  {
    id: 2,
    type: "request",
    username: "رضا_احمدی",
    userAvatar: "/post/2.webp",
    action: "درخواست دنبال کردن",
    time: "۱۵ دقیقه پیش",
    isRead: false,
    isFollowRequest: true,
  },
  {
    id: 3,
    type: "follow",
    username: "مریم_حسینی",
    userAvatar: "/post/3.webp",
    action: "شما را دنبال کرد",
    time: "۱ ساعت پیش",
    isRead: false,
  },
  {
    id: 4,
    type: "comment",
    username: "علی_کریمی",
    userAvatar: "/post/1.webp",
    action: "به پست شما کامنت گذاشت",
    target: "چه روز قشنگی!",
    time: "۲ ساعت پیش",
    isRead: true,
    postImage: "/post/1.webp",
    commentText: "عالی بود! 😍",
  },
  {
    id: 5,
    type: "comment",
    username: "زهرا_رضایی",
    userAvatar: "/post/2.webp",
    action: "به پست شما کامنت گذاشت",
    target: "تازه‌ترین پروژه‌ام",
    time: "۳ ساعت پیش",
    isRead: true,
    postImage: "/post/2.webp",
    commentText: "دستت درد نکنه 👏",
  },
  {
    id: 6,
    type: "like",
    username: "محمد_نوری",
    userAvatar: "/post/3.webp",
    action: "پست شما را لایک کرد",
    target: "غروب دل‌انگیز امروز",
    time: "۵ ساعت پیش",
    isRead: true,
    postImage: "/post/3.webp",
  },
  {
    id: 7,
    type: "like",
    username: "نگار_کاظمی",
    userAvatar: "/post/1.webp",
    action: "پست شما را لایک کرد",
    target: "لحظاتی که تکرار نمی‌شن",
    time: "دیروز",
    isRead: true,
    postImage: "/post/1.webp",
  },
  {
    id: 8,
    type: "follow",
    username: "حسین_مرادی",
    userAvatar: "/post/2.webp",
    action: "شما را دنبال کرد",
    time: "۲ روز پیش",
    isRead: true,
  },
  {
    id: 9,
    type: "mention",
    username: "فاطمه_کریمی",
    userAvatar: "/post/3.webp",
    action: "شما را در کامنتی mention کرد",
    target: "پست جدید",
    time: "۳ روز پیش",
    isRead: true,
  },
];

export const useNotifications = () => {
  const [activeTab, setActiveTab] = useState<NotificationTabType>("all");
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleAcceptRequest = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("درخواست دنبال کردن پذیرفته شد ✅");
  };

  const handleRejectRequest = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("درخواست رد شد ❌");
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleFollowBack = (username: string) => {
    toast.success(`${username} را دنبال کردید`);
  };

  return {
    activeTab,
    setActiveTab,
    notifications,
    handleAcceptRequest,
    handleRejectRequest,
    handleMarkAsRead,
    handleFollowBack,
  };
};
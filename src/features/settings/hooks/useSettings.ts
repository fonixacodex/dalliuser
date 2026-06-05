"use client";

import { Heart, Bookmark, Shield, HelpCircle, Flag, MessageCircle, UserX } from "lucide-react";
import { MenuItem } from "../types/settings.types";
import toast from "react-hot-toast";

export const useSettings = () => {
  const handleLogout = () => {
    toast.success("خروج از حساب کاربری");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handleReport = () => {
    toast.success("صفحه گزارش باز شد");
  };

  const handleBlock = () => {
    toast.success("صفحه مسدود شده‌ها باز شد");
  };

  const mainMenu: MenuItem[] = [
    { icon: Heart, label: "علاقه‌مندی‌ها", href: "/favorites" },
    { icon: Bookmark, label: "ذخیره شده‌ها", href: "/saved" },
    { icon: Shield, label: "حریم خصوصی", href: "/privacy" },
    { icon: HelpCircle, label: "راهنما", href: "/help" },
    { icon: MessageCircle, label: "پشتیبانی", href: "/support" },
    { icon: Flag, label: "گزارش تخلف", action: handleReport },
    { icon: UserX, label: "کاربران مسدود شده", action: handleBlock },
  ];

  return {
    mainMenu,
    handleLogout,
  };
};
import { TabType } from "../types/dashboard.types";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

 
export const getTabIcon = (tabId: TabType) => {
  switch (tabId) {
    case "home":
      return Home;
    case "search":
      return Search;
    case "create":
      return PlusSquare;
    case "notifications":
      return Heart;
    case "profile":
      return User;
    default:
      return Home;
  }
};

 
export const getTabTitle = (tabId: TabType): string => {
  switch (tabId) {
    case "home":
      return "خانه";
    case "search":
      return "جستجو";
    case "create":
      return "ساخت";
    case "notifications":
      return "اعلان‌ها";
    case "profile":
      return "پروفایل";
    default:
      return "خانه";
  }
};

 
export const saveThemeToLocal = (isDark: boolean) => {
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

 
export const getThemeFromLocal = (): boolean => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
};

 
export const getSystemTheme = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
 
export const applyTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

 
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "امروز";
  if (days === 1) return "دیروز";
  if (days < 7) return `${days} روز پیش`;
  if (days < 30) return `${Math.floor(days / 7)} هفته پیش`;
  if (days < 365) return `${Math.floor(days / 30)} ماه پیش`;
  return `${Math.floor(days / 365)} سال پیش`;
};

 
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

 
export const validatePhone = (phone: string): boolean => {
  return /^09[0-9]{9}$/.test(phone);
};

 
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

 
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

 
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

 
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

 
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

 
export const getQueryParam = (param: string): string | null => {
  if (typeof window === "undefined") return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

 
export const isOnline = (): boolean => {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
};
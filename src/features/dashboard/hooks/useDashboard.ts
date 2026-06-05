"use client";

import { useState } from "react";
import { TabType, Tab } from "../types/dashboard.types";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const tabs: Tab[] = [
    { id: "home", label: "خانه", icon: Home },
    { id: "search", label: "جستجو", icon: Search },
    { id: "create", label: "ساخت", icon: PlusSquare },
    { id: "notifications", label: "اعلان‌ها", icon: Heart },
    { id: "profile", label: "پروفایل", icon: User },
  ];

  return { activeTab, setActiveTab, tabs };
};
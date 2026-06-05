"use client";
 import { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { useMobileDetect } from "../hooks/useMobileDetect";
import { useDashboard } from "../hooks/useDashboard";
import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import SuggestionsPanel from "./SuggestionsPanel";
import HomeTab from "@/app/dashboard/tabs/@feed/page";
import SearchTab from "@/app/dashboard/tabs/@explore/page";
import CreateTab from "@/app/dashboard/tabs/@create/page";
import NotificationsTab from "@/app/dashboard/tabs/@notifications/page";
import ProfileTab from "@/app/dashboard/tabs/@profile/page";

interface DashboardLayoutProps {
  children?: ReactNode;  // اضافه کردن children به interface
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isDarkMode, toggleDarkMode, mounted } = useTheme();
  const { isMobile } = useMobileDetect();
  const { activeTab, setActiveTab, tabs } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "search":
        return <SearchTab />;
      case "create":
        return <CreateTab />;
      case "notifications":
        return <NotificationsTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  if (!mounted) return null;

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center max-w-350 mx-auto">
          <DesktopSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleDarkMode}
          />
          <main className="flex-1 mr-20 ml-80">
            <div className="max-w-2xl mx-auto py-4 px-4">{renderContent()}</div>
          </main>
          <SuggestionsPanel />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="px-4">{renderContent()}</div>
      <MobileBottomNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
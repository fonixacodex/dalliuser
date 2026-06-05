"use client";

import { SettingsDrawerProps } from "../types/settings.types";
import { useSettings } from "../hooks/useSettings";
import SettingsHeader from "./SettingsHeader";
import SettingsMenu from "./SettingsMenu";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";

export default function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const { mainMenu } = useSettings();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 transition-transform duration-300 translate-x-0">
        <SettingsHeader onClose={onClose} />
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <SettingsMenu items={mainMenu} />
            
            <div className="px-2 pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
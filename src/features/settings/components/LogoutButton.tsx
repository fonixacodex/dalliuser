"use client";

import { LogOut } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function LogoutButton() {
  const { handleLogout } = useSettings();

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
    >
      <LogOut size={16} />
      خروج از حساب
    </button>
  );
}
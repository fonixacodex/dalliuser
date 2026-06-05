"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("خروج موفقیت‌آمیز");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center group-hover:justify-start gap-4 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
    >
      <LogOut size={20} />
      <span className="hidden group-hover:inline">خروج</span>
    </button>
  );
}
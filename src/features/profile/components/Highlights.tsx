"use client";

import { Film, BookOpen, Shield, Layout, MessageSquare, Award } from "lucide-react";

const highlights = [
  { id: 1, title: "محتوا ویدیویی", icon: Film, color: "from-purple-500 to-pink-500" },
  { id: 2, title: "داستانی ها", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { id: 3, title: "نکات آموزشی", icon: Award, color: "from-green-500 to-emerald-500" },
  { id: 4, title: "نکات امنیتی", icon: Shield, color: "from-red-500 to-orange-500" },
  { id: 5, title: "بررسی قالب", icon: Layout, color: "from-indigo-500 to-purple-500" },
  { id: 6, title: "مشاوره رایگان", icon: MessageSquare, color: "from-yellow-500 to-orange-500" },
];

export default function Highlights() {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
 
      <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
        {highlights.map((highlight) => (
          <button
            key={highlight.id}
            className="flex flex-col items-center gap-1 shrink-0 group"
          >
            <div className={`w-16 h-16 rounded-full bg-linear-to-r ${highlight.color} p-0.5`}>
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center group-hover:scale-95 transition-transform">
                <highlight.icon size={24} className="text-gray-700 dark:text-gray-300" />
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {highlight.title}
            </span>
          </button>
        ))}
      </div>
 
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
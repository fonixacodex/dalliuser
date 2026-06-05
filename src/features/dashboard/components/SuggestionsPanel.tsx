"use client";

import Image from "next/image";
import { Suggestion } from "../types/dashboard.types";

const suggestions: Suggestion[] = [
  { id: 1, name: "سارا محمدی", username: "sara_m", avatar: "/images/1.webp", mutual: 3 },
  { id: 2, name: "رضا احمدی", username: "reza_a", avatar: "/images/2.webp", mutual: 5 },
  { id: 3, name: "مریم حسینی", username: "mariam_h", avatar: "/images/3.webp", mutual: 2 },
  { id: 4, name: "علی کریمی", username: "ali_k", avatar: "/images/1.webp", mutual: 7 },
];

export default function SuggestionsPanel() {
  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
  
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
            <Image src="/images/1.webp" alt="Profile" width={48} height={48} className="w-full h-full object-cover"  
 
  loading="lazy"
  />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm dark:text-white">احمد رضایی</p>
            <p className="text-xs text-gray-500">@ahmad_rezaei</p>
          </div>
          <button className="text-blue-500 text-sm font-semibold">تغییر</button>
        </div>

            <div className="mb-4">
          <div className="flex justify-between items-center mb-3 px-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">پیشنهادات برای شما</h3>
            <button className="text-sm text-gray-500">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400 overflow-hidden">
                  <Image src={suggestion.avatar} alt={suggestion.name} width={40} height={40} className="w-full h-full object-cover"   
 
  loading="lazy"
   />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm dark:text-white truncate">{suggestion.name}</p>
                  <p className="text-xs text-gray-500">@{suggestion.username}</p>
                  <p className="text-xs text-gray-400">{suggestion.mutual} دنبال‌کننده متقابل</p>
                </div>
                <button className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">دنبال کردن</button>
              </div>
            ))}
          </div>
        </div>

 
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <a href="#" className="hover:underline">درباره</a>
            <a href="#" className="hover:underline">کمک</a>
            <a href="#" className="hover:underline">حریم خصوصی</a>
            <a href="#" className="hover:underline">شرایط</a>
          </div>
          <p className="text-xs text-gray-400 mt-4">© 2024 دالی مدیا</p>
        </div>
      </div>
    </aside>
  );
}
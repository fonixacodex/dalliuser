"use client";

import { useState } from "react";
import { Image, Camera, Sparkles } from "lucide-react";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";

type CreateType = "post" | "story";

export default function CreateLayout() {
  const [activeType, setActiveType] = useState<CreateType>("post");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-full mx-auto p-4">

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveType("post")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeType === "post"
                ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Image size={20} />
            <span>ساخت پست</span>
          </button>
          
          <button
            onClick={() => setActiveType("story")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeType === "story"
                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Camera size={20} />
            <span>ساخت استوری</span>
          </button>
        </div>


        {activeType === "post" ? <CreatePost /> : <CreateStory />}
      </div>
    </div>
  );
}
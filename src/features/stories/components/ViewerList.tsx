"use client";

import { useState } from "react";
import { Eye, Users, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Viewer } from "../types/stories.types";

interface ViewerListProps {
  viewers: Viewer[];
  viewCount: number;
}

export default function ViewerList({ viewers, viewCount }: ViewerListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (viewers.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-white/60" />
          <span className="text-sm text-white/80">
            {viewCount} نفر این استوری را دیده‌اند
          </span>
        </div>
        <ChevronRight size={16} className={`text-white/60 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
          {viewers.map((viewer) => (
            <div key={viewer.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-black p-0.5">
                  <Image
                    src={viewer.avatar}
                    alt={viewer.username}
                    width={28}
                    height={28}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{viewer.username}</p>
                <p className="text-xs text-white/50">{viewer.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
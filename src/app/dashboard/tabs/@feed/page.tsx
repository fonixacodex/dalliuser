"use client";

import Stories from "./stories/page";
import Posts from "./postes/page";

export default function HomeTab() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* استوری‌ها */}
      <Stories />
      
      {/* پست‌ها */}
      <Posts />
    </div>
  );
}
"use client";

interface StoryProgressProps {
  progress: number;
}

export default function StoryProgress({ progress }: StoryProgressProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-2">
      <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
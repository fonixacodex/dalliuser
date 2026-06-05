"use client";

import { useState, useCallback } from "react";
import { Story, Viewer } from "../types/stories.types";

// دیتای نمونه برای استوری‌ها
const mockViewers: Viewer[] = [
  { id: 1, username: "علی_رضایی", avatar: "/post/1.webp", timestamp: "۵ دقیقه پیش" },
  { id: 2, username: "سارا_محمدی", avatar: "/post/2.webp", timestamp: "۱۰ دقیقه پیش" },
  { id: 3, username: "رضا_احمدی", avatar: "/post/3.webp", timestamp: "۲۰ دقیقه پیش" },
  { id: 4, username: "مریم_حسینی", avatar: "/post/1.webp", timestamp: "۱ ساعت پیش" },
  { id: 5, username: "زهرا_رضایی", avatar: "/post/2.webp", timestamp: "۲ ساعت پیش" },
];

const mockStories: Story[] = [
  {
    id: 1,
    username: "your_story",
    avatar: "/post/1.webp",
    storyImage: "/post/1.webp",
    hasStory: false,
    isUser: true,
    timestamp: "لحظاتی پیش",
    viewers: [],
    viewCount: 0,
  },
  {
    id: 2,
    username: "سارا_محمدی",
    avatar: "/post/1.webp",
    storyImage: "/post/1.webp",
    hasStory: true,
    timestamp: "۵ دقیقه پیش",
    viewers: mockViewers.slice(0, 3),
    viewCount: 3,
  },
  {
    id: 3,
    username: "رضا_احمدی",
    avatar: "/post/2.webp",
    storyImage: "/post/2.webp",
    hasStory: true,
    timestamp: "۱۰ دقیقه پیش",
    viewers: mockViewers.slice(0, 5),
    viewCount: 5,
  },
  {
    id: 4,
    username: "مریم_حسینی",
    avatar: "/post/3.webp",
    storyImage: "/post/3.webp",
    hasStory: true,
    timestamp: "۳۰ دقیقه پیش",
    viewers: mockViewers.slice(0, 2),
    viewCount: 2,
  },
  {
    id: 5,
    username: "علی_کریمی",
    avatar: "/post/1.webp",
    storyImage: "/post/1.webp",
    hasStory: false,
    timestamp: "۱ ساعت پیش",
    viewers: [],
    viewCount: 0,
  },
  {
    id: 6,
    username: "زهرا_رضایی",
    avatar: "/post/2.webp",
    storyImage: "/post/2.webp",
    hasStory: true,
    timestamp: "۲ ساعت پیش",
    viewers: mockViewers.slice(0, 4),
    viewCount: 4,
  },
];

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
    setIsOpen(true);
    
    // افزایش تعداد بازدید
    setStories((prevStories: Story[]) => 
      prevStories.map((story: Story, i: number) => 
        i === index ? { ...story, viewCount: story.viewCount + 1 } : story
      )
    );
  };

  const closeStory = () => {
    setIsOpen(false);
    setSelectedStoryIndex(null);
  };

  const nextStory = useCallback(() => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      // پیدا کردن استوری بعدی که hasStory = true باشد
      let nextIndex = selectedStoryIndex + 1;
      while (nextIndex < stories.length && !stories[nextIndex].hasStory) {
        nextIndex++;
      }
      if (nextIndex < stories.length) {
        setSelectedStoryIndex(nextIndex);
        // افزایش بازدید
        setStories((prevStories: Story[]) => 
          prevStories.map((story: Story, i: number) => 
            i === nextIndex ? { ...story, viewCount: story.viewCount + 1 } : story
          )
        );
      } else {
        closeStory();
      }
    } else {
      closeStory();
    }
  }, [selectedStoryIndex, stories]);

  const prevStory = useCallback(() => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      let prevIndex = selectedStoryIndex - 1;
      while (prevIndex >= 0 && !stories[prevIndex].hasStory) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        setSelectedStoryIndex(prevIndex);
        setStories((prevStories: Story[]) => 
          prevStories.map((story: Story, i: number) => 
            i === prevIndex ? { ...story, viewCount: story.viewCount + 1 } : story
          )
        );
      }
    }
  }, [selectedStoryIndex, stories]);

  const selectedStory = selectedStoryIndex !== null ? stories[selectedStoryIndex] : null;

  const hasNext = selectedStoryIndex !== null && 
    (() => {
      let nextIndex = selectedStoryIndex + 1;
      while (nextIndex < stories.length && !stories[nextIndex].hasStory) {
        nextIndex++;
      }
      return nextIndex < stories.length;
    })();

  const hasPrev = selectedStoryIndex !== null && 
    (() => {
      let prevIndex = selectedStoryIndex - 1;
      while (prevIndex >= 0 && !stories[prevIndex].hasStory) {
        prevIndex--;
      }
      return prevIndex >= 0;
    })();

  return {
    stories,
    selectedStory,
    isOpen,
    openStory,
    closeStory,
    nextStory,
    prevStory,
    hasNext: hasNext || false,
    hasPrev: hasPrev || false,
  };
};
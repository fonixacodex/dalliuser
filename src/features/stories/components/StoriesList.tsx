"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useStories } from "../hooks/useStories";
import StoryViewer from "./StoryViewer";

export default function StoriesList() {
  const {
    stories,
    selectedStory,
    isOpen,
    openStory,
    closeStory,
    nextStory,
    prevStory,
    hasNext,
    hasPrev,
  } = useStories();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

 
  const activeStories = stories.filter(s => s.hasStory);
 
  const userStory = stories.find(s => s.isUser);

  return (
    <>
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-4 p-4">
       
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}

        
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          
          {userStory && (
            <button
              onClick={() => !userStory.hasStory && openStory(0)}
              className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
            >
              <div className="relative">
                
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-0.5">
                    <div className="relative w-full h-full rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {userStory.username[0].toUpperCase()}
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 ring-2 ring-white dark:ring-gray-800">
                        <Plus size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-16">
                استوری شما
              </span>
            </button>
          )}

         
          {activeStories.map((story) => {
            const originalIndex = stories.findIndex(s => s.id === story.id);
            return (
              <button
                key={story.id}
                onClick={() => openStory(originalIndex)}
                className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
              >
                <div className="relative">
           
                  <div className="w-16 h-16 rounded-full p-0.5 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {imageErrors[story.id] ? (
                          <div className="w-full h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            {story.username[0].toUpperCase()}
                          </div>
                        ) : (
                          <Image
                            src={story.avatar}
                            alt={story.username}
                            width={56}
                            height={56}
                            className="w-full h-full rounded-full object-cover"
                            onError={() => handleImageError(story.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-16">
                  {story.username}
                </span>
                <span className="text-[10px] text-gray-400">
                  {story.viewCount > 0 && `${story.viewCount} بازدید`}
                </span>
              </button>
            );
          })}
        </div>

  
        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

 
      {isOpen && selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={closeStory}
          onNext={nextStory}
          onPrev={prevStory}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
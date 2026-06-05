"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { Story } from "../types/stories.types";

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function StoryViewer({ 
  story, 
  onClose, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev 
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

 
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onNext();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPaused, onNext]);

 
  useEffect(() => {
    setProgress(0);
    setIsPaused(false);
  }, [story.id]);

 
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          onNext();
        } else {
          onPrev();
        }
      }
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleNext = useCallback(() => {
    if (hasNext && !isPaused) {
      onNext();
    }
  }, [hasNext, isPaused, onNext]);

  const handlePrev = useCallback(() => {
    if (hasPrev && !isPaused) {
      onPrev();
    }
  }, [hasPrev, isPaused, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
      >
   
        <div className="absolute top-0 left-0 right-0 z-10 p-2">
          <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

   
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-linear-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-black p-0.5">
                  {!imageError ? (
                    <Image
                      src={story.avatar}
                      alt={story.username}
                      width={36}
                      height={36}
                      className="w-full h-full rounded-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      {story.username[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{story.username}</p>
                <p className="text-white/60 text-xs">{story.timestamp}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              >
                {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

 
        <div className="relative w-full h-full flex items-center justify-center">
          {story.storyImage && !imageError ? (
            <Image
              src={story.storyImage}
              alt={`${story.username} story`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-2xl font-bold mb-2">{story.username}</p>
                <p className="text-sm opacity-80">استوری</p>
              </div>
            </div>
          )}
        </div>

   
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors hidden md:block"
          >
            <ChevronLeft size={28} />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors hidden md:block"
          >
            <ChevronRight size={28} />
          </button>
        )}

            <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full" onClick={handlePrev} />
          <div className="w-1/3 h-full" onClick={() => {}} />
          <div className="w-1/3 h-full" onClick={handleNext} />
        </div>

      
        <div className="absolute bottom-6 left-0 right-0 z-10 px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              >
                <Heart size={20} className={isLiked ? "text-red-500 fill-red-500" : "text-white"} />
              </button>
              <button className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
                <MessageCircle size={20} className="text-white" />
              </button>
              <button className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
                <Send size={20} className="text-white" />
              </button>
            </div>
            <button className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <Bookmark size={20} className="text-white" />
            </button>
          </div>
        </div>

    
        <div className="absolute bottom-20 left-0 right-0 text-center text-white/30 text-[10px] hidden md:block">
          برای حرکت کلیک چپ/راست • نگه دارید برای توقف
        </div>
      </div>
    </div>
  );
}
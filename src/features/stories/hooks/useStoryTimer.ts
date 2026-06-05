"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseStoryTimerProps {
  duration?: number;  
  autoPlay?: boolean;
  onComplete?: () => void;
  onTick?: (progress: number) => void;
}

interface UseStoryTimerReturn {
  progress: number;
  isPlaying: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  seek: (percent: number) => void;
  skip: () => void;
  previous: () => void;
}

export const useStoryTimer = ({
  duration = 5000,
  autoPlay = true,
  onComplete,
  onTick,
}: UseStoryTimerProps = {}): UseStoryTimerReturn => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const totalElapsedRef = useRef<number>(0);

 
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

 
  const startAnimation = useCallback(() => {
    stopAnimation();
    
    if (isCompleted || !isPlaying) return;
    
    startTimeRef.current = performance.now() - totalElapsedRef.current;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      onTick?.(newProgress);
      
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsCompleted(true);
        setIsPlaying(false);
        onComplete?.();
        stopAnimation();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [duration, isPlaying, isCompleted, onComplete, onTick, stopAnimation]);

 
  const reset = useCallback(() => {
    stopAnimation();
    setProgress(0);
    setIsCompleted(false);
    setIsPlaying(autoPlay);
    setIsPaused(false);
    totalElapsedRef.current = 0;
    
    if (autoPlay) {
      startAnimation();
    }
  }, [autoPlay, startAnimation, stopAnimation]);

  // شروع استوری
  const start = useCallback(() => {
    if (isCompleted) {
      reset();
    }
    setIsPlaying(true);
    setIsPaused(false);
    totalElapsedRef.current = 0;
    startAnimation();
  }, [isCompleted, reset, startAnimation]);

  // توقف موقت
  const pause = useCallback(() => {
    if (!isPlaying || isPaused) return;
    
    stopAnimation();
    setIsPaused(true);
    setIsPlaying(false);
    
    if (startTimeRef.current) {
      totalElapsedRef.current = performance.now() - startTimeRef.current;
    }
  }, [isPlaying, isPaused, stopAnimation]);
 
  const resume = useCallback(() => {
    if (isCompleted || isPlaying) return;
    
    setIsPlaying(true);
    setIsPaused(false);
    startAnimation();
  }, [isCompleted, isPlaying, startAnimation]);

 
  const seek = useCallback((percent: number) => {
    const clampedPercent = Math.min(Math.max(percent, 0), 100);
    setProgress(clampedPercent);
    totalElapsedRef.current = (clampedPercent / 100) * duration;
    
    if (isPlaying && !isPaused) {
      stopAnimation();
      startAnimation();
    }
  }, [duration, isPlaying, isPaused, startAnimation, stopAnimation]);

  // رد شدن به استوری بعدی
  const skip = useCallback(() => {
    if (isCompleted) return;
    
    stopAnimation();
    setProgress(100);
    setIsCompleted(true);
    setIsPlaying(false);
    onComplete?.();
  }, [isCompleted, onComplete, stopAnimation]);

 
  const previous = useCallback(() => {
    reset();
  }, [reset]);

 
  useEffect(() => {
    if (isPlaying && !isPaused && !isCompleted) {
      stopAnimation();
      startAnimation();
    }
  }, [duration, isPlaying, isPaused, isCompleted, startAnimation, stopAnimation]);

 
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

 
  useEffect(() => {
    if (autoPlay && !isPlaying && !isPaused && !isCompleted) {
      start();
    }
  }, [autoPlay, isPlaying, isPaused, isCompleted, start]);

  return {
    progress,
    isPlaying,
    isPaused,
    start,
    pause,
    resume,
    reset,
    seek,
    skip,
    previous,
  };
};
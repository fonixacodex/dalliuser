"use client";

import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export interface PostActionState {
  isLiked: boolean;
  isSaved: boolean;
  isBookmarked: boolean;
  likesCount: number;
  sharesCount: number;
  viewsCount: number;
}

export const usePostActions = (initialState?: Partial<PostActionState>) => {
  const [state, setState] = useState<PostActionState>({
    isLiked: false,
    isSaved: false,
    isBookmarked: false,
    likesCount: 0,
    sharesCount: 0,
    viewsCount: 0,
    ...initialState,
  });

  const [isProcessing, setIsProcessing] = useState(false);

 
  const toggleLike = useCallback(async (postId: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
 
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setState(prev => {
        const newIsLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked: newIsLiked,
          likesCount: prev.likesCount + (newIsLiked ? 1 : -1),
        };
      });
      
      toast.success(state.isLiked ? "لایک برداشته شد" : "پست لایک شد ");
    } catch (error) {
      toast.error("خطا در ثبت لایک");
    } finally {
      setIsProcessing(false);
    }
  }, [state.isLiked, isProcessing]);

 
  const toggleSave = useCallback(async (postId: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setState(prev => ({
        ...prev,
        isSaved: !prev.isSaved,
      }));
      
      toast.success(state.isSaved ? "از ذخیره خارج شد" : "پست ذخیره شد ");
    } catch (error) {
      toast.error("خطا در ذخیره پست");
    } finally {
      setIsProcessing(false);
    }
  }, [state.isSaved, isProcessing]);

  // بوکمارک کردن
  const toggleBookmark = useCallback(async (postId: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setState(prev => ({
        ...prev,
        isBookmarked: !prev.isBookmarked,
      }));
      
      toast.success(state.isBookmarked ? "از بوکمارک خارج شد" : "به بوکمارک اضافه شد 🔖");
    } catch (error) {
      toast.error("خطا در بوکمارک");
    } finally {
      setIsProcessing(false);
    }
  }, [state.isBookmarked, isProcessing]);

 
  const sharePost = useCallback(async (postId: number, platform?: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const postUrl = `https://dalli.ir/p/${postId}`;
      
      if (platform === "copy") {
        await navigator.clipboard.writeText(postUrl);
        toast.success("لینک پست کپی شد ");
      } else if (platform === "telegram") {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(postUrl)}`, "_blank");
      } else if (platform === "whatsapp") {
        window.open(`https://wa.me/?text=${encodeURIComponent(postUrl)}`, "_blank");
      } else if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, "_blank");
      } else {
 
        if (navigator.share) {
          await navigator.share({
            title: "پست از دالی",
            url: postUrl,
          });
        } else {
          await navigator.clipboard.writeText(postUrl);
          toast.success("لینک پست کپی شد ");
        }
      }
      
      setState(prev => ({
        ...prev,
        sharesCount: prev.sharesCount + 1,
      }));
    } catch (error) {
      console.error("خطا در اشتراک‌گذاری:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  // گزارش پست
  const reportPost = useCallback(async (postId: number, reason: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("گزارش شما ثبت شد. تیم ما بررسی می‌کند ");
    } catch (error) {
      toast.error("خطا در ثبت گزارش");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);
 
  const blockUser = useCallback(async (username: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`${username} مسدود شد 🔒`);
    } catch (error) {
      toast.error("خطا در مسدود کردن کاربر");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

 
  const notInterested = useCallback(async (postId: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success("پست از فید شما حذف شد 👌");
    } catch (error) {
      toast.error("خطا در حذف پست");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

 
  const incrementView = useCallback(() => {
    setState(prev => ({
      ...prev,
      viewsCount: prev.viewsCount + 1,
    }));
  }, []);

 
  const resetActions = useCallback(() => {
    setState({
      isLiked: false,
      isSaved: false,
      isBookmarked: false,
      likesCount: 0,
      sharesCount: 0,
      viewsCount: 0,
    });
  }, []);

 
  const setPostState = useCallback((newState: Partial<PostActionState>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  return {
    
    isLiked: state.isLiked,
    isSaved: state.isSaved,
    isBookmarked: state.isBookmarked,
    likesCount: state.likesCount,
    sharesCount: state.sharesCount,
    viewsCount: state.viewsCount,
    isProcessing,
    
 
    toggleLike,
    toggleSave,
    toggleBookmark,
    sharePost,
    reportPost,
    blockUser,
    notInterested,
    incrementView,
    resetActions,
    setPostState,
  };
};
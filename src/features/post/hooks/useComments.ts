"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  userAvatar?: string;
  replies?: Comment[];
}

export const useComments = (initialComments: Comment[] = []) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

 
  const addComment = (text: string, username: string = "شما") => {
    if (!text.trim()) {
      toast.error("لطفاً متن کامنت را وارد کنید");
      return false;
    }

    const newComment: Comment = {
      id: Date.now(),
      username,
      text: text.trim(),
      timestamp: "لحظاتی پیش",
      likes: 0,
    };

    setComments(prev => [newComment, ...prev]);
    toast.success("کامنت شما ثبت شد ✅");
    return true;
  };

  // پاسخ به کامنت
  const replyToComment = (commentId: number, text: string, username: string = "شما") => {
    if (!text.trim()) {
      toast.error("لطفاً متن پاسخ را وارد کنید");
      return false;
    }

    const newReply: Comment = {
      id: Date.now(),
      username,
      text: text.trim(),
      timestamp: "لحظاتی پیش",
      likes: 0,
    };

    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );
    
    toast.success("پاسخ شما ثبت شد ✅");
    setReplyTo(null);
    return true;
  };

 
  const likeComment = (commentId: number) => {
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
            ),
          };
        }
        return comment;
      })
    );
    toast.success("کامنت لایک شد ");
  };

 
  const deleteComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    toast.success("کامنت حذف شد 🗑️");
  };

 
  const editComment = (commentId: number, newText: string) => {
    if (!newText.trim()) {
      toast.error("متن کامنت نمی‌تواند خالی باشد");
      return false;
    }

    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, text: newText.trim(), timestamp: "ویرایش شده" }
          : comment
      )
    );
    toast.success("کامنت ویرایش شد ✏️");
    return true;
  };

 
  const getCommentsCount = () => {
    let count = comments.length;
    comments.forEach(comment => {
      if (comment.replies) {
        count += comment.replies.length;
      }
    });
    return count;
  };

 
  const getCommentsByUser = (username: string) => {
    return comments.filter(comment => comment.username === username);
  };

 
  const clearAllComments = () => {
    setComments([]);
    toast.success("همه کامنت‌ها حذف شدند");
  };

  return {
    comments,
    isLoading,
    replyTo,
    setReplyTo,
    addComment,
    replyToComment,
    likeComment,
    deleteComment,
    editComment,
    getCommentsCount,
    getCommentsByUser,
    clearAllComments,
  };
};
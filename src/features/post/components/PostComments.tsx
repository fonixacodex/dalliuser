"use client";

import { useState } from "react";
import { Heart, Send, X } from "lucide-react";
import toast from "react-hot-toast";

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface PostCommentsProps {
  comments?: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: number) => void;
}

export default function PostComments({ 
  comments = [], 
  onAddComment, 
  onLikeComment 
}: PostCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("لطفاً متن کامنت را وارد کنید");
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) {
      toast.error("لطفاً متن پاسخ را وارد کنید");
      return;
    }
 
    setReplyToId(null);
    setReplyText("");
    toast.success("پاسخ شما ثبت شد");
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="کامنت خود را بنویسید..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="text-blue-500 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pb-2">
 
      <div className="mt-2 space-y-3 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {comment.username[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {comment.username}
                    </span>
                    <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                    {comment.text}
                  </p>
                </div>
                <div className="flex gap-3 mt-1 mr-2">
                  <button 
                    onClick={() => onLikeComment(comment.id)}
                    className="text-[10px] text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <Heart size={10} />
                    {comment.likes > 0 ? comment.likes : "لایک"}
                  </button>
                  <button 
                    onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                    className="text-[10px] text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    پاسخ
                  </button>
                </div>

        
                {replyToId === comment.id && (
                  <div className="flex items-center gap-2 mt-2 mr-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="پاسخ خود را بنویسید..."
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="text-blue-500 disabled:opacity-50"
                    >
                      <Send size={12} />
                    </button>
                    <button
                      onClick={() => setReplyToId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

 
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          placeholder="کامنت جدید..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="text-blue-500 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
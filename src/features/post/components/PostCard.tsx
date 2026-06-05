"use client";

import { useState } from "react";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import { Post } from "../types/posts.types";

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onSave: (id: number) => void;
}

export default function PostCard({ post, onLike, onSave }: PostCardProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "علی_رضایی",
      text: "عالی بود! 😍",
      timestamp: "۲ ساعت پیش",
      likes: 5,
    },
    {
      id: 2,
      username: "سارا_محمدی",
      text: "دستت درد نکنه 👏",
      timestamp: "۱ ساعت پیش",
      likes: 3,
    },
  ]);

  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);  

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    }
    onLike(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(post.id);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);  
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      username: "شما",
      text,
      timestamp: "لحظاتی پیش",
      likes: 0,
    };
    setComments([newComment, ...comments]);
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://dalli.ir/p/${post.id}`);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
      <PostHeader
        postId={post.id}
        username={post.username}
        userAvatar={post.userAvatar}
        timestamp={post.timestamp}
      />
      
      <PostImage image={post.image} alt={post.caption} />
      
      <PostActions
        postId={post.id}
        isLiked={isLiked}
        isSaved={isSaved}
        likesCount={likesCount}
        onLike={handleLike}
        onSave={handleSave}
        onCommentClick={handleCommentClick}
        onShare={handleShare}
      />
      
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-1 px-3">
        <span className="font-semibold">{post.username}</span> {post.caption}
      </p>
      
    
      {showComments && (
        <PostComments
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      )}
      
  
      {comments.length > 0 && !showComments && (
        <button 
          onClick={handleCommentClick}
          className="text-xs text-gray-500 dark:text-gray-400 px-3 pb-2 hover:text-blue-500 transition-colors"
        >
          مشاهده {comments.length} کامنت
        </button>
      )}
      
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-3 pb-3">
        {post.timestamp}
      </p>
    </article>
  );
}
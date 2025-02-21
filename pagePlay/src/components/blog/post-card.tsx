import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { Post } from "@/types/blog";
import { CommentInput } from "./comment-input";
import { CommentItem } from "./comment-item";

interface PostCardProps {
  post: Post;
  currentUser: { id: number; name: string; avatar: string };
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
  onReplyComment?: (commentId: string, content: string) => void;
}

export function PostCard({
  post,
  currentUser,
  onLike,
  onComment,
  onLikeComment,
  onReplyComment,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/checkLike`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: post.id, userId: currentUser.id }),
        });
        const data = await response.json();
        if (data.liked === true) setIsLiked(true);
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };
    checkIfLiked();
  }, [post.id, currentUser.id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/likePost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, userId: currentUser.id }),
      });
      if (!response.ok) throw new Error("Failed to like post");
      setIsLiked((prev) => !prev);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={post.image}
              alt={post.author.name}
              className="object-cover"
            />
            <AvatarFallback>{post.author.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-[15px] leading-5">
              {post.firstname + " " + post.lastname}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(post.timestamp).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {post.content && (
            <p className="text-[15px] leading-6 text-gray-900">
              {post.content}
            </p>
          )}
          {post.image && (
            <img
              src={post.post_image || "/placeholder.svg"}
              alt="Post content"
              className="w-full object-cover rounded-lg"
            />
          )}
        </div>

        {(likes > 0 || (post.comments && post.comments.length > 0)) && (
          <div className="flex items-center justify-between mt-3 py-2 text-sm text-gray-500">
            {likes > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#1877F2]">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
                <span>{likes}</span>
              </div>
            )}
            {post.comments && post.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-gray-500 hover:underline"
              >
                {post.comments.length}{" "}
                {post.comments.length === 1 ? "comment" : "comments"}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="px-4 py-1 border-t border-b flex">
        <Button
          variant="ghost"
          className={`flex-1 flex items-center justify-center gap-2 ${
            isLiked ? "text-[#1877F2]" : "text-gray-600"
          }`}
          onClick={handleLike}
        >
          <Heart
            className={`h-5 w-5 ${isLiked ? "fill-[#1877F2]" : "fill-none"}`}
          />
          Like
        </Button>
        <Button
          variant="ghost"
          className="flex-1 flex items-center justify-center gap-2 text-gray-600"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-5 w-5" />
          Comment
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <CommentInput
          user={currentUser}
          onSubmit={(content) => {
            onComment(post.id, content);
            setShowComments(true);
          }}
        />
        {showComments && post.comments && post.comments.length > 0 && (
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={onLikeComment}
                onReply={onReplyComment}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

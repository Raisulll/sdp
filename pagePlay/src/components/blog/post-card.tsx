// PostCard.tsx
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
    <Card className="bg-white shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-start gap-3">
        <Avatar>
          <AvatarImage src={post.image} />
          <AvatarFallback>{post.author.name}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-[#265073]">
            {post.firstname + " " + post.lastname}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(post.timestamp).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-4">
          <img
            src={post.post_image}
            alt="Post content"
            className="rounded-lg max-h-[500px] w-full object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`hover:text-[#265073]/80 ${
            isLiked ? "text-red-500" : "text-[#265073]"
          }`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500" : ""}`} />
          {likes > 0 && likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#265073] hover:text-[#265073]/80"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments && post.comments.length}
        </Button>
      </div>

      {/* Comments Section */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="mb-4">
          <CommentInput
            user={currentUser}
            onSubmit={(content) => {
              onComment(post.id, content);
              setShowComments(true);
            }}
          />
        </div>
        {showComments && (
          <div className="space-y-4">
            {post.comments &&
              post.comments.map((comment) => (
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

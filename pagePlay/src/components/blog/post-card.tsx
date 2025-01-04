import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/blog";
import { CommentInput } from "./comment-input";
import { CommentItem } from "./comment-item";

interface PostCardProps {
  post: Post;
  currentUser: {
    name: string;
    avatar: string;
  };
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

  return (
    <Card className="bg-white shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-start gap-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-[#265073]">{post.author.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.timestamp).toLocaleDateString()}
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
            src={post.image}
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
          className="text-[#265073] hover:text-[#265073]/80"
          onClick={() => onLike(post.id)}
        >
          <Heart
            className={`h-4 w-4 mr-1 ${post.likes > 0 ? "fill-[#265073]" : ""}`}
          />
          {post.likes > 0 && post.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#265073] hover:text-[#265073]/80"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments.length > 0 && post.comments.length}
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-2 border-t border-gray-100">
          {/* Comment Input */}
          <div className="mb-4">
            <CommentInput
              user={currentUser}
              onSubmit={(content) => onComment(post.id, content)}
            />
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={onLikeComment}
                onReply={onReplyComment}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

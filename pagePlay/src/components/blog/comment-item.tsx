import { CommentInput } from "@/components/blog/comment-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/types/blog";
import { useState } from "react";

interface CommentItemProps {
  comment: Comment;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
}

export function CommentItem({ comment, onLike, onReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = (content: string) => {
    if (content.trim() && onReply) {
      onReply(comment.id, content);
      setIsReplying(false);
    }
  };

  return (
    <div className="flex gap-2 group">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage
          src={comment.author.avatar}
          alt={comment.author.name}
          className="object-cover"
        />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="inline-block rounded-2xl bg-gray-100 px-3 py-2">
          <p className="font-semibold text-sm">{comment.author.name}</p>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs">
          {comment.parent_id == null && (
            <>
              <button
                className="font-semibold text-gray-500 hover:underline"
                onClick={() => onLike?.(comment.id)}
              >
                Like
                {comment.likes > 0 && ` · ${comment.likes}`}
              </button>
              <span className="text-gray-500">·</span>
              <button
                className="font-semibold text-gray-500 hover:underline"
                onClick={() => setIsReplying(!isReplying)}
              >
                Reply
              </button>
              <span className="text-gray-500">·</span>
            </>
          )}
          <span className="text-gray-500">
            {new Date(comment.timestamp).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        {isReplying && (
          <div className="mt-2">
            <CommentInput user={comment.author} onSubmit={handleReplySubmit} />
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-2 mt-2 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

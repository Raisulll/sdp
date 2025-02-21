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
    <div className="flex gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="font-semibold text-sm text-[#265073]">
            {comment.author.name}
          </p>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1">
          {comment.parent_id == null && (
            <>
              <button
                className="text-xs text-gray-500 hover:text-[#265073]"
                onClick={() => onLike?.(comment.id)}
              >
                Like {comment.likes > 0 && `(${comment.likes})`}
              </button>
              <button
                className="text-xs text-gray-500 hover:text-[#265073]"
                onClick={() => setIsReplying(!isReplying)}
              >
                Reply
              </button>
            </>
          )}
          <span className="text-xs text-gray-500">
            {new Date(comment.timestamp).toLocaleDateString()}
          </span>
        </div>
        {isReplying && (
          <div className="mt-2">
            <CommentInput user={comment.author} onSubmit={handleReplySubmit} />
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2 space-y-4">
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

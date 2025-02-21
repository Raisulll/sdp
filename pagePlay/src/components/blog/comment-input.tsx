import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useRef } from "react";

interface CommentInputProps {
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  onSubmit: (content: string) => void;
}

export function CommentInput({ user, onSubmit }: CommentInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage
          src={user.avatar}
          alt={user.name}
          className="object-cover"
        />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex items-end gap-2 min-h-[36px] rounded-full bg-gray-100 px-3 py-1">
        <textarea
          ref={textareaRef}
          placeholder="Write a comment..."
          value={content}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-0 focus:ring-0 resize-none text-sm py-1.5 max-h-32 overflow-auto"
          style={{ height: "36px" }}
        />
        <Button
          size="icon"
          variant="ghost"
          className={`h-8 w-8 shrink-0 ${
            content.trim()
              ? "text-[#1877F2] hover:text-[#1877F2]/90"
              : "text-gray-400"
          }`}
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

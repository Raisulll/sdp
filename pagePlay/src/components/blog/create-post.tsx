import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageIcon, Loader2, X } from "lucide-react";
import supabase from "../../../Auth/SupabaseClient";
import { toast } from "react-toastify";
import { useState, useRef } from "react";

interface CreatePostProps {
  user: {
    id: number;
    avatar: string;
    name: string;
  };
  onCreatePost: (content: string, image?: string) => void;
}

export function CreatePost({ user, onCreatePost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`
      .replace(/\s+/g, "-")
      .toLowerCase();

    const { data, error } = await supabase.storage
      .from("books")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file.");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("books")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) return;

    setIsUploading(true);
    try {
      let imageUrl;
      if (selectedImage) {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
          imageUrl = await fileUpload(file);
        }
      }
      await onCreatePost(content, imageUrl);
      setContent("");
      setSelectedImage(null);
      setIsExpanded(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsExpanded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-4 mb-4 shadow-sm">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name}  className="object-cover"/>
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <button
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => textareaRef.current?.focus(), 0);
            }}
            className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500"
          >
            What's on your mind?
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] p-3 text-lg border-none focus:ring-0 resize-none bg-transparent"
              autoFocus
            />

            {selectedImage && (
              <div className="relative rounded-lg overflow-hidden bg-black/5">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="max-h-[300px] w-full object-contain"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1877F2] hover:bg-[#1877F2]/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Photo
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isUploading || (!content.trim() && !selectedImage)}
                  className="bg-[#1877F2] hover:bg-[#1877F2]/90"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </Card>
  );
}

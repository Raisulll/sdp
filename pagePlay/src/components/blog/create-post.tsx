import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, X } from "lucide-react";
import supabase from "../../../Auth/SupabaseClient";
import { toast } from "react-toastify";
import { useState, useRef } from "react";

interface CreatePostProps {
  user: {
    id: number;
    avatar: string;
  };
  onCreatePost: (content: string, image?: string) => void;
}

export function CreatePost({ user, onCreatePost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(user);
  const fileUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    fileName.replace(/\s+/g, "-").toLowerCase();
    console.log("file: ", fileName);

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
    console.log(data);
    const { data: publicUrlData } = supabase.storage
      .from("books")
      .getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;
    console.log("Public URL:", publicUrl);
    return publicUrl;
  };

  const handleSubmit = async () => {
    if (content.trim() || selectedImage) {
      let imageUrl;
      if (selectedImage) {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
          imageUrl = await fileUpload(file);
        }
      }
      onCreatePost(content, imageUrl || undefined);
      setContent("");
      setSelectedImage(null);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-4 mb-6 bg-white shadow-md">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-[#265073] focus-visible:ring-[#265073]"
          />
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-[300px] rounded-lg object-cover"
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
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#265073] hover:text-[#265073]/80"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={handleSubmit}
              className="bg-[#265073] hover:bg-[#1a3b5c]"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

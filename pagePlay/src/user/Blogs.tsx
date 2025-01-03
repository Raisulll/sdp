import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ImageIcon, MessageCircle, Send, X } from "lucide-react";
import { useState, useRef } from "react";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCreatePost = () => {
    if (newPost.trim() || selectedImage) {
      const post: Post = {
        id: Date.now().toString(),
        content: newPost,
        author: {
          name: "Current User",
          avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser",
        },
        image: selectedImage || undefined,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setSelectedImage(null);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            content: comment,
            author: {
              name: "Current User",
              avatar:
                "https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser",
            },
            likes: 0,
            timestamp: new Date().toISOString(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        {/* Create Post */}
        <Card className="p-4 mb-6 bg-white shadow-md">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
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
                  onClick={handleCreatePost}
                  className="bg-[#265073] hover:bg-[#1a3b5c]"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment("");
    }
  };

  return (
    <Card className="bg-white shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-start gap-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>UN</AvatarFallback>
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
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 border-[#265073] focus-visible:ring-[#265073]"
              />
              <Button
                size="icon"
                className="bg-[#265073] hover:bg-[#1a3b5c]"
                onClick={handleSubmitComment}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="font-semibold text-sm text-[#265073]">
                      {comment.author.name}
                    </p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="text-xs text-gray-500 hover:text-[#265073]">
                      Like
                    </button>
                    <button className="text-xs text-gray-500 hover:text-[#265073]">
                      Reply
                    </button>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

import { CreatePost } from "@/components/blog/create-post";
import { PostCard } from "@/components/blog/post-card";
import Navbar from "@/components/navbar";
import type { Post } from "@/types/blog";
import { useState } from "react";

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const currentUser = {
    id: "current-user",
    name: "Current User",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser",
  };

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      image,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now().toString(),
            content,
            author: currentUser,
            likes: 0,
            timestamp: new Date().toISOString(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  const handleLikeComment = (commentId: string) => {
    setPosts(
      posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        ),
      }))
    );
  };

  const handleReplyComment = (commentId: string, content: string) => {
    setPosts(
      posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now().toString(),
              content,
              author: currentUser,
              likes: 0,
              timestamp: new Date().toISOString(),
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        }),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#FEFFF0]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        <CreatePost user={currentUser} onCreatePost={handleCreatePost} />

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={handleLikePost}
              onComment={handleComment}
              onLikeComment={handleLikeComment}
              onReplyComment={handleReplyComment}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

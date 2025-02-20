import { CreatePost } from "@/components/blog/create-post";
import { PostCard } from "@/components/blog/post-card";
import Navbar from "@/components/navbar";
import type { Post } from "@/types/blog";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = {
    id: "current-user",
    name: "Current User",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=currentUser",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/user/fetchPosts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (content: string, image?: string) => {
    try {
      const response = await fetch(`${API_URL}/AddPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, author: currentUser, image }),
      });
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, author: currentUser }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const newComment = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (postId: string, commentId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/posts/${postId}/comments/${commentId}/like`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like comment");
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          ),
        }))
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleReplyComment = async (
    postId: string,
    commentId: string,
    content: string
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/posts/${postId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, author: currentUser }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reply to comment");
      }
      const newReply = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...(comment.replies || []), newReply] }
              : comment
          ),
        }))
      );
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              onLikeComment={(commentId: string) =>
                handleLikeComment(post.id, commentId)
              }
              onReplyComment={(commentId: string, content: string) =>
                handleReplyComment(post.id, commentId, content)
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

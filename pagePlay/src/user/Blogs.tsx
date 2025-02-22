import { CreatePost } from "@/components/blog/create-post";
import { PostCard } from "@/components/blog/post-card";
import Navbar from "@/components/navbar";
import type { Post } from "@/types/blog";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any[]>([]);
  const [secondLoader, setSecondLoader] = useState(true);

  // Get user info from localStorage
  const localdata = localStorage.getItem("user");
  const user1 = JSON.parse(localdata || "{}");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/user/profileInfo?userId=${user1.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user1.userId]);

  // Fetch posts after user data is available and load their previous comments
  useEffect(() => {
    if (!user || user.length === 0) return;
    const fetchPosts = async () => {
      try {
        setSecondLoader(true);
        const response = await fetch(`http://localhost:5000/user/fetchPosts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const postsData = await response.json();
        // For each post, fetch its previous comments
        const postsWithComments = await Promise.all(
          postsData.map(async (post: any) => {
            try {
              const commentResponse = await fetch(
                `http://localhost:5000/user/fetchComments?postId=${post.id}`
              );
              if (!commentResponse.ok) {
                throw new Error("Failed to fetch comments");
              }
              const commentsData = await commentResponse.json();
              return {
                ...post,
                author: user[0],
                comments: commentsData || [],
              };
            } catch (error) {
              console.error(
                "Error fetching comments for post:",
                post.id,
                error
              );
              return {
                ...post,
                author: user[0],
                comments: [],
              };
            }
          })
        );
        setPosts(postsWithComments);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setSecondLoader(false);
      }
    };
    fetchPosts();
  }, [user]);

  // Skeleton Loader for when user data isn't ready
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-lg p-6 space-y-4 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!user || user.length === 0|| loading || secondLoader) return <SkeletonLoader />;

  const currentUser = {
    id: user[0].id,
    name: user[0].firstname + " " + user[0].lastname,
    avatar: user[0].image,
  };

  // Create a new post (existing functionality)
  const handleCreatePost = async (content: string, image?: string) => {
    try {
      const response = await fetch(`http://localhost:5000/user/AddPosts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, author: user[0].id, image }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      const newPost = await response.json();
      const newPostWithAuthor = {
        ...newPost,
        author: currentUser,
        comments: [],
      };
      setPosts((prevPosts) => [newPostWithAuthor, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Create a new parent comment
  const handleComment = async (postId: string, content: string) => {
    console.log("New comment:", postId, content);
    try {
      const response = await fetch(`http://localhost:5000/user/addNewComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content, author: currentUser }),
      });
      if (!response.ok) throw new Error("Failed to create comment");
      const newComment = await response.json();
      const formattedComment = {
        id: newComment.id,
        content: newComment.content,
        likes: newComment.likes,
        timestamp: newComment.timestamp,
        author: newComment.author,
        replies: newComment.replies || [],
      };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, formattedComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Reply to a comment
  const handleReplyComment = async (
    postId: string,
    commentId: string,
    content: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${postId}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, author: currentUser }),
        }
      );
      if (!response.ok) throw new Error("Failed to reply to comment");
      const newReply = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies
                          ? [...comment.replies, newReply]
                          : [newReply],
                      }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  // Like a comment
  const handleLikeComment = async (postId: string, commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${postId}/comments/${commentId}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to like comment");
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, likes: data.likes }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />
      <main className="max-w-[680px] mx-auto px-4 pt-20 pb-12">
        <CreatePost user={currentUser} onCreatePost={handleCreatePost} />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={(postId: string) => {
                // ... existing post-like functionality
              }}
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
      <Footer />
    </div>
  );
}

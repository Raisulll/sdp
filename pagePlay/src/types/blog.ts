export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  content: string;
  author: User;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  github?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
}

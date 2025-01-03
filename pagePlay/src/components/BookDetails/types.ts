export interface BookDetails {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  totalRatings: number;
  totalReviews: number;
  pages: number;
  language: string;
  publishDate: string;
  description: string;
  genre: string[];
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  content: string;
  likes: number;
}

export interface SimilarBook {
  id: string;
  title: string;
  coverUrl: string;
  rating: number;
}

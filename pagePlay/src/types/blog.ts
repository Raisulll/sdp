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
  linkedin: string | undefined;
  twitter: string | undefined;
  facebook?: string;
  instagram?: string;
  github?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  description: string;
  pdfUrl: string;
  audioUrl?: string;
  price?: number;
  totalReviews?: number;
  language?: string;
  publishDate?: string;
  genre?: string[];
  pages?: number;
}

export interface BookDetails {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  rating: number;
  pdfUrl: string;
  audioUrl?: string;
  currentPage?: number;
  status?: "reading" | "finished";
}

export interface PDFReaderProps {
  pdfUrl?: string;
  totalPages?: number;
  maxWidth?: string;
  audioUrl?: string;
  bookTitle?: string;
  author?: string;
  description?: string;
  rating?: number;
}

export interface AudioControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onProgressChange: (value: number[]) => void;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export interface Transaction {
  id: string;
  bookName: string;
  publisherName: string;
  date: string;
  amount: number;
}

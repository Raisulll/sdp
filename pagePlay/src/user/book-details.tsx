import { ReportModal } from "@/components/BookDetails/ReportModal";
import { WriteReviewModal } from "@/components/BookDetails/WriteReviewModal";
import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { suggestedBooks, trendingBooks } from "@/data/books";
import { useToast } from "@/hooks/use-toast";
import { type Book } from "@/types/blog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";

interface Review {
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

const BookDetails: React.FC = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const onWriteReview = () => {
    setIsReviewModalOpen(true);
  };

  const onCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const book: Book = {
    ...trendingBooks[0],
    coverImage: trendingBooks[0].coverImage,
  };

  const { toast } = useToast();
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${book.title} has been added to your wishlist.`,
    });
  };

  const reviews: Review[] = [
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2 days ago",
      content:
        "This book was absolutely amazing! The character development and plot twists kept me engaged throughout. Highly recommended for anyone who enjoys this genre.",
      likes: 24,
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "1 week ago",
      content:
        "A great read overall, though some parts in the middle felt a bit slow. The ending more than made up for it though!",
      likes: 16,
    },
  ];

  const similarBooks: Book[] = suggestedBooks;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E8] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Book Header */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
            <div className="space-y-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />

              <div className="text-2xl font-bold text-center text-[#265073]">
                ${book.price ? book.price.toFixed(2) : "N/A"}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full bg-[#265073] hover:bg-[#265073]/90">
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#265073] mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    <span className="ml-2">{book.rating}</span>
                  </div>
                  <span>|</span>
                  <span>{book.rating.toLocaleString()} Ratings</span>
                  <span>|</span>
                  <span>
                    {(book.totalReviews ?? 0).toLocaleString()} Reviews
                  </span>
                  <Button
                    variant="link"
                    className="text-[#265073] p-0 h-auto"
                    onClick={onWriteReview}
                  >
                    Write a Review
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2 font-medium">{book.pages}</span>
                </div>
                <div>
                  <span className="text-gray-600">Language:</span>
                  <span className="ml-2 font-medium">{book.language}</span>
                </div>
                <div>
                  <span className="text-gray-600">Published:</span>
                  <span className="ml-2 font-medium">{book.publishDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Genre:</span>
                  <span className="ml-2 font-medium">
                    {book.genre ? book.genre.join(", ") : "N/A"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{book.description}</p>
              </div>
            </div>
          </div>

          {/* Rating Statistics */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
            <div className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#265073] mb-2">
                  {book.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(book.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <div className="text-sm text-gray-600">
                  {book.rating.toLocaleString()} ratings
                </div>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex items-center w-20">
                      {Array(stars)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                    </div>
                    <Progress value={Math.random() * 100} className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.user.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="mx-2">•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setIsReportModalOpen(true)}
                            className="text-red-600"
                          >
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center">
              <Button variant="outline" className="space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Show More Reviews</span>
              </Button>
            </div>
          </div>

          {/* Similar Books */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Similar Books</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <div className="flex w-max space-x-4 p-4">
                {similarBooks.map((book, i) => (
                  <div key={`${book.id}-${i}`} className="w-[150px] space-y-2">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-[200px] object-cover rounded-lg shadow-md"
                    />
                    <div className="text-sm font-medium truncate">
                      {book.title}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {book.rating}
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
        <WriteReviewModal
          book={book}
          isOpen={isReviewModalOpen}
          onClose={onCloseReviewModal}
        />
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>
    </>
  );
};

export default BookDetails;

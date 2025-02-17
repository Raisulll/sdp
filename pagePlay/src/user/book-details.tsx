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
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Star,
  ThumbsUp,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Book {
  id: number;
  title: string;
  author: string;
  publication_date: string;
  isbn: string;
  genre: string;
  description: string;
  cover_image_url: string;
  status: string;
  publisher_id: number;
  price: number;
  rating: number;
  total_reviews: number;
  pages: number;
  pdf_file_url: string;
  shopId: number;
}

interface Review {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
  rating: string;
  created_at: string;
  comment: string;
  likes: number;
}

const BookDetails: React.FC = () => {
  const { bookId, publisherId } = useParams<{
    bookId: string;
    publisherId: string;
  }>();
  const { toast } = useToast();

  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);

  // fetch user form local storage
  const localdata = localStorage.getItem("user");
  const actualdata = localdata ? JSON.parse(localdata) : null;

  // Fetch Book Data
  const fetchBook = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/user/pdfUrl?bookId=${bookId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch book data: ${response.statusText}`);
      }
      const data = await response.json();
      setBook(data);
    } catch (err: any) {
      console.error("Error fetching book:", err);
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  // Fetch Similar Books
  const fetchSimilarBooks = useCallback(
    async (genre: string) => {
      try {
        console.log("bookId", bookId, "genre", genre);

        const response = await fetch(
          `http://localhost:5000/user/similarBooks?bookId=${bookId}&genre=${genre}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch similar books: ${response.statusText}`
          );
        }
        const data = await response.json();
        setSimilarBooks(data);
      } catch (err) {
        console.error("Error fetching similar books:", err);
      }
    },
    [bookId]
  );

  useEffect(() => {
    if (book) {
      fetchSimilarBooks(book[0].genre);
    }
  }, [book, fetchSimilarBooks]);

  // Fetch Reviews
  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/reviews?bookId=${bookId}&publisherId=${publisherId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }
      const data = await response.json();

      const formattedReviews = data.map((review: any) => ({
        id: review.id,
        firstname: review.firstname,
        lastname: review.lastname,
        image: review.image,
        rating: review.rating,
        created_at: review.created_at,
        comment: review.comment,
        likes: review.likes,
      }));

      setReviews((prev) =>
        reviewsPage === 1 ? formattedReviews : [...prev, ...formattedReviews]
      );
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [bookId, publisherId, reviewsPage]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // fetch the rating of the book
  const fetchRating = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/rating?bookId?bookId=${bookId}?publisherId=${publisherId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch rating: ${response.statusText}`);
      }
      const data = await response.json();
      setBook((prev) => (prev ? { ...prev, rating: data.rating } : prev));
    } catch (err) {
      console.error("Error fetching rating:", err);
    }
  }, [bookId]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  const handleAddToCart = async () => {
    const data = {
      bookId: bookId,
      publisherId: publisherId,
      userId: actualdata.userId,
    };

    try {
      const response = await fetch("http://localhost:5000/user/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await response.json();
        toast({
          title: "Added to cart",
          description: "The book has been successfully added to your cart.",
        });
        // navigate to wish-list
        window.location.href = "/wish-list";
      } else {
        const errorMessage = await response.text();
        toast({
          title: "Error",
          description: errorMessage || "Failed to add book to cart.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding to cart.",
        variant: "destructive",
      });
    }
  };

  const loadMoreReviews = () => {
    setReviewsPage((prev) => prev + 1);
  };

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-[#F5F0E8] pt-24 flex justify-center items-center">
      <div className="animate-pulse space-y-4">
        <div className="w-64 h-8 bg-gray-300 rounded"></div>
        <div className="w-96 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-24 flex flex-col justify-center items-center">
        <p className="mb-4 text-red-600">Error: {error}</p>
        <Button
          onClick={fetchBook}
          className="bg-[#265073] hover:bg-[#265073]/90"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-24 flex justify-center items-center">
        Book not found
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E8] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Book Header */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
            <div className="space-y-4">
              <img
                src={book[0].cover_image_url}
                alt={book[0].title}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="text-2xl font-bold text-center text-[#265073]">
                ${book[0].price}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full bg-[#265073] hover:bg-[#265073]/90">
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#265073] mb-2">
                  {book[0].title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  by {book[0].author}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book[0].rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    <span className="ml-2">{book[0].rating}</span>
                  </div>
                  <span>•</span>
                  <span>{book[0].total_reviews} Reviews</span>
                  <Button
                    variant="link"
                    className="text-[#265073] p-0 h-auto"
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    Write a Review
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2 font-medium">{book[0].pages}</span>
                </div>
                <div>
                  <span className="text-gray-600">Language:</span>
                  <span className="ml-2 font-medium">English</span>
                </div>
                <div>
                  <span className="text-gray-600">Published:</span>
                  <span className="ml-2 font-medium">
                    {new Date(book[0].publication_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Genre:</span>
                  <span className="ml-2 font-medium">{book[0].genre}</span>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{book[0].description}</p>
              </div>
            </div>
          </div>

          {/* Rating Statistics */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
            <div className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#265073] mb-2">
                  {book[0].rating}
                </div>
                <div className="flex justify-center mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(book[0].rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <div className="text-sm text-gray-600">
                  {book[0].total_reviews} ratings
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
                    <AvatarImage
                      src={review.image}
                      alt={`${review.firstname} ${review.lastname}`}
                    />
                    <AvatarFallback>
                      {review.firstname?.[0]}
                      {review.lastname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">
                          {review.firstname} {review.lastname}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(parseFloat(review.rating))
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
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
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center">
              <Button
                variant="outline"
                className="space-x-2"
                onClick={loadMoreReviews}
              >
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
                {similarBooks.map((similarBook) => (
                  <div
                    key={similarBook.id}
                    className="w-[150px] space-y-2 cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/book-details/${similarBook.id}/${similarBook.publisher_id}`)
                    }
                  >
                    <img
                      src={similarBook.cover_image_url}
                      alt={similarBook.title}
                      className="w-full h-[200px] object-cover rounded-lg shadow-md"
                    />
                    <div className="text-sm font-medium truncate">
                      {similarBook.title}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {similarBook.rating}
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
          onClose={() => setIsReviewModalOpen(false)}
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

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
import {
  MessageCircle,
  MoreVertical,
  ShoppingCart,
  Star,
  ThumbsUp,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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

function formatRelativeTime(dateString: string): string {
  const date = new Date(
    dateString.endsWith("Z") ? dateString : `${dateString}Z`
  );
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

const BookDetails: React.FC = () => {
  const { bookId, publisherId } = useParams<{
    bookId: string;
    publisherId?: string;
  }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book[] | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [purchased, setPurchased] = useState(false);

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
      const formattedReviews = data
        .map((review: any) => ({
          id: review.id,
          firstname: review.firstname,
          lastname: review.lastname,
          image: review.image,
          rating: review.rating,
          created_at: review.created_at,
          comment: review.comment,
          likes: review.likes,
        }))
        .sort(
          (a: Review, b: Review) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      setReviews(formattedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [bookId, publisherId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);


// useEffect(() => {
//   const fetchRating = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/user/rating?bookId=${bookId}&publisherId=${publisherId}`
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch rating: ${response.statusText}`);
//       }
//       const data = await response.json();
//       // If the API returns a number directly, use it;
//       // otherwise, assume it returns an object with a 'rating' property.
//       const newRating = typeof data === "number" ? data : data.rating;
//       setBook((prev) =>
//         prev ? [{ ...prev[0], rating: newRating }, ...prev.slice(1)] : prev
//       );
//     } catch (err) {
//       console.error("Error fetching rating:", err);
//     }
//   };
//   fetchRating();
// }, [bookId, publisherId]);


  // Updated: Ensure we have a valid publisher ID.
  const getPublisherId = (): number | null => {
    if (publisherId) {
      return Number(publisherId);
    } else if (book && book[0]?.publisher_id) {
      return book[0].publisher_id;
    }
    return null;
  };

  useEffect(()=>{
    const fetchPurchased = async () => {
      console.log("Fetching purchased books");
      try {
        const response = await fetch(
          `http://localhost:5000/user/isPurchased?userId=${actualdata.userId}&bookId=${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch purchased books");
        }
        const data = await response.json();
        console.log(data);
        setPurchased(data.purchased);
        console.log(purchased);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPurchased();
  },[bookId, actualdata.userId]);

  const handleBuyNow = async () => {
    const validPublisherId = getPublisherId();
    if (!validPublisherId) {
      toast.error("Publisher information is missing.");
      return;
    }
    const data = {
      bookId: Number(bookId),
      publisherId: validPublisherId,
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
        toast.success("The book has been successfully added to your cart.");
        navigate("/cart");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage || "Failed to add book to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred while adding to cart.");
    }
  };

  const handleAddToCart = async () => {
    const validPublisherId = getPublisherId();
    if (!validPublisherId) {
      toast.error("Publisher information is missing.");
      return;
    }
    const data = {
      bookId: Number(bookId),
      publisherId: validPublisherId,
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
        toast.success("The book has been successfully added to your cart.");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage || "Failed to add book to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred while adding to cart.");
    }
  };



  // Reviews and rating distribution computations…
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const totalReviewCount = reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (r) => Math.round(parseFloat(r.rating)) === star
    ).length;
    const percent = totalReviewCount ? (count / totalReviewCount) * 100 : 0;
    return { star, count, percent };
  });

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
        <ToastContainer />
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
                ৳{book[0].price}
              </div>
              <div className="grid  gap-4">
                {purchased ? (
                  <div className="flex justify-center">
                    <Button
                      // on click navigate to the pdf reader / book id
                      onClick={() => navigate(`/pdf-reader/${bookId}`)}
                      className="justify-center bg-[#265073] hover:bg-[#265073]/90"
                    >
                      Open Book
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleBuyNow}
                      className="w-full bg-[#265073] hover:bg-[#265073]/90"
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                )}
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
                  {book?.[0]?.rating || "N/A"}
                </div>
                <div className="flex justify-center mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(book?.[0]?.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <div className="text-sm text-gray-600">
                  {book?.[0]?.total_reviews || 0} ratings
                </div>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map(({ star, count, percent }) => (
                  <div key={star} className="flex items-center gap-4">
                    <div className="flex items-center w-20">
                      {Array(star)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={`${star}-${i}`}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                    </div>
                    <Progress value={percent} className="flex-1" />
                    <span
                      className="text-sm text-gray-600"
                      title={`${count} reviews`}
                    >
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
            {displayedReviews.map((review) => (
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
                          <span>{formatRelativeTime(review.created_at)}</span>
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
            {!showAllReviews && reviews.length > 2 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  className="space-x-2"
                  onClick={() => setShowAllReviews(true)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Show More Reviews</span>
                </Button>
              </div>
            )}
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

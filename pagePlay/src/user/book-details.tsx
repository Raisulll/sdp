import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Heart, MessageCircle, Share2, Star } from "lucide-react";

export default function BookDetails() {
  // Sample data
  const book = {
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    totalRatings: 2345,
    totalReviews: 1234,
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
    publishDate: "September 29, 2020",
    publisher: "Viking",
    pages: 304,
    language: "English",
    isbn: "978-0525559474",
    genres: ["Fiction", "Fantasy", "Contemporary"],
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah",
      },
      rating: 5,
      date: "March 15, 2024",
      comment:
        "This book completely changed my perspective on life. The way the author weaves together multiple storylines while maintaining the central theme is simply masterful.",
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Michael",
      },
      rating: 4,
      date: "March 14, 2024",
      comment:
        "A beautiful exploration of choices and regrets. While some parts felt a bit slow, the overall message is powerful and thought-provoking.",
    },
    {
      id: 3,
      user: {
        name: "Emma Thompson",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Emma",
      },
      rating: 5,
      date: "March 13, 2024",
      comment:
        "Absolutely couldn't put it down! The concept is unique and the execution is flawless. A must-read for anyone who's ever wondered 'what if?'",
    },
  ];

  const similarBooks = [
    {
      id: 1,
      title: "The Invisible Life of Addie LaRue",
      cover: "https://picsum.photos/seed/book1/200/300",
      author: "V.E. Schwab",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      cover: "https://picsum.photos/seed/book2/200/300",
      author: "Andy Weir",
    },
    {
      id: 3,
      title: "Klara and the Sun",
      cover: "https://picsum.photos/seed/book3/200/300",
      author: "Kazuo Ishiguro",
    },
    {
      id: 4,
      title: "Cloud Cuckoo Land",
      cover: "https://picsum.photos/seed/book4/200/300",
      author: "Anthony Doerr",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        {/* Book Header Section */}
        <div className="grid md:grid-cols-[350px_1fr] gap-8 mb-12">
          {/* Book Cover */}
          <div className="space-y-4">
            <Card className="p-4 bg-white shadow-lg">
              <div className="relative aspect-[2/3] w-full">
                <img
                  src="https://picsum.photos/seed/book/800/1200"
                  alt={book.title}
                  className="object-cover rounded-lg"
                />
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-[#265073] hover:bg-[#1a3b5c]">
                <BookOpen className="mr-2 h-4 w-4" />
                Read Now
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to List
              </Button>
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#265073] mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-[#265073] text-[#265073]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-[#265073] font-semibold">
                    {book.rating}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-gray-600">
                  {book.totalRatings.toLocaleString()} ratings
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-gray-600">
                  {book.totalReviews.toLocaleString()} reviews
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#265073]">
                About the Book
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <span className="font-medium text-[#265073]">Published:</span>{" "}
                <span className="text-gray-600">{book.publishDate}</span>
              </div>
              <div>
                <span className="font-medium text-[#265073]">Publisher:</span>{" "}
                <span className="text-gray-600">{book.publisher}</span>
              </div>
              <div>
                <span className="font-medium text-[#265073]">Pages:</span>{" "}
                <span className="text-gray-600">{book.pages}</span>
              </div>
              <div>
                <span className="font-medium text-[#265073]">Language:</span>{" "}
                <span className="text-gray-600">{book.language}</span>
              </div>
              <div>
                <span className="font-medium text-[#265073]">ISBN:</span>{" "}
                <span className="text-gray-600">{book.isbn}</span>
              </div>
            </div>

            <div>
              <h3 className="text-[#265073] font-medium mb-2">Genres</h3>
              <div className="flex gap-2">
                {book.genres.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-[#C2D9FF] hover:bg-[#B1CDFF] text-[#265073]"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rating Statistics */}
        <Card className="p-6 bg-[#FAF7ED] mb-12">
          <h2 className="text-2xl font-bold text-[#265073] mb-6">
            Ratings & Reviews
          </h2>
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#265073] mb-2">
                {book.rating}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(book.rating)
                        ? "fill-[#265073] text-[#265073]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-600">{book.totalRatings} ratings</div>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    <Star className="w-4 h-4 fill-[#265073] text-[#265073]" />
                    <span className="text-sm text-gray-600">{rating}</span>
                  </div>
                  <Progress
                    value={Math.random() * 100}
                    className="h-2 w-full bg-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Reviews Section */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#265073]">Reviews</h2>
            <Button className="bg-[#265073] hover:bg-[#1a3b5c]">
              <MessageCircle className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          </div>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 bg-white">
                <div className="flex items-start gap-4">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#265073]">
                          {review.user.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-[#265073] text-[#265073]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Similar Books Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#265073]">Similar Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarBooks.map((book) => (
              <Card
                key={book.id}
                className="p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-[2/3] w-full mb-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-[#265073] line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-600 border-yellow-300 flex items-center gap-1"
        >
          <Clock className="w-3 h-3" />
          Pending Review
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-600 border-red-300 flex items-center gap-1"
        >
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>
      );
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-600 border-green-300 flex items-center gap-1"
        >
          <CheckCircle2 className="w-3 h-3" />
          Approved
        </Badge>
      );
    default:
      return null;
  }
};

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
  name: string;
  price?: string;
}

export default function RequestedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const localdata = localStorage.getItem("user");
  const user = JSON.parse(localdata || "{}");
  const publisherId = user.publisherId;

  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await fetch(
          `http://localhost:5000/publisher/requestedBooks?publisherId=${publisherId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        console.log("Fetched data:", data);
        // Convert publication_date to format "January 15, 2024"
        data.forEach((book: Book) => {
          const date = new Date(book.publication_date);
          book.publication_date = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        });
        setBooks(data);
      } catch (error: any) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [publisherId]);

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="container mx-auto px-12 md:px-24 lg:px-32 py-20">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#265073]">
              Requested Books
            </h1>
            <p className="text-gray-600">
              Track the status of your submitted books
            </p>
          </div>
          {/* <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search submitted books"
              className="pl-10 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div> */}
        </div>

        {/* Books List */}
        <div className="space-y-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Book Cover */}
                <div className="w-32 h-48 flex-shrink-0">
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2
                        className="text-xl font-bold text-[#265073] mb-1 cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/publisher-pdf-reader/${book.id}`)
                        }
                      >
                        {book.title}
                      </h2>
                      <span className="font-medium text-[#265073]">
                        Author:
                      </span>{" "}
                      <span className="text-gray-600">{book.author}</span>
                    </div>
                    <StatusBadge status={book.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[#265073]">Genre:</span>{" "}
                      <span className="text-gray-600">{book.genre}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#265073]">
                        Publication Date:
                      </span>{" "}
                      <span className="text-gray-600">
                        {book.publication_date}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-[#265073]">ISBN:</span>{" "}
                      <span className="text-gray-600">{book.isbn}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#265073]">
                        Submitted:
                      </span>{" "}
                      <span className="text-gray-600">January 15, 2024</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#265073]">Price:</span>{" "}
                      <span className="text-gray-600">{book.price}$</span>
                    </div>
                  </div>

                  <p className="text-gray-600 line-clamp-2">
                    {book.description}
                  </p>

                  {book.status === "rejected" && (
                    <div className="flex items-start gap-2 text-sm bg-red-50 p-3 rounded-md">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="text-red-600">
                        <p className="font-medium">Rejection Reason:</p>
                        <p>
                          The submitted content does not meet our community
                          guidelines. Please review our content policy and make
                          necessary adjustments before resubmitting.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

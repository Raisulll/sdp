import Sidebar from "@/components/SlideBar";
import { useEffect, useState } from "react";

export interface PendingBook {
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
}

const PendingBooks = () => {
  const [pendingBooks, setPendingBooks] = useState<PendingBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetch("http://localhost:5000/admin/pendingBooks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        console.log("Fetched data:", data);
        setPendingBooks(data);
      } catch (error: any) {
        console.error("Error fetching books:", error);
        setError(error.message || "Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAction = async (id: number, publisher_id: number, action: "approve" | "reject") => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/${action}Book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId:id, publisher_id }),
        }
      );

      if (response.ok) {
        setPendingBooks(pendingBooks.filter((book) => book.id !== id));
      } else {
        console.error(`Failed to ${action} book`);
      }
    } catch (error) {
      console.error(`Error during ${action} action:`, error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-6">
          Pending Books
        </h1>

        {loading && <p>Loading books...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="space-y-6">
          {pendingBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-white shadow-md rounded-lg flex items-start gap-6"
            >
              {/* Cover Image */}
              <div className="w-32 h-48 flex-shrink-0">
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    console.error(
                      "Failed to load image:",
                      book.cover_image_url
                    );
                  }}
                />
              </div>

              {/* Book Details */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#265073]">
                  {book.title}
                </h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Genre: {book.genre}</p>
                <p className="text-gray-600">ISBN: {book.isbn}</p>
                <p className="text-gray-600">Price: {book.price}$</p>
                <p className="text-gray-600">
                  Publisher: <b>{book.name}</b>
                </p>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {book.description}
                </p>

                {/* Accept & Reject Buttons */}
                <div className="mt-4 flex gap-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() =>
                      handleAction(book.id, book.publisher_id, "approve")
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() =>
                      handleAction(book.id, book.publisher_id, "reject")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pendingBooks.length === 0 && !loading && !error && (
            <p className="text-gray-500 text-center">
              No pending books available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingBooks;

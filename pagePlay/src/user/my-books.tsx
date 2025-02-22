import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function MyBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/myBooks?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch my books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyBooks();
  });
  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#265073]">Booklist</h1>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search Your Books"
              className="pl-10 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="group relative aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/pdf-reader/" + book.id)}
            >
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-medium">View Details</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

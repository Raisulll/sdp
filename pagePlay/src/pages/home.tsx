import { BookCard } from "@/components/book-card";
import { BookCarousel } from "@/components/book-carousel";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReadingChallenge } from "@/components/reading-challenge";
import { Input } from "@/components/ui/input";
import { WelcomeCard } from "@/components/welcome-card";
import { Search } from "lucide-react";
import { useState, type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const transformBookData = (book: any) => ({
  ...book,
  publisherId: book.publisher_id,
  coverImage: book.cover_image_url,
});

const HomePage: FC = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBookClick = (bookId: number, publisherId: number) => {
    navigate(`/book-details/${bookId}/${publisherId}`);
  };

  // Fetch trending books
  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/user/trendingBooks");
        if (!response.ok) {
          throw new Error("Failed to fetch trending books");
        }
        const data = await response.json();
        setTrendingBooks(data.map(transformBookData));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingBooks();
  }, []);

  // Fetch suggested books
  useEffect(() => {
    const fetchSuggestedBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/suggestedBooks");
        if (!response.ok) {
          throw new Error("Failed to fetch suggested books");
        }
        const data = await response.json();
        setSuggestedBooks(data.map(transformBookData));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestedBooks();
  }, []);

  // Handle search input change event.
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/user/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      setSearchResults(data.map(transformBookData));
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-[#F5F0E8] pt-24 flex justify-center items-center">
      <div className="animate-pulse space-y-4">
        <div className="w-64 h-8 bg-gray-300 rounded"></div>
        <div className="w-96 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search Your Books"
              className="pl-10 py-6 text-lg border-[#265073] focus-visible:ring-[#265073]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Conditionally render search results or default home page */}
        {searchTerm.trim() !== "" ? (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#265073] mb-6">
              Search Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((book: any) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => handleBookClick(book.id, book.publisherId)}
                    coverImage={book.coverImage}
                  />
                ))
              ) : (
                <p>No results found for "{searchTerm}"</p>
              )}
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8">
            {/* Left Sidebar (Static) */}
            <div className="sticky top-24">
              <ReadingChallenge
                targetBooks={12}
                currentStats={{
                  wantToRead: 0,
                  completed: 0,
                  currentlyReading: 0,
                }}
                
              />
            </div>

            {/* Middle Content (Scrollable) */}
            <div className="space-y-12 overflow-y-auto max-h-[calc(100vh-120px)] px-4">
              {/* Trending Books Section */}
              <section>
                <h2 className="text-2xl font-bold text-[#265073] mb-6">Trending Books</h2>
                <BookCarousel
                  books={trendingBooks}
                  onBookClick={handleBookClick}
                  className="mb-6"
                />
              </section>

              {/* Suggestions Section */}
              <section>
                <h2 className="text-2xl font-bold text-[#265073] mb-6">Suggestions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {suggestedBooks.map((book: any) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onClick={() => handleBookClick(book.id, book.publisherId)}
                      coverImage={book.coverImage}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar (Static) */}
            <div className="sticky top-24">
              <WelcomeCard year={2024} />
            </div>
          </div>
        )}
      </main>

      <Footer  />
    </div>
  );
};

export default HomePage;

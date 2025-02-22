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

const socialLinks = {
  twitter: undefined,
  facebook: "https://facebook.com/pageplay",
  instagram: "https://instagram.com/pageplay",
  github: "https://github.com/pageplay",
  linkedin: undefined,
};

const transformBookData = (book: any) => ({
  ...book,
  publisherId: book.publisher_id,
  coverImage: book.cover_image_url,
});

const HomePage: FC = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
        const response = await fetch(
          "http://localhost:5000/user/trendingBooks"
        );
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
        const response = await fetch(
          "http://localhost:5000/user/suggestedBooks"
        );
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

  // Handle the search input change event.
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
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
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* If search results exist, show them; otherwise show the main content */}
        {searchResults.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold text-[#265073] mb-6">
              Search Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {searchResults.map((book: any) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => handleBookClick(book.id, book.publisherId)}
                  coverImage={book.coverImage}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8">
            {/* Left Sidebar */}
            <div>
              <ReadingChallenge
                targetBooks={12}
                currentStats={{
                  wantToRead: 0,
                  completed: 0,
                  currentlyReading: 0,
                }}
                socialLinks={socialLinks}
              />
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Trending Books Section */}
              <section>
                <h2 className="text-2xl font-bold text-[#265073] mb-6">
                  Trending Books
                </h2>
                <BookCarousel
                  books={trendingBooks}
                  onBookClick={handleBookClick}
                  className="mb-6"
                />
              </section>

              {/* Suggestions Section */}
              <section>
                <h2 className="text-2xl font-bold text-[#265073] mb-6">
                  Suggestions
                </h2>
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

            {/* Right Sidebar (Sticky) */}
            <div className="relative">
              <div className="sticky top-24">
                <WelcomeCard year={2024} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default HomePage;

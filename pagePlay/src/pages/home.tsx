import { BookCard } from "@/components/book-card";
import { BookCarousel } from "@/components/book-carousel";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReadingChallenge } from "@/components/reading-challenge";
import { Input } from "@/components/ui/input";
import { WelcomeCard } from "@/components/welcome-card";
import { suggestedBooks, trendingBooks } from "@/data/books";
import { Search } from "lucide-react";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";

const socialLinks = {
  facebook: "https://facebook.com/pageplay",
  instagram: "https://instagram.com/pageplay",
  github: "https://github.com/pageplay",
};

const HomePage: FC = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book-details`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle search
    console.log("Searching:", event.target.value);
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

        {/* Main Content Grid */}
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
            {/* Trending Books */}
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

            {/* Suggestions */}
            <section>
              <h2 className="text-2xl font-bold text-[#265073] mb-6">
                Suggestions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {suggestedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={handleBookClick}
                    coverImage={book.coverImage}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div>
            <WelcomeCard year={2024} />
          </div>
        </div>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default HomePage;

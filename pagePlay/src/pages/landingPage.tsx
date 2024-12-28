import Navbar_guest from "@/components/navbar_guest";
import { Button } from "@/components/ui/button";
import book from "../assets/large-book.svg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#e5eadd] flex flex-col">
      <Navbar_guest />

      {/* Hero Section */}
      <main className="flex-grow w-full px-4 py-12 md:py-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Your{" "}
                <span className="text-[#5D4E96]">Favourite Books</span> From
                <br />
                PagePlay
              </h1>
              <p className="text-gray-700 text-lg md:text-xl max-w-[600px]">
                PagePlay is one of the biggest online book libraries, containing
                over 20,000+ books. You can explore a vast collection of eBooks,
                available for all book lovers. Visit our site regularly to
                discover and read your favorite PDF books online!
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Browse Library
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 lg:mt-0">
              <img
                src={book}
                alt="Stack of colorful books with decorative elements"
                className="w-full max-w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

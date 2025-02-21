import Navbar_guest from "@/components/navbar_guest";
import { Button } from "@/components/ui/button";
import book from "../assets/large-book.svg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#E5EADD] flex flex-col">
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
              <p className="text-lg md:text-xl max-w-[600px]">
                PagePlay is one of the biggest online book libraries, containing
                over 20,000+ books. You can explore a vast collection of eBooks,
                available for all book lovers. Visit our site regularly to
                discover and read your favorite PDF books online!
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="text-[#ffffff] "
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

      {/* Featured Books Section */}
      <section className="py-12 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Books</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add your featured books here */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Book Title 1</h3>
              <p className="text-gray-700">Author Name</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Book Title 2</h3>
              <p className="text-gray-700">Author Name</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Book Title 3</h3>
              <p className="text-gray-700">Author Name</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add your testimonials here */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-700">"PagePlay has an amazing collection of books. I found all my favorite titles here!"</p>
              <p className="text-gray-500 mt-2">- User Name</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-700">"The user interface is so intuitive and easy to use. Highly recommend PagePlay!"</p>
              <p className="text-gray-500 mt-2">- User Name</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-700">"I love the variety of books available. There's something for everyone."</p>
              <p className="text-gray-500 mt-2">- User Name</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join PagePlay Today</h2>
          <p className="text-lg mb-8">Sign up now and start exploring our vast collection of books!</p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2025 PagePlay. All rights reserved.</p>
      </footer>
    </div>
  );
}
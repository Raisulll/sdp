"use client"

import Navbar_guest from "@/components/navbar_guest"
import { Button } from "@/components/ui/button"
import book from "../assets/large-book.svg"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "@/components/footer"

// Importing images
import sabbirImage from "../assets/sabbir.jpg"
import raisulImage from "../assets/Raisul.png"
import anikaImage from "../assets/Anika.jpg"
import foisalImage from "../assets/foisal.jpg"
import kabboImage from "../assets/kabbo.jpg"
import arifImage from "../assets/arif.jpg"

const socialLinks = {
  twitter: undefined,
  facebook: "https://facebook.com/pageplay",
  instagram: "https://instagram.com/pageplay",
  github: "https://github.com/pageplay",
  linkedin: undefined,
};

const reviews = [
  {
    userName: "Md. Sabbir Hossain",
    userImage: sabbirImage,
    review:
      "PagePlay has an amazing collection of books. I found all my favorite titles here! The browsing experience is seamless, and I love the community reviews feature.",
  },
  {
    userName: "Md. Raisul Islam Rahat",
    userImage: raisulImage,
    review:
      "The user interface is so intuitive and easy to use. Highly recommend PagePlay! It's my go-to platform for discovering new books and reading reviews from other readers.",
  },
  {
    userName: "Anika Tahsin",
    userImage: anikaImage,
    review:
      "I've discovered so many great books through PagePlay. The recommendations are spot-on, and I love how easy it is to keep track of my reading list.",
  },
  {
    userName: "Foisal Ahmed",
    userImage: foisalImage,
    review:
      "As an avid reader, I'm impressed by the vast selection of books on PagePlay. The platform is user-friendly and makes finding new reads a joy.",
  },
  {
    userName: "Kabbo Chowdhury",
    userImage: kabboImage,
    review:
      "PagePlay is a fantastic platform for book lovers. The community reviews help me discover hidden gems, and the reading experience is top-notch.",
  },
  {
    userName: "Arif Mahmud",
    userImage: arifImage,
    review:
      "I love the variety of books available on PagePlay. The platform is easy to navigate, and I appreciate the personalized recommendations based on my reading preferences.",
  }
]


export default function LandingPage() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 2) % reviews.length)
    }, 5000) // Change reviews every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const nextReviews = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 2) % reviews.length)
  }

  const prevReviews = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 2 + reviews.length) % reviews.length)
  }

  const StarIcon = ({ className }: { className?: string }) => <Star className={className} />

  return (
    <div className="min-h-screen bg-[#E5EADD] flex flex-col">
      <Navbar_guest />

      {/* Hero Section */}
      <main className="flex-grow w-full px-4 py-12 md:py-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Your <span className="text-[#5D4E96]">Favourite Books</span> From
                <br />
                PagePlay
              </h1>
              <p className="text-lg md:text-xl max-w-[600px]">
                PagePlay is one of the biggest online book libraries, containing over 20,000+ books. Explore a vast
                collection of eBooks, available for all book lovers. Visit our site regularly to discover and read your
                favorite PDF books online!
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button size="lg" className="bg-[#5D4E96] text-white hover:bg-[#4A3D7D]">
                  Browse Library
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 lg:mt-0">
              <img
                src={book || "/placeholder.svg"}
                alt="Stack of colorful books with decorative elements"
                className="w-full max-w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#5D4E96]">Why Choose PagePlay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">Vast Collection</h3>
              <p className="text-gray-700">Explore over 20,000+ books across various genres and categories.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">User-Friendly Interface</h3>
              <p className="text-gray-700">Enjoy a seamless and intuitive browsing experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">Community Reviews</h3>
              <p className="text-gray-700">Read reviews and ratings from fellow book lovers.</p>
            </div>
          </div>
        </div>
      </section>  

      {/* How It Works Section */}
      <section className="py-12 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#5D4E96]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-l-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">1. Sign Up</h3>
              <p className="text-gray-700">Create an account to get started.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-l-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">2. Browse Books</h3>
              <p className="text-gray-700">Explore our vast collection and find your favorites.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border-l-4 border-[#5D4E96]">
              <h3 className="text-xl font-semibold mb-4 text-[#5D4E96]">3. Start Reading</h3>
              <p className="text-gray-700">Read books online or download them for offline reading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5D4E96]">What Our Readers Say</h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.slice(currentReviewIndex, currentReviewIndex + 2).map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-between transform transition-all duration-500 ease-in-out"
                >
                  {/* User Info and Book Cover */}
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={review.userImage || "/placeholder.svg"}
                      alt={review.userName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#5D4E96]"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#5D4E96]">{review.userName}</h3>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 leading-relaxed italic">"{review.review}"</p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center mt-6">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevReviews}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6 text-[#5D4E96]" />
            </button>
            <button
              onClick={nextReviews}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6 text-[#5D4E96]" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-[#E5EADD]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#5D4E96]">Join PagePlay Today</h2>
          <p className="text-lg mb-8 text-gray-700">Sign up now and start exploring our vast collection of books!</p>
          <Link to="/signup">
            <Button size="lg" className="bg-[#5D4E96] text-white hover:bg-[#4A3D7D]">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer socialLinks={socialLinks} />
    </div>
  )
}


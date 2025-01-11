import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { trendingBooks, suggestedBooks } from "@/data/books";

export default function BookList() {
  const books = [...trendingBooks, ...suggestedBooks];

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="bg-[#FAF7ED] p-4 rounded-lg shadow-md h-fit">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="type">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Type
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ebook" />
                      <label htmlFor="ebook" className="text-sm">
                        eBook
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf" />
                      <label htmlFor="pdf" className="text-sm">
                        PDF
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="publication">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Publication Date
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2024" />
                      <label htmlFor="2024" className="text-sm">
                        2024
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2023" />
                      <label htmlFor="2023" className="text-sm">
                        2023
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="author">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Author
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="author1" />
                      <label htmlFor="author1" className="text-sm">
                        Author One
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="author2" />
                      <label htmlFor="author2" className="text-sm">
                        Author Two
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="category">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Category
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fiction" />
                      <label htmlFor="fiction" className="text-sm">
                        Fiction
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="non-fiction" />
                      <label htmlFor="non-fiction" className="text-sm">
                        Non-Fiction
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Price
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0]}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">$0 - $100</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Rating
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm">
                          {rating} Stars & Up
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="group relative aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-medium">View Details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

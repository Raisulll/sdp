import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { suggestedBooks, trendingBooks } from "@/data/books";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from "lucide-react";

const books = [...trendingBooks, ...suggestedBooks];

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

export default function RequestedBooks() {
  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#265073]">
              Requested Books
            </h1>
            <p className="text-gray-600">
              Track the status of your submitted books
            </p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search submitted books"
              className="pl-10 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="bg-[#FAF7ED] p-4 rounded-lg shadow-md h-fit">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="status">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Status
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pending" />
                      <label htmlFor="pending" className="text-sm">
                        Pending Review
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="approved" />
                      <label htmlFor="approved" className="text-sm">
                        Approved
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rejected" />
                      <label htmlFor="rejected" className="text-sm">
                        Rejected
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="submission-date">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Submission Date
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="last-week" />
                      <label htmlFor="last-week" className="text-sm">
                        Last Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="last-month" />
                      <label htmlFor="last-month" className="text-sm">
                        Last Month
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="last-3-months" />
                      <label htmlFor="last-3-months" className="text-sm">
                        Last 3 Months
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="genre">
                <AccordionTrigger className="text-[#265073] hover:no-underline">
                  Genre
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
            </Accordion>
          </div>

          {/* Books List */}
          <div className="space-y-6">
            {books.map((book, index) => (
              <Card
                key={book.id}
                className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Book Cover */}
                  <div className="w-48 h-64 flex-shrink-0">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-[#265073] mb-1">
                          {book.title}
                        </h2>
                        <p className="text-gray-600">Author: {book.author}</p>
                      </div>
                      <StatusBadge
                        status={
                          index === 0
                            ? "pending"
                            : index === 1
                            ? "approved"
                            : "rejected"
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-[#265073]">
                          Genre:
                        </span>{" "}
                        <span className="text-gray-600">
                          {book.genre?.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-[#265073]">
                          Publication Date:
                        </span>{" "}
                        <span className="text-gray-600">
                          {book.publishDate}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-[#265073]">
                          Language:
                        </span>{" "}
                        <span className="text-gray-600">{book.language}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#265073]">
                          ISBN:
                        </span>{" "}
                        <span className="text-gray-600">978-1-234-56789-0</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#265073]">
                          Submitted:
                        </span>{" "}
                        <span className="text-gray-600">January 15, 2024</span>
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-2">
                      {book.description}
                    </p>

                    {index === 2 && (
                      <div className="flex items-start gap-2 text-sm bg-red-50 p-3 rounded-md">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="text-red-600">
                          <p className="font-medium">Rejection Reason:</p>
                          <p>
                            The submitted content does not meet our community
                            guidelines. Please review our content policy and
                            make necessary adjustments before resubmitting.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import Navbar from "@/components/navbar";
import { Toolbar } from "@/components/pdf-reader/toolbar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useParams } from "react-router-dom";
import { Footer } from "@/components/footer";
import { useNavigate } from "react-router-dom";

// Configure worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

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
  name: string;
  rating: number;
  total_reviews: number;
  pages: number;
  pdf_file_url: string;
}

export default function PublisherPdfReader() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const actualdata = JSON.parse(localStorage.getItem("user") || "{}");
  const nvaiagte = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        console.log("Fetching book with ID:", bookId);
        const response = await fetch(
          `http://localhost:5000/user/pdfUrl?bookId=${bookId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch book data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched book data:", data);
        data.forEach((book: Book) => {
          const date = new Date(book.publication_date);
          book.publication_date = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        });
        setBook(data);
        console.log("Book data:", book);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const updateReadingStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/updateReadingStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: actualdata.userId,
            bookId: bookId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update reading status");
      }
      nvaiagte("/home");
    } catch (error) {
      console.error("Error updating reading status:", error);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(2, prev + 0.1)); // Max zoom level
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.1)); // Min zoom level

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("Number of pages in PDF:", numPages);
    setNumPages(numPages);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      const activeThumbnail = sidebarRef.current.children[currentPage - 1];
      if (activeThumbnail) {
        sidebarRef.current.scrollTo({
          top: (activeThumbnail as HTMLElement).offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [currentPage]);


  // Skeleton Loader
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
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FEFFF0] pt-24">
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Book Header */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
            <div className="space-y-4">
              <img
                src={book[0].cover_image_url}
                alt={book[0].title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#265073] mb-2">
                  {book[0].title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  by {book[0].author}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book[0].rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    <span className="ml-2">{book[0].rating}</span>
                  </div>
                  <span>|</span>
                  <span>{book[0].total_reviews} Reviews</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2 font-medium">{book[0].pages}</span>
                </div>
                <div>
                  <span className="text-gray-600">Published:</span>
                  <span className="ml-2 font-medium">
                    {book[0].publication_date}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Genre:</span>
                  <span className="ml-2 font-medium">{book[0].genre}</span>
                </div>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{book[0].description}</p>
              </div>
            </div>
          </div>
          {/* Reader Container */}
          <div className="grid grid-cols-[250px_1fr] gap-6">
            {/* Thumbnails Sidebar */}
            <div
              ref={sidebarRef}
              className="bg-white rounded-lg shadow-lg p-2 overflow-auto"
              style={{ height: "calc(100vh - 16rem)" }}
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <div
                  key={`thumbnail_${index + 1}`}
                  className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <Document file={book[0].pdf_file_url}>
                    <Page pageNumber={index + 1} width={210} />
                  </Document>
                </div>
              ))}
            </div>
            {/* PDF Viewer */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              <Toolbar
                currentPage={currentPage}
                totalPages={numPages || 0}
                onPageChange={setCurrentPage}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onToggleAudio={() => {}}
                isAudioPlaying={false}
              />
              <div
                className="overflow-auto"
                style={{
                  height: "calc(100vh - 4rem)",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div
                  className="flex justify-center items-start"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                  }}
                >
                  <Document
                    file={book[0].pdf_file_url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<p>Loading PDF...</p>}
                  >
                    <Page
                      pageNumber={currentPage}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

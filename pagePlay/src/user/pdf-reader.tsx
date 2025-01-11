import Navbar from "@/components/navbar";
import { Toolbar } from "@/components/pdf-reader/toolbar";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { trendingBooks } from "@/data/books";

// Configure worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// Sample PDF and Book Data
const samplePDF = "/TheMidNightLibrary.pdf";

const book = trendingBooks[0];

export default function PDFReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(2, prev + 0.1)); // Max zoom level
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.1)); // Min zoom level

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Scroll the active page to the top of the sidebar
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FEFFF0] pt-24">
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Book Header */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
            <div className="space-y-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#265073] mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    <span className="ml-2">{book.rating}</span>
                  </div>
                  <span>|</span>
                  <span>{book.totalReviews?.toLocaleString()} Reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2 font-medium">{book.pages}</span>
                </div>
                <div>
                  <span className="text-gray-600">Language:</span>
                  <span className="ml-2 font-medium">{book.language}</span>
                </div>
                <div>
                  <span className="text-gray-600">Published:</span>
                  <span className="ml-2 font-medium">{book.publishDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Genre:</span>
                  <span className="ml-2 font-medium">
                    {book.genre?.join(", ")}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{book.description}</p>
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
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`thumbnail_${index + 1}`}
                  className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <Document file={samplePDF}>
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
                    file={samplePDF}
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
      </div>
    </>
  );
}

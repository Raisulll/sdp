import Navbar from "@/components/navbar";
import { AudioPlayer } from "@/components/pdf-viewer/audio-player";
import { PageThumbnails } from "@/components/pdf-viewer/page-thumbnails";
import { Toolbar } from "@/components/pdf-viewer/toolbar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Sample PDF and Audio URLs
const samplePDF = "../assets/sample.pdf";
const sampleAudioUrl = "sample-audiobook.mp3";

export default function PDFReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(2, prev + 0.1));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.1));

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen bg-[#FEFFF0]">
      <Navbar />

      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Book Header */}
        <div className="flex items-start gap-6 mb-6">
          <Card className="w-48 h-64 overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=300&text=Book+Cover"
              alt="Book cover"
              className="w-full h-full object-cover"
            />
          </Card>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#265073] mb-2">
              Book Name
            </h1>
            <p className="text-lg text-gray-600 mb-4">Author Name</p>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4
                      ? "fill-[#265073] text-[#265073]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Reader Container */}
        <div className="grid grid-cols-[250px_1fr] gap-6">
          {/* Thumbnails Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-2">
            <PageThumbnails
              pages={Array(numPages).fill(null).map((_, index) => (index + 1).toString())}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <Toolbar
              currentPage={currentPage}
              totalPages={numPages || 0}
              onPageChange={setCurrentPage}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onToggleAudio={() => setShowAudioPlayer(!showAudioPlayer)}
              isAudioPlaying={showAudioPlayer}
            />

            <div
              className="h-[calc(100vh-16rem)] overflow-auto p-4"
              style={{
                backgroundColor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <Document
                file={samplePDF}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>Loading PDF...</p>}
              >
                <Page
                  pageNumber={currentPage}
                  scale={zoom}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </div>

            {/* Audio Player */}
            {showAudioPlayer && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-96">
                <AudioPlayer audioUrl={sampleAudioUrl} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Book } from "@/types/blog";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";

interface BookCarouselProps {
  books: Book[];
  onBookClick: (bookId: number, publisherId: number) => void;
  className?: string;
}

export function BookCarousel({
  books,
  onBookClick,
  className,
}: BookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center", // Center alignment for better spacing
    loop: true,
    slidesToScroll: 2, // Move 2 books at a time
    speed: 10, // Reduce transition speed (default is 10)
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex-[0_0_50%] min-w-0 px-2" // Set width to fit two books
            >
              <BookCard
                book={book}
                size="medium" // Reduce book card size
                onClick={() => onBookClick(book.id, book.publisher_id)}
                coverImage={book.cover_image_url}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
}

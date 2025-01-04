import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageThumbnailsProps {
  pages: string[];
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export function PageThumbnails({
  pages,
  currentPage,
  onPageChange,
}: PageThumbnailsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-2 p-4">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={cn(
              "w-full rounded-lg overflow-hidden border-2 transition-all hover:shadow-md",
              currentPage === index + 1
                ? "border-[#265073]"
                : "border-transparent hover:border-[#265073]/50"
            )}
          >
            <img
              src={page}
              alt={`Page ${index + 1}`}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="text-center py-1 text-sm text-gray-600">
              Page {index + 1}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

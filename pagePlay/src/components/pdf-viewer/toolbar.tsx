import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  HeadphonesIcon,
  Heart,
  MoreVertical,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";

interface ToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
}

export function Toolbar({
  currentPage,
  totalPages,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onToggleAudio,
  isAudioPlaying,
}: ToolbarProps) {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white border-b">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <form onSubmit={handlePageSubmit} className="flex items-center gap-2">
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            className="w-16 text-center"
          />
          <span className="text-sm text-gray-500">of {totalPages}</span>
        </form>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant={isAudioPlaying ? "default" : "ghost"}
          size="icon"
          onClick={onToggleAudio}
          className={isAudioPlaying ? "bg-[#265073] hover:bg-[#1a3b5c]" : ""}
        >
          <HeadphonesIcon className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Bookmark className="h-4 w-4 mr-2" />
              Add Bookmark
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="h-4 w-4 mr-2" />
              Add to Favorites
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

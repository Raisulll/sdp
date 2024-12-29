import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Calendar, User, Bookmark, BookOpen } from "lucide-react";

export function AddBookDialog() {
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Fantasy",
    "Biography",
    "History",
    "Children's",
    "Young Adult",
  ];

  return (
    <DialogContent className="max-w-4xl bg-[#FAF7ED]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-[#265073] text-center">
          Add Book
        </DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-[1fr_300px] gap-6 py-4">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <User className="h-4 w-4" />
              Author Name
            </label>
            <Input
              placeholder="Enter author name"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Book className="h-4 w-4" />
              Book Name
            </label>
            <Input
              placeholder="Enter book name"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Publication Date
            </label>
            <Input
              type="date"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              ISBN
            </label>
            <Input
              placeholder="Enter ISBN"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Genre
            </label>
            <Select>
              <SelectTrigger className="mt-2 border-[#265073] focus:ring-[#265073]">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column - Cover Upload */}
        <div className="space-y-4">
          <div className="aspect-[2/3] border-2 border-dashed border-[#265073] rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#265073]/5 transition-colors cursor-pointer">
            <div className="text-center space-y-2">
              <Book className="h-12 w-12 text-[#265073] mx-auto" />
              <div className="text-sm text-[#265073]">
                <p className="font-medium">Click to upload</p>
                <p className="text-xs">or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
        >
          Cancel
        </Button>
        <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c]">
          Add Book
        </Button>
      </div>
    </DialogContent>
  );
}

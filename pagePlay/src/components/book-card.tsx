import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { type Book } from "@/types/blog";
import { FC } from "react";

interface BookCardProps {
  book: Book;
  size?: "small" | "large";
  onClick?: (bookId: string) => void;
  coverImage: string;
}

export const BookCard: FC<BookCardProps> = ({
  book,
  size = "small",
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(book.id);
  };

  return (
    <Card
      className={`group overflow-hidden transition-shadow hover:shadow-lg cursor-pointer ${
        size === "large" ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        <img
          src={book.cover_image_url}
          alt={book.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold mb-1">{book.title}</h3>
          <p className="text-white/80 text-sm">{book.author}</p>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= book.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

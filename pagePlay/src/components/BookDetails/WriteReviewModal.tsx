import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: number;
    title: string;
    author: string;
    cover_image_url: string;
    rating: number;
    publisher_id: number;
  };
}

const localdata = JSON.parse(localStorage.getItem("user") || "{}");

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit review data
    const data = {
      rating: rating,
      comment: review,
      bookId: book[0].id,
      publisherId: book[0].publisher_id,
      userId: localdata.userId,
    };
    console.log(data);
    fetch("http://localhost:5000/user/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        console.log("Review submitted successfully");
      } else {
        console.error("Failed to submit review");
      }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Write a Review</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <img
            src={book[0].cover_image_url}
            alt={book[0].title}
            className="w-24 h-32 object-cover rounded-md shadow-md"
          />
          <div className="text-center">
            <h3 className="font-semibold">{book[0].title}</h3>
            <p className="text-sm text-gray-600">{book[0].author}</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[150px]"
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!rating || !review.trim()}>
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

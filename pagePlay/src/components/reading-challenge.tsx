import { Card } from "@/components/ui/card";
import { Facebook, Github, Instagram } from "lucide-react";
import { type SocialLinks } from "@/types/blog";
import { FC } from "react";

interface ReadingChallengeProps {
  targetBooks: number;
  currentStats: {
    wantToRead: number;
    completed: number;
    currentlyReading: number;
  };
  socialLinks?: SocialLinks;
}

export const ReadingChallenge: FC<ReadingChallengeProps> = ({
  targetBooks,
  currentStats,
  socialLinks,
}) => {
  return (
    <Card className="p-6 bg-[#FAF7ED]">
      <h2 className="font-bold text-[#265073] mb-4">2024 READING CHALLENGE</h2>
      <p className="text-sm text-gray-600 mb-4">
        Challenge Your Self to Have More Than {targetBooks} Books
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <img
            src="https://via.placeholder.com/400x300?text=Bookav"
            alt="Reading Challenge"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="font-semibold text-[#265073]">I Want to Read</p>
        <div className="flex items-center justify-center gap-2 my-2">
          <span className="text-2xl font-bold text-[#265073]">
            {targetBooks}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          You Can Change Your Goal at Any Time
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-[#265073]">THE BOOK SHELVES</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Want to Read</span>
            <span className="text-[#265073]">({currentStats.wantToRead})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Completed</span>
            <span className="text-[#265073]">({currentStats.completed})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Currently Reading</span>
            <span className="text-[#265073]">
              ({currentStats.currentlyReading})
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {socialLinks?.facebook && (
          <a
            href={socialLinks.facebook}
            className="text-gray-600 hover:text-[#265073]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            className="text-gray-600 hover:text-[#265073]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {socialLinks?.github && (
          <a
            href={socialLinks.github}
            className="text-gray-600 hover:text-[#265073]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
      </div>
    </Card>
  );
};

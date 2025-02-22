import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Trophy } from "lucide-react";
import { type SocialLinks } from "@/types/blog";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import posterImage1 from "@/assets/poster1.jpg";
import posterImage2 from "@/assets/poster2.jpg";

interface ReadingChallengeProps {
  socialLinks?: SocialLinks;
}

export const ReadingChallenge: FC<ReadingChallengeProps> = ({
  socialLinks,
}) => {
  const navigate = useNavigate();

  const handleCreatePosterClick = () => {
    navigate("/submit-poster");
  };

  return (
    <Card className="p-6 bg-[#FAF7ED] text-center h-full w-full">
      <div>
        <div className="flex items-center justify-center mb-4">
          <Trophy className="text-[#5D4E96] h-10 w-10 mr-2" />
          <h1 className="text-3xl font-bold text-[#265073]">Poster Challenge</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join our exciting Poster Design Challenge! Create your own poster design and share it with the world.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
            <img
              src={posterImage1}
              alt="Poster Design 1"
              className="w-48 h-48 object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-sm">Poster Design 1</p>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
            <img
              src={posterImage2}
              alt="Poster Design 2"
              className="w-48 h-48 object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-sm">Poster Design 2</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center mb-6">
          <Button
            size="lg"
            className="w-full bg-[#5D4E96] text-white hover:bg-[#4A3D7D] shadow-md transform hover:scale-105 transition-all duration-300"
            onClick={handleCreatePosterClick}
          >
            Submit Your Poster
          </Button>
        </div>

        <div className="flex justify-center gap-4">
          {socialLinks?.facebook && (
            <a
              href={socialLinks.facebook}
              className="text-gray-600 hover:text-[#265073] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-6 w-6" />
            </a>
          )}
          {socialLinks?.instagram && (
            <a
              href={socialLinks.instagram}
              className="text-gray-600 hover:text-[#265073] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}
          {socialLinks?.github && (
            <a
              href={socialLinks.github}
              className="text-gray-600 hover:text-[#265073] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
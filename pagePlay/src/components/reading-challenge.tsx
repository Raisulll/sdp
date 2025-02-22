import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Trophy } from "lucide-react";
import { type SocialLinks } from "@/types/blog";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import posterImage1 from "@/assets/poster1.jpg";

interface ReadingChallengeProps {
  socialLinks?: SocialLinks;
}

export const ReadingChallenge: FC<ReadingChallengeProps> = ({ socialLinks }) => {
  const navigate = useNavigate();

  const handleCreatePosterClick = () => {
    navigate("/submit-poster");
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-[#FAF7ED] to-[#EDE7FA] text-center shadow-lg flex flex-col items-center">
      {/* Trophy and Title */}
      <Trophy className="text-[#5D4E96] h-8 w-8 mb-2" />
      <h1 className="text-xl font-bold text-[#265073] mb-3">Weekly Poster Challenge</h1>

      {/* Advertisement Text */}
      <p className="text-gray-700 text-sm mb-4 max-w-md">
        Showcase your creativity! Design a stunning poster and submit it to our 
        <strong> Weekly Poster Challenge</strong>.
      </p>

      {/* Poster Image */}
      <div className="relative rounded-lg overflow-hidden shadow-md mb-4">
        <img
          src={posterImage1}
          alt="Featured Poster Design"
          className="h-40 w-40 object-contain"
        />
      </div>

      {/* Submit Button */}
      <Button
        size="sm"
        className="w-full bg-[#5D4E96] text-white hover:bg-[#4A3D7D] shadow-md"
        onClick={handleCreatePosterClick}
      >
        Submit Your Poster
      </Button>

      {/* Social Links */}
      <div className="flex justify-center gap-3 mt-3">
        {socialLinks?.facebook && (
          <a
            href={socialLinks.facebook}
            className="text-gray-600 hover:text-[#265073] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            className="text-gray-600 hover:text-[#265073] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {socialLinks?.github && (
          <a
            href={socialLinks.github}
            className="text-gray-600 hover:text-[#265073] transition-colors"
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

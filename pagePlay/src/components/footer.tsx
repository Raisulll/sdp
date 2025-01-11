import { Facebook, Github, Instagram,BookOpen } from "lucide-react";
import { type SocialLinks } from "@/types/blog";
import { FC } from "react";

interface FooterProps {
  socialLinks?: SocialLinks;
}

export const Footer: FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#E5EADD] border-t border-[#265073]/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-[#265073] mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-[#265073]">
                  About us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-[#265073]">
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-[#265073]"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#265073] mb-4">WORK WITH US</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/authors"
                  className="text-gray-600 hover:text-[#265073]"
                >
                  Authors
                </a>
              </li>
              <li>
                <a
                  href="/publications"
                  className="text-gray-600 hover:text-[#265073]"
                >
                  Publications
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#265073] mb-4">CONTACT</h3>
            <div className="flex gap-4">
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
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            {/* <img src="../assets/large-book.svg" alt="PagePlay Logo" className="w-10 h-10" /> */}
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-[#265073]">PagePlay</span>
          </div>
          <p className="text-sm text-gray-500">
            Copyright © {currentYear} - PagePlay. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

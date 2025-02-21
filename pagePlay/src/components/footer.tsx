import { Facebook, Github, Instagram, BookOpen, Twitter, Linkedin } from "lucide-react"
import type { SocialLinks } from "@/types/blog"
import type { FC } from "react"

interface FooterProps {
  socialLinks?: SocialLinks
}


export const Footer: FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2937] border-t border-[#374151]">
      <div className="mx-auto pt-8 pb-4 px-4" style={{ margin: "0 119.6px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-white mr-2" />
              <span className="text-xl font-semibold text-white">PagePlay</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">Your gateway to amazing books</p>
            <div className="flex space-x-4">
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase">Work With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/authors" className="text-gray-300 hover:text-white transition-colors">
                  Authors
                </a>
              </li>
              <li>
                <a href="/publications" className="text-gray-300 hover:text-white transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="/partnerships" className="text-gray-300 hover:text-white transition-colors">
                  Partnerships
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: info@pageplay.com</li>
              <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-300">Address: 123 Book Street, Reading City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4 text-center">
          <p className="text-gray-300 text-sm">© {currentYear} PagePlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

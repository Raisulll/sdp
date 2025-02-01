import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Book,
  Bookmark,
  BookOpen,
  FileText,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import { MobileNav } from "./mobile-nav";

const AVATAR_URL =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=JohnDoee&background=%23EBF4FF&radius=50&width=285&height=285"; // Change the seed value to your name

// Navbar Component (Functional Component with TypeScript)
const Navbar: React.FC = () => {
  const location = useLocation(); // Get the current location
  return (
    <div className="w-full bg-[#E5EADD] fixed top-0 z-50 border-b border-[#265073]/10 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
          <Link to="/home" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">PagePlay</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {/* User nav */}
            {window.location.pathname === "/user-profile" ||
            window.location.pathname === "/my-books" ||
            window.location.pathname === "/wish-list" ||
            window.location.pathname === "/blogs" ||
            window.location.pathname === "/home" ||
            window.location.pathname === "/pdf-reader" ||
            window.location.pathname === "/book-details" ||
            window.location.pathname === "/contact" ||
            window.location.pathname === "/check-out" ||
            window.location.pathname === "/chat-bot" ||
            window.location.pathname === "/favourite-books" ? (
              <>
                <NavLink to="/home" isActive={location.pathname === "/home"}>Home</NavLink>
                <NavLink to="/my-books" isActive={location.pathname === "/my-books"}>My Books</NavLink>
                <NavLink to="/chat-bot" isActive={location.pathname === "/chat-bot"}>Chatbot</NavLink>
                <NavLink to="/wish-list" isActive={location.pathname === "/wish-list"}>Wishlist</NavLink>
                <NavLink to="/blogs" isActive={location.pathname === "/blogs"}>Blogs</NavLink>
                <NavLink to="/favourite-books" isActive={location.pathname === "/favourite-books"}>Favourite Books</NavLink>
                <NavLink to="/contact" isActive={location.pathname === "/contact"}>Contact us</NavLink>
                <NavLink to="/user-profile" isActive={location.pathname === "/user-profile"}>Profile</NavLink>
              </>
            ) : null}

            {/* publisher nav */}
            {window.location.pathname === "/publisher-profile" ||
            window.location.pathname === "/book-list" ||
            window.location.pathname === "/requested-books" ||
            window.location.pathname.includes("/publisher-transactions") ? (
              <>
                <NavLink to="/book-list" isActive={location.pathname === "/book-list"}>Book List</NavLink>
                <NavLink to="/requested-books" isActive={location.pathname === "/requested-books"}>Requested Books</NavLink>
                <NavLink to="/publisher-transactions" isActive={location.pathname.includes("/publisher-transactions")}>Transactions</NavLink>
                <NavLink to="/publisher-profile" isActive={location.pathname === "/publisher-profile"}>Profile</NavLink>
              </>
            ) : null}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-12 w-12 rounded-full p-0 hover:bg-transparent"
              >
                <Avatar className="h-11 w-11 border-2 border-[#265073] transition-transform hover:scale-105">
                  <AvatarImage src={AVATAR_URL} alt="User avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 mt-2 p-0 bg-[#E5EADD] border-none"
              align="end"
            >
              <div className="flex items-start gap-3 p-4 border-b border-black/10">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={AVATAR_URL} alt="User avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">User name</span>
                </div>
              </div>
              <div className="p-2">
                <MenuItem to="/user-profile" icon={User}>
                  PROFILE
                </MenuItem>
                <MenuItem to="/my-books" icon={Book}>
                  MY BOOKS
                </MenuItem>
                <MenuItem to="/wish-list" icon={Heart}>
                  WISHLIST
                </MenuItem>
                <MenuItem to="/blogs" icon={FileText}>
                  BLOGS
                </MenuItem>
                <MenuItem to="/favourite-books" icon={Bookmark}>
                  FAVOURITE BOOKS
                </MenuItem>
              </div>
              <DropdownMenuSeparator className="my-0" />
              <MenuItem
                to="/login"
                icon={LogOut}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                LOGOUT
              </MenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

// NavLink Component (for Navigation Links)
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean; // Add isActive prop
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive ? "bg-[#265073]/10 text-[#265073]" : "text-gray-700 hover:bg-[#265073]/10 hover:text-[#265073]"
      }`}
    >
      {children}
    </Link>
  );
};

// MenuItem Component (for Dropdown Menu Items)
interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon: Icon,
  children,
  className = "",
}) => {
  return (
    <DropdownMenuItem asChild className="focus:bg-black/5">
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium ${className}`}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    </DropdownMenuItem>
  );
};

export default Navbar;

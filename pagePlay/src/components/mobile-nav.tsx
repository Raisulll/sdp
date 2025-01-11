import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden p-0 w-10 h-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-[#E5EADD]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-lg font-semibold text-gray-800 hover:text-[#265073] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/my-books"
            onClick={() => setOpen(false)}
            className="text-lg font-semibold text-gray-800 hover:text-[#265073] transition-colors"
          >
            My Books
          </Link>
          <Link
            to="/blogs"
            onClick={() => setOpen(false)}
            className="text-lg font-semibold text-gray-800 hover:text-[#265073] transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-lg font-semibold text-gray-800 hover:text-[#265073] transition-colors"
          >
            Contact us
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

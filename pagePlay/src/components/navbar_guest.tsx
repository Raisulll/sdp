import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

export default function Navbar_guest() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <header className="w-full px-4 py-4 border-b border-gray-200 bg-[#E5EADD]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">PagePlay</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-primary">
            About Us
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleLogin}
          >
            Log in
          </Button>
        </div>
      </nav>
    </header>
  );
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#E5EADD] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
          <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">PagePlay</span>
          </Link>
          </div>
          </div>
          
          <div className="flex items-center space-x-4">
          <Link to="/admin-reportreview">
            <Button variant="ghost" className="text-[#265073] hover:text-[#265073]/80 hover:bg-[#C2D9FF]">
              ReportReview
            </Button>
            </Link>
            <Link to="/admin-userlist">
              <Button variant="ghost" className="text-[#265073] hover:text-[#265073]/80 hover:bg-[#C2D9FF]">
                User
              </Button>
            </Link>
            <Link to="/admin-publisher">
            <Button variant="ghost" className="text-[#265073] hover:text-[#265073]/80 hover:bg-[#C2D9FF]">
              Publisher
            </Button>
            </Link>
            <Link to="/admin-transaction">
            <Button variant="ghost" className="text-[#265073] hover:text-[#265073]/80 hover:bg-[#C2D9FF]">
              Transactions
            </Button>
            </Link>
            <Link to="/admin-profile">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


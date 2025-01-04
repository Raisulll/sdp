"use client";
import Navbar from "@/components/adminnavbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface Review {
  id: string;
  reviewer: {
    name: string;
    email: string;
    avatar: string;
  };
  reportedUser: {
    name: string;
    avatar: string;
  };
  type: "inappropriate" | "spam" | "harassment" | "other";
  status: "pending" | "resolved" | "investigating";
  date: string;
  priority: "high" | "medium" | "low";
}

const reviews: Review[] = [
  {
    id: "1",
    reviewer: {
      name: "Anika Tasnim",
      email: "anika@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reportedUser: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "inappropriate",
    status: "pending",
    date: "17 December 2024",
    priority: "high",
  },
  {
    id: "2",
    reviewer: {
      name: "Faisal Ahmed",
      email: "faisal@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reportedUser: {
      name: "Sarah Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "spam",
    status: "investigating",
    date: "26 November 2024",
    priority: "medium",
  },
  {
    id: "3",
    reviewer: {
      name: "Raisul Islam",
      email: "raisul@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reportedUser: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "harassment",
    status: "resolved",
    date: "8 November 2024",
    priority: "high",
  },
];

export default function ReportsReview() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "investigating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#E5EADD] pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-[#265073] mb-2">
                  Reports Review
                </h1>
                <p className="text-gray-600">
                  Manage and review reported content and users
                </p>
              </div>
              <Link to="/admin-createreport">
                <Button className="bg-[#265073] hover:bg-[#265073]/90">
                  <Flag className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-[#265073]">156</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-[#265073]" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">64</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Investigating</p>
                    <p className="text-2xl font-bold text-blue-600">28</p>
                  </div>
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">64</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or report type..."
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedPriority}
                  onValueChange={setSelectedPriority}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-red-200">
                      <AvatarImage
                        src={review.reviewer.avatar}
                        alt={review.reviewer.name}
                      />
                      <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#265073]">
                          {review.reviewer.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(review.priority)}
                        >
                          {review.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {review.reviewer.email}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(review.status)}
                        >
                          {review.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800"
                        >
                          {review.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Reported User:</p>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.reportedUser.avatar}
                          alt={review.reportedUser.name}
                        />
                        <AvatarFallback>
                          {review.reportedUser.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {review.reportedUser.name}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Manage Report</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link to="/admin-reportdetails">
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

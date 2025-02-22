import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, BookOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample transaction data
const transactions = [
  {
    id: 1,
    book: {
      title: "A Perfect Book",
      cover: "https://picsum.photos/seed/book1/100/150",
    },
    author: "Jonathan Starweaver",
    genre: "Science Fiction",
    publicationDate: "February 15, 2023",
    isbn: "988-5-467-222",
    amount: 69,
    purchasedBy: {
      name: "Emma Thompson",
      date: "March 15, 2024",
      location: "New York, USA",
    },
  },
  {
    id: 2,
    book: {
      title: "I Can't Live Without",
      cover: "https://picsum.photos/seed/book2/100/150",
    },
    author: "Jonas Steam",
    genre: "Science Fiction",
    publicationDate: "5 January, 2020",
    isbn: "878-235-898",
    amount: 72,
    purchasedBy: {
      name: "Michael Chen",
      date: "March 14, 2024",
      location: "Toronto, Canada",
    },
  },
  {
    id: 3,
    book: {
      title: "Just One Chapter",
      cover: "https://picsum.photos/seed/book3/100/150",
    },
    author: "Harry Thomas",
    genre: "Contemporary Fiction",
    publicationDate: "October 10, 2022",
    isbn: "978-1-987-654",
    amount: 62,
    purchasedBy: {
      name: "Sophie Martin",
      date: "March 13, 2024",
      location: "Paris, France",
    },
  },
];

export default function TransactionPage() {
  const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);
  const uniqueReaders = new Set(transactions.map((t) => t.purchasedBy.name))
    .size;

  return (
    <div className="min-h-screen bg-[#FEFFF0]">
      <Navbar />

      <main className="container mx-auto px-12 md:px-24 lg:px-32 py-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://picsum.photos/seed/reading/100/100"
              alt="Decorative illustration"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-[#265073]">
                Transaction History
              </h1>
              <p className="text-gray-600">
                Track your book sales and earnings
              </p>
            </div>
          </div>

          {/* <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 border-[#265073] focus-visible:ring-[#265073]"
            />
          </div> */}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#FAFAD2] border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#265073]">
                Total Earnings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#265073]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#265073]">
                ${totalEarnings}
              </div>
              <p className="text-xs text-gray-600">From all book sales</p>
            </CardContent>
          </Card>
          <Card className="bg-[#FAFAD2] border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#265073]">
                Unique Readers
              </CardTitle>
              <Users className="h-4 w-4 text-[#265073]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#265073]">
                {uniqueReaders}
              </div>
              <p className="text-xs text-gray-600">
                Across different countries
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#FAFAD2] border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#265073]">
                Books Sold
              </CardTitle>
              <BookOpen className="h-4 w-4 text-[#265073]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#265073]">
                {transactions.length}
              </div>
              <p className="text-xs text-gray-600">Total books purchased</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[#FAFAD2] rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-[#265073]">Book</TableHead>
                <TableHead className="font-bold text-[#265073]">
                  Author
                </TableHead>
                <TableHead className="font-bold text-[#265073]">
                  Genre
                </TableHead>
                <TableHead className="font-bold text-[#265073]">
                  Purchased By
                </TableHead>
                <TableHead className="font-bold text-[#265073]">ISBN</TableHead>
                <TableHead className="font-bold text-[#265073]">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={transaction.book.cover}
                        alt={transaction.book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {transaction.book.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {transaction.publicationDate}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.author}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-[#265073]/10 rounded-full text-sm">
                      {transaction.genre}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {transaction.purchasedBy.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {transaction.purchasedBy.location}
                      </span>
                      <span className="text-xs text-gray-400">
                        {transaction.purchasedBy.date}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.isbn}</TableCell>
                  <TableCell className="font-semibold text-[#265073]">
                    ${transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

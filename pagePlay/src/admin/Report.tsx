import Sidebar from "@/components/SlideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table"; // Assuming you have a Table component for structured data display
import { useState } from "react";

// Example reports data
const reportsData = [
  {
    id: 1,
    title: "Missing Book Information",
    author: "Admin",
    date: "2024-02-01",
    status: "Pending",
    category: "Book Information",
  },
  {
    id: 2,
    title: "Suspicious User Activity",
    author: "User123",
    date: "2024-02-03",
    status: "Reviewed",
    category: "User Behavior",
  },
  {
    id: 3,
    title: "Offensive Content in Book",
    author: "Admin",
    date: "2024-02-05",
    status: "Pending",
    category: "Content Policy",
  },
  // More reports...
];

const Reports = () => {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter reports based on search and selected filters
  const filteredReports = reportsData.filter((report) => {
    return (
      (filterStatus === "All" || report.status === filterStatus) &&
      (filterCategory === "All" || report.category === filterCategory) &&
      (searchQuery === "" ||
        report.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-6">Reports</h1>

        {/* Filters Section */}
        <div className="mb-6 space-x-4">
          <Input
            placeholder="Search Reports"
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/4"
          />

          <div className="w-1/4">
            <select
              value={filterStatus}
              onChange={handleStatusChange}
              className="w-full"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
            </select>
            <div className="w-1/4">
              <select
                value={filterCategory}
                onChange={handleCategoryChange}
                className="w-full"
              >
                <option value="All">All Categories</option>
                <option value="Book Information">Book Information</option>
                <option value="User Behavior">User Behavior</option>
                <option value="Content Policy">Content Policy</option>
              </select>
            </div>
            <option value="Content Policy">Content Policy</option>
          </div>

          <Button className="ml-2">Apply Filters</Button>
        </div>

        {/* Reports Table */}
        <Table>
          <thead>
            <tr className="bg-[#265073] text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="p-3">{report.title}</td>
                <td className="p-3">{report.author}</td>
                <td className="p-3">{report.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      report.status === "Pending"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-3">{report.category}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                  <Button variant="secondary" size="sm">
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Reports;

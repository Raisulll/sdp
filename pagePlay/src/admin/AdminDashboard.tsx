import Sidebar from "@/components/SlideBar"; 
import { Link } from "react-router-dom"; 

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Link to="/admin">
          <h1 className="text-3xl font-bold text-[#265073] mb-6">
            Admin Dashboard
          </h1>
        </Link>

        {/* Section 1: Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">Users</h2>
              <p className="text-gray-600">Total users in the system</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">1,234</h3>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">
                Publishers
              </h2>
              <p className="text-gray-600">Total publishers in the system</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">456</h3>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">
                Transactions
              </h2>
              <p className="text-gray-600">Total transactions processed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">$12,345</h3>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">
                Pending Books
              </h2>
              <p className="text-gray-600">Books awaiting approval</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">78</h3>
            </div>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/users"
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Users</h3>
            <p className="text-sm mt-2">Manage and view all users</p>
          </Link>

          <Link
            to="/admin/publishers"
            className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Publishers</h3>
            <p className="text-sm mt-2">Manage and view all publishers</p>
          </Link>

          <Link
            to="/admin/transactions"
            className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Transactions</h3>
            <p className="text-sm mt-2">Manage and view all transactions</p>
          </Link>

          <Link
            to="/admin/reports"
            className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Reports</h3>
            <p className="text-sm mt-2">Review and manage reports</p>
          </Link>

          <Link
            to="/admin/pending-books"
            className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Pending Books</h3>
            <p className="text-sm mt-2">Manage books pending approval</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

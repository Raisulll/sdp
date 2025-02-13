import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#265073] min-h-screen text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin/users"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/publishers"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Publishers
          </Link>
        </li>
        <li>
          <Link
            to="/admin/transactions"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            to="/admin/reports"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Reports
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pending-books"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Pending Books
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="w-64 bg-[#265073] min-h-screen text-white p-5">
      <Link to="/admin" className="block mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </Link>
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin/users"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Users
          </Link>
        </li>
        {/* <li>   ---no needed by arif abdullah
          <Link
            to="/admin/publishers"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Publishers
          </Link>
        </li> */}
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
        <li>
          <Link
            to="/admin/Add-Admin"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Add Admin
          </Link>
        </li>
        <li>
          <Link
            to="/admin/Add-Publishers"
            className="block hover:bg-[#1B3B5A] p-2 rounded"
          >
            Add Publishers
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left hover:bg-[#1B3B5A] p-2 rounded text-red-500"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

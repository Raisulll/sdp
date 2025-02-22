import { useState, useEffect } from "react";
import Sidebar from "@/components/SlideBar";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [publisherCount, setPublisherCount] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [pendingBooksCount, setPendingBooksCount] = useState<number>(0);
  const fetchCounts = async () => {
    try {
      // Fetch total users count
      const { count: userTotal, error: userError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      if (userError) throw new Error(userError.message);

      // Fetch total publishers count
      const { count: publisherTotal, error: publisherError } = await supabase
        .from("publisher")
        .select("*", { count: "exact", head: true });

      if (publisherError) throw new Error(publisherError.message);

      // Fetch total transactions sum where status = 'Completed'
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .select("amount")
        .eq("status", "Completed");

      if (transactionError) throw new Error(transactionError.message);

      // Sum all transaction amounts
      const transactionSum = transactionData?.reduce((sum, txn) => sum + txn.amount, 0) || 0;
       // Fetch pending books count
       const { count: pendingBooksTotal, error: pendingBooksError } = await supabase
       .from("books")
       .select("*", { count: "exact", head: true })
       .eq("status", "pending");

     if (pendingBooksError) throw new Error(pendingBooksError.message);

      setUserCount(userTotal || 0);
      setPublisherCount(publisherTotal || 0);
      setTotalTransactions(transactionSum);
      setPendingBooksCount(pendingBooksTotal || 0);
    } catch (error: any) {
      console.error("Error fetching counts:", error.message);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCounts();

    // Real-time listener for users table
    const userSubscription = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        fetchCounts
      )
      .subscribe();

    // Real-time listener for publishers table
    const publisherSubscription = supabase
      .channel("realtime-publishers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "publishers" },
        fetchCounts
      )
      .subscribe();

    // Real-time listener for transactions table
    const transactionSubscription = supabase
      .channel("realtime-transactions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        fetchCounts
      )
      .subscribe();
       // Real-time listener for books table (for pending books)
    const booksSubscription = supabase
    .channel("realtime-books")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "books" },
      fetchCounts
    )
    .subscribe();


    return () => {
      supabase.removeChannel(userSubscription);
      supabase.removeChannel(publisherSubscription);
      supabase.removeChannel(transactionSubscription);
      supabase.removeChannel(booksSubscription);
    };
  }, []);

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
              <h3 className="text-3xl font-bold text-[#265073]">{userCount}</h3>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">Publishers</h2>
              <p className="text-gray-600">Total publishers in the system</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">{publisherCount}</h3>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">Transactions</h2>
              <p className="text-gray-600">Total transactions processed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">
                ${totalTransactions.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#265073]">Pending Books</h2>
              <p className="text-gray-600">Books awaiting approval</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#265073]">{pendingBooksCount}</h3>
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
          {/* no needed by arif  */}
          {/* <Link
            to="/admin/publishers"
            className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">View Publishers</h3>
            <p className="text-sm mt-2">Manage and view all publishers</p>
          </Link> */}

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

          {/* <Link noneeded by arif
            to="/admin/Add-Admin"
            className="bg-teal-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">Add Admin</h3>
            <p className="text-sm mt-2">Approve or remove admin accounts</p>
          </Link> */}

          <Link
            to="/admin/Add-Publishers"
            className="bg-indigo-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold">Add And View Publishers</h3>
            <p className="text-sm mt-2">Approve or remove publisher accounts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

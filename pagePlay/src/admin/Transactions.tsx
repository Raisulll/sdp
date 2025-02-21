import { useState, useEffect } from "react";
import Sidebar from "@/components/SlideBar";
import { supabase } from "../supabaseClient";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch transactions with status "Completed"
        // and join related user details from the users table
        const { data, error } = await supabase
          .from("transactions")
          .select("id, date, amount, user:users (firstname, lastname, email, phone_number)")
          .eq("status", "Completed");

        if (error) throw error;
        setTransactions(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-4">Transactions</h1>
        {loading ? (
          <p className="text-gray-600">Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded">
            <thead className="bg-[#265073] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b">
                  <td className="p-3">
                    {txn.user ? `${txn.user.firstname} ${txn.user.lastname}` : "Unknown"}
                  </td>
                  <td className="p-3">{txn.user ? txn.user.email : "Unknown"}</td>
                  <td className="p-3">{txn.user ? txn.user.phone_number : "Unknown"}</td>
                  <td className="p-3">{txn.date}</td>
                  <td className="p-3">{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;

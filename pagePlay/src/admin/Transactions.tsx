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
        // Fetch transactions and join with related tables
        const { data, error } = await supabase
          .from("transactions")
          .select(
            `id, 
             timestamp, 
             user:users (firstname, lastname), 
             publisher:publisher (name), 
             book:books (title, price)`
          );

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
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Publisher Name</th>
                <th className="p-3 text-left">Book</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b">
                  <td className="p-3">
                    {txn.user ? `${txn.user.firstname} ${txn.user.lastname}` : "Unknown"}
                  </td>
                  <td className="p-3">{txn.publisher ? txn.publisher.name : "Unknown"}</td>
                  <td className="p-3">{txn.book ? txn.book.title : "Unknown"}</td>
                  <td className="p-3">{new Date(txn.timestamp).toLocaleString()}</td>
                  <td className="p-3">${txn.book ? txn.book.price.toFixed(2) : "N/A"}</td>
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

import Sidebar from "@/components/SlideBar";

const transactions = [
  { id: 1, user: "John Doe", amount: "$15.00", date: "2024-02-05" },
  { id: 2, user: "Jane Smith", amount: "$25.00", date: "2024-02-04" },
];

const Transactions = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-4">Transactions</h1>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-[#265073] text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b">
                <td className="p-3">{txn.user}</td>
                <td className="p-3">{txn.amount}</td>
                <td className="p-3">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;

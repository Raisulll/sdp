import Sidebar from "@/components/SlideBar";

const publishers = [
  {
    id: 1,
    name: "Penguin Books",
    email: "contact@penguin.com",
    status: "Verified",
  },
  {
    id: 2,
    name: "HarperCollins",
    email: "info@harpercollins.com",
    status: "Pending",
  },
];

const PublishersList = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-4">Publishers</h1>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-[#265073] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((pub) => (
              <tr key={pub.id} className="border-b">
                <td className="p-3">{pub.name}</td>
                <td className="p-3">{pub.email}</td>
                <td className="p-3">{pub.status}</td>
                <td className="p-3">
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublishersList;

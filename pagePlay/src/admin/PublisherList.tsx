import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";
import Sidebar from "@/components/SlideBar";

const PublishersList = () => {
  const [publishers, setPublishers] = useState<
    { id: number; name: string; email: string; phone: string; added_by: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("publisher")
          .select("id, name, email, phone, added_by");

        if (error) throw error;
        setPublishers(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  const handleDeletePublisher = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this publisher?")) return;
    try {
      const { error } = await supabase.from("publisher").delete().eq("id", id);
      if (error) throw new Error("Error deleting publisher");

      // ✅ Remove from local state
      setPublishers((prev) => prev.filter((pub) => pub.id !== id));
    } catch (error: any) {
      console.error("Error deleting publisher:", error);
      setError("Failed to delete publisher.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-4">Publishers</h1>

        {loading ? (
          <p className="text-gray-600">Loading publishers...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded">
            <thead className="bg-[#265073] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Added By</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((pub) => (
                <tr key={pub.id} className="border-b">
                  <td className="p-3">{pub.name}</td>
                  <td className="p-3">{pub.email}</td>
                  <td className="p-3">{pub.phone}</td>
                  <td className="p-3">{pub.added_by}</td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      onClick={() => handleDeletePublisher(pub.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PublishersList;

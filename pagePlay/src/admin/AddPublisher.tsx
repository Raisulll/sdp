import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/SlideBar";

const AddPublisher = () => {
  const [publishers, setPublishers] = useState<any[]>([]);
  const [newPublisher, setNewPublisher] = useState({ name: "", email: "", phone: "" ,password:""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedInAdminName, setLoggedInAdminName] = useState<string | null>(null);

  // Retrieve admin ID from localStorage
  const storedUser = localStorage.getItem("user");
  const adminId = storedUser ? JSON.parse(storedUser).adminId : null;

  // Fetch admin details based on the stored admin ID
  useEffect(() => {
    const fetchAdminName = async () => {
      if (!adminId) return;

      try {
        const { data: adminData, error: adminError } = await supabase
          .from("admin")
          .select("full_name")
          .eq("id", adminId)
          .single();

        if (adminError) {
          console.error("Error fetching admin name:", adminError);
          return;
        }

        if (adminData) {
          setLoggedInAdminName(adminData.full_name);
        }
      } catch (error) {
        console.error("Error fetching admin name:", error);
      }
    };

    fetchAdminName();
  }, [adminId]);

  // Fetch existing publishers
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const { data, error } = await supabase.from("publisher").select("*");
        if (error) throw new Error(error.message);
        setPublishers(data);
      } catch (error: any) {
        setError("Failed to load publishers.");
      }
    };
    fetchPublishers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPublisher({ ...newPublisher, [e.target.name]: e.target.value });
  };

  const handleAddPublisher = async () => {
    if (!newPublisher.name || !newPublisher.email || !newPublisher.phone || !newPublisher.password) {
      alert("All fields are required.");
      return;
    }
    if (!loggedInAdminName) {
      alert("Error: Could not find the logged-in admin name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("publisher")
        .insert([{ ...newPublisher, added_by: loggedInAdminName }])
        .select("*");

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) throw new Error("Failed to retrieve inserted publisher.");

      alert("Publisher added successfully!");
      setPublishers([...publishers, data[0]]);
      setNewPublisher({ name: "", email: "", phone: "" ,password:""});
    } catch (error: any) {
      setError(error.message || "Failed to add publisher.");
    }

    setLoading(false);
  };

  const handleDeletePublisher = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this publisher?")) return;

    try {
      const { error } = await supabase.from("publisher").delete().eq("id", id);
      if (error) throw new Error("Error deleting publisher");

      setPublishers(publishers.filter((publisher) => publisher.id !== id));
    } catch (error: any) {
      console.error("Error deleting publisher:", error);
      setError("Failed to delete publisher.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold text-[#265073] mb-4">Add New Publisher</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Display Logged-in Admin Info --->>> no needed this-arif abdullah*/ }
        {/* {loggedInAdminName ? (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold">Logged-in Admin: {loggedInAdminName}</p>
          </div>
        ) : (
          <p className="text-red-500 mb-4">Admin name not found.</p>
        )} */}

        <div className="mb-4">
          <Input type="text" name="name" value={newPublisher.name} onChange={handleChange} placeholder="Publisher Name" />
        </div>
        <div className="mb-4">
          <Input type="email" name="email" value={newPublisher.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="mb-4">
          <Input type="numeric" name="phone" value={newPublisher.phone} onChange={handleChange} placeholder="Phone Number" />
        </div>
        <div className="mb-4">
          <Input type="password" name="password" value={newPublisher.password} onChange={handleChange} placeholder="Password" />
        </div>
        <Button onClick={handleAddPublisher} disabled={loading} className="bg-[#265073] text-white py-2 px-4 rounded">
          {loading ? "Adding..." : "Add Publisher"}
        </Button>

        <h3 className="text-lg font-semibold mt-6">Publisher List</h3>
        {publishers.length === 0 ? <p>No publishers added yet.</p> : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100">
                <tr className="bg-[#265073] text-white">
                  <th className="px-4 py-2 text-left border">Name</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">Phone</th>
                  <th className="px-4 py-2 text-left border">Added By</th>
                  <th className="px-4 py-2 text-center border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((publisher) => (
                  <tr key={publisher.id} className="border-b">
                    <td className="px-4 py-2">{publisher.name}</td>
                    <td className="px-4 py-2">{publisher.email}</td>
                    <td className="px-4 py-2">{publisher.phone}</td>
                    <td className="px-4 py-2">{publisher.added_by}</td>
                    <td className="px-4 py-2 text-center">
                      <Button onClick={() => handleDeletePublisher(publisher.id)} variant="destructive" className="ml-4">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPublisher;

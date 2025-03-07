import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";
import Sidebar from "@/components/SlideBar";

const UsersList = () => {
  const [users, setUsers] = useState<
    { id: number; image: string; firstname: string; lastname: string; email: string; phone_number: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, image, firstname, lastname, email, phone_number");

        if (error) throw error;
        setUsers(data || []);
      } catch (err: any) {
        console.error("Error fetching users:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number, email: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      setError(null);
  
      // Step 1: Delete related transactions first
      const { error: deleteTransactionsError } = await supabase
        .from("transactions")
        .delete()
        .eq("user_id", id);
  
      if (deleteTransactionsError) {
        throw new Error(`Error deleting transactions: ${deleteTransactionsError.message}`);
      }
  
      // Step 2: Delete from alluser table
      const { error: deleteUserError } = await supabase
        .from("alluser")
        .delete()
        .eq("email", email);
  
      if (deleteUserError) {
        throw new Error(`Error removing user from alluser table: ${deleteUserError.message}`);
      }
  
      // Step 3: Delete the user from users table
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
  
      // Update the state after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
      setError(error.message);
    }
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-[#265073] mb-4">Users</h1>

        {loading ? (
          <p className="text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded">
            <thead className="bg-[#265073] text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">
                    <img
                      src={user.image || "/default-avatar.png"}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{`${user.firstname} ${user.lastname}`}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone_number}</td>
                  <td className="px-4 py-2 text-center">
                    <Button onClick={() => handleDeleteUser(user.id, user.email)} variant="destructive">
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

export default UsersList;

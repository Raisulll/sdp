import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/SlideBar";

const AddAdmin = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ full_name: "", email: "", password: "", image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data: adminData, error: adminError } = await supabase.from("admin").select("*");
        if (adminError) throw new Error(adminError.message);

        const emails = adminData.map((admin) => admin.email);
        const { data: userData, error: userError } = await supabase
          .from("alluser")
          .select("email, role")
          .in("email", emails);

        if (userError) throw new Error(userError.message);

        const validAdmins = adminData.filter((admin) =>
          userData.some((user) => user.email === admin.email && user.role === "admin")
        );

        setAdmins(adminData);
        setFilteredAdmins(validAdmins);
      } catch (error: any) {
        console.error("Error fetching admins:", error);
        setError("Failed to load admin list.");
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAdmin({ ...newAdmin, image: e.target.files[0] });
    }
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("profile_images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Error uploading image: " + uploadError.message);
    }

    return supabase.storage.from("profile_images").getPublicUrl(fileName).data.publicUrl;
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.full_name || !newAdmin.email || !newAdmin.password) {
      alert("Full Name, Email, and Password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admin")
        .select("id")
        .eq("email", newAdmin.email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw new Error(checkError.message);
      }

      if (existingAdmin) {
        alert("Admin with this email already exists.");
        setLoading(false);
        return;
      }

      let profileImage = "https://hvbraclpyrwmifaebctf.supabase.co/storage/v1/object/public/books/UserDefault.png";
      if (newAdmin.image instanceof File) {
        profileImage = await uploadImage(newAdmin.image);
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .insert([
          {
            full_name: newAdmin.full_name,
            email: newAdmin.email,
            password: newAdmin.password,
            image: profileImage,
          },
        ])
        .select("*");

      if (adminError) throw new Error(adminError.message);
      if (!adminData || adminData.length === 0) {
        throw new Error("Failed to retrieve inserted admin.");
      }

      const { error: userInsertError } = await supabase
        .from("alluser")
        .insert([{ email: newAdmin.email, role: "admin" }]);

      if (userInsertError) throw new Error("Failed to add user to alluser table: " + userInsertError.message);

      alert("Admin added successfully!");

      setAdmins([...admins, adminData[0]]);
      setFilteredAdmins([...filteredAdmins, adminData[0]]);

      setNewAdmin({ full_name: "", email: "", password: "", image: null });
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Failed to add admin.");
    }

    setLoading(false);
  };

  const handleDeleteAdmin = async (id: number, email: string) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const { error } = await supabase.from("admin").delete().eq("id", id);
      if (error) throw new Error("Error deleting admin");

      const { error: deleteUserError } = await supabase.from("alluser").delete().eq("email", email);
      if (deleteUserError) throw new Error("Error removing admin from alluser table");

      const updatedAdmins = admins.filter((admin) => admin.id !== id);
      setAdmins(updatedAdmins);
      setFilteredAdmins(updatedAdmins.filter((admin) => admin.email !== email));
    } catch (error: any) {
      console.error("Error deleting admin:", error);
      setError("Failed to delete admin.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold text-[#265073] mb-4">Add New Admin</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <Input type="text" name="full_name" value={newAdmin.full_name} onChange={handleChange} placeholder="Full Name" />
          <Input type="email" name="email" value={newAdmin.email} onChange={handleChange} placeholder="Admin Email" />
          <Input type="password" name="password" value={newAdmin.password} onChange={handleChange} placeholder="Password" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        
        <Button onClick={handleAddAdmin} disabled={loading} className="mt-4 bg-[#265073] text-white">
          {loading ? "Adding..." : "Add Admin"}
        </Button>

        <h3 className="text-lg font-semibold mt-6">Admin List</h3>
        {loading ? <p>Loading...</p> : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
              <tr className="bg-[#265073] text-white">
                  <th className="px-4 py-2 text-center border">Image</th>
                  <th className="px-4 py-2 text-center border">Name</th>
                  <th className="px-4 py-2 text-center border">Email</th>
                  <th className="px-4 py-2 text-center border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b">
                    <td className="px-4 py-2 text-center">
                      <img src={admin.image} alt="Admin" className="w-12 h-12 rounded-full object-cover mx-auto" />
                    </td>
                    <td className="px-4 py-2 text-center">{admin.full_name}</td>
                    <td className="px-4 py-2 text-center">{admin.email}</td>
                    <td className="px-4 py-2 text-center">
                      <Button onClick={() => handleDeleteAdmin(admin.id, admin.email)} variant="destructive">Delete</Button>
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

export default AddAdmin;

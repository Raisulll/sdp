import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";
import { toast } from "react-toastify";

export function EditProfileDialog() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch publisher profile data from backend when the dialog opens
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!storedUser || !storedUser.publisherId) {
        throw new Error("Publisher ID is missing.");
      }

      const response = await fetch(
        `http://localhost:5000/publisher/profileInfo?publisherId=${storedUser.publisherId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch publisher profile");
      }

      const data = await response.json();
      console.log("Data",data);
      setFormData({
        name: data[0].name || "",
        phone: data[0].phone || "",
        email: data[0].email || "",
        address: data[0].address || "",
        description: data[0].description || "",
      });
    } catch (error) {
      console.error("Error fetching publisher profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when the dialog opens
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Function to handle saving updated profile details
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!storedUser.publisherId) {
        throw new Error("Publisher ID is missing.");
      }

      const response = await fetch(
        "http://localhost:5000/publisher/updateProfile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publisherId: storedUser.publisherId,
            ...formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const updatedData = await response.json();
// dont change the user in local storage just change the image link
      const updatedUser = { ...storedUser, image: updatedData.image };
      localStorage.setItem("user", JSON.stringify(updatedUser
      ));
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchProfile()}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#FAF7ED]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#265073]">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Publisher Name
              </label>
              <Input
                placeholder="Enter publisher name"
                className="border-[#265073] focus-visible:ring-[#265073]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                className="border-[#265073] focus-visible:ring-[#265073]"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                className="border-[#265073] focus-visible:ring-[#265073]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Address
              </label>
              <Input
                placeholder="Enter address"
                className="border-[#265073] focus-visible:ring-[#265073]"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Description
              </label>
              <Textarea
                placeholder="Enter description about the publisher"
                className="min-h-[100px] border-[#265073] focus-visible:ring-[#265073]"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              className="bg-[#265073] text-white hover:bg-[#1a3b5c]"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

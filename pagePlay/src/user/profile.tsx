import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "../../Auth/SupabaseClient";
import { BookOpen, Calendar, Camera, Gift, Plus, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TransactionTable } from "@/components/transaction-table";
import { transactions } from "@/data/transactions";

const ProfilePage: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    birthday: "",
    gender: "",
  });

  const genres = [
    "Romance",
    "Mystery/Thriller",
    "Fantasy",
    "Science Fiction",
    "+5 More",
  ];

  const handleProfileUpdate = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser.userId || storedUser.id; // Debugging
  
      console.log("Stored User:", storedUser);
      console.log("User ID:", userId);
  
      if (!userId) throw new Error("User ID is missing.");
  
      // Ensure the gender value matches one of the allowed values
     
  
      console.log("Sending Data:", {
        userId,
        fullName: formData.fullName,
        location: formData.location,
        birthday: formData.birthday,
        
      });
  
      const response = await fetch("http://localhost:5000/user/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          fullName: formData.fullName,
          location: formData.location,
          birthday: formData.birthday,
         
        }),
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        throw new Error(errorData.error || "Failed to update profile.");
      }
  
      // Refresh profile data after update
      const profileResponse = await fetch(
        `http://localhost:5000/user/profileInfo?userId=${userId}`
      );
      const data = await profileResponse.json();
      setProfile(data[0]);
  
      alert("Profile updated!");
      setIsEditDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error);
        alert(`Failed to update profile: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };           

  const fileUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`.replace(/\s+/g, "-").toLowerCase();
    console.log("Uploading file:", fileName);

    const { error } = await supabase.storage
      .from("profile_images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("profile_images").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadedImageUrl = await fileUpload(file);
      if (uploadedImageUrl) {
        setAvatarPreview(uploadedImageUrl);
        updateProfileImage(uploadedImageUrl);
        //update the profile image in the localstorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.image = uploadedImageUrl;
        localStorage.setItem("user", JSON.stringify(storedUser));
        
      }
    }
  };

  const updateProfileImage = async (imageUrl: string) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser.userId;

      if (!userId) {
        throw new Error("User ID is missing.");
      }

      const response = await fetch("http://localhost:5000/user/updateProfileImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, image: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile image.");
      }
      console.log("Profile image updated successfully.");
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (!storedUser || !storedUser.userId) {
          throw new Error("User ID is missing.");
        }

        const response = await fetch(
          `http://localhost:5000/user/profileInfo?userId=${storedUser.userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log(data);
        setProfile(data[0]); // Assuming the data is an array with one object
        setAvatarPreview(data[0].image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-[#F5F0E8] pt-24 flex justify-center items-center">
      <div className="animate-pulse space-y-4">
        <div className="w-64 h-8 bg-gray-300 rounded"></div>
        <div className="w-96 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-center text-[#265073] mb-8">
          Profile
        </h1>

        <Card className="p-6 md:p-8 bg-[#FAF7ED] border-none shadow-lg rounded-2xl">
          <div className="grid md:grid-cols-[280px_1fr_250px] gap-8">
            {/* Left Column - Profile Image and Details */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-white shadow-lg">
                  <img
                    src={avatarPreview}
                    alt="Profile picture"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={handleImageClick}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-10 w-10 text-white" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
                <h2 className="font-semibold text-lg text-[#265073] border-b pb-2">
                  Personal Details
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-600 flex items-center gap-3">
                    <Users className="h-4 w-4 text-[#265073]" />
                    {profile.gender}, {profile.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-3">
                    <Gift className="h-4 w-4 text-[#265073]" />
                    Birth Day: {formatDate(profile.date_of_birth)}
                  </p>
                  <p className="text-gray-600 flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#265073]" />
                    Joined: {formatDate(profile.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - User Info and Stats */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-[#265073]">
                    {profile.firstname} {profile.lastname}
                  </h2>
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
                        onClick={() => {
                          setFormData({
                            fullName: `${profile.firstname} ${profile.lastname}`,
                            location: profile.address,
                            birthday: profile.date_of_birth,
                            gender: profile.gender,
                          });
                        }}
                      >
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#FAF7ED]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#265073]">
                          Edit Profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                          <Label
                            htmlFor="name"
                            className="text-[#265073] font-semibold"
                          >
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="border-[#265073] focus-visible:ring-[#265073]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="location"
                            className="text-[#265073] font-semibold"
                          >
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="border-[#265073] focus-visible:ring-[#265073]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="birthday"
                            className="text-[#265073] font-semibold"
                          >
                            Birthday
                          </Label>
                          <Input
                            id="birthday"
                            type="date"
                            value={formData.birthday}
                            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                            className="border-[#265073] focus-visible:ring-[#265073]"
                          />
                        </div>
                        
                      </div>
                      <div className="flex justify-end gap-4 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                          className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-[#265073] hover:bg-[#1a3b5c] text-white"
                          onClick={handleProfileUpdate}
                        >
                          Save changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="bg-[#C2D9FF] px-8 py-4 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer">
                    <div className="text-3xl font-bold text-[#265073]">100</div>
                    <div className="text-sm font-medium text-[#265073]/80">
                      Books
                    </div>
                  </div>
                  <div className="bg-[#C2D9FF] px-8 py-4 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer">
                    <div className="text-3xl font-bold text-[#265073]">8</div>
                    <div className="text-sm font-medium text-[#265073]/80">
                      Following
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-[#265073]">
                    Favorite Genres
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-[#C2D9FF] hover:bg-[#B1CDFF] text-[#265073] font-medium transition-all hover:scale-105 px-4 py-1.5"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-[#265073]">
                    My BookShelves
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#265073] hover:text-[#265073]/80"
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c] transition-all hover:scale-105 shadow-md h-auto py-4 rounded-xl">
                    <div className="space-y-1">
                      <BookOpen className="h-5 w-5 mx-auto" />
                      <div>Read</div>
                      <div className="text-xl font-bold">01</div>
                    </div>
                  </Button>
                  <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c] transition-all hover:scale-105 shadow-md h-auto py-4 rounded-xl">
                    <div className="space-y-1">
                      <BookOpen className="h-5 w-5 mx-auto" />
                      <div>Currently Reading</div>
                      <div className="text-xl font-bold">00</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Favorite Book */}
            <div className="flex flex-col items-center">
              <div className="bg-[#C2D9FF] p-6 rounded-2xl w-full aspect-square flex flex-col items-center justify-center text-center space-y-6 transition-all hover:scale-105 cursor-pointer group shadow-md">
                <h3 className="font-bold text-xl text-[#265073]">
                  FAVORITE BOOK
                </h3>
                <div className="w-40 h-40 bg-white/80 rounded-full flex items-center justify-center shadow-inner group-hover:bg-white transition-colors">
                  <Plus className="h-10 w-10 text-[#265073] group-hover:scale-125 transition-transform" />
                </div>
                <p className="text-sm text-[#265073]/70">
                  Click to add your favorite book
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-6 md:p-8 bg-[#FAF7ED] border-none shadow-lg rounded-2xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#265073]">
              Recent Transactions
            </h2>
            <TransactionTable transactions={transactions} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ProfilePage;
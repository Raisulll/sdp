import { AddBookDialog } from "@/components/add-book-dialog";
import { EditProfileDialog } from "@/components/edit-publisher-profile";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Library, Plus, ShoppingCart } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../Auth/SupabaseClient";

const PublisherProfile: React.FC = () => {
  const [openAddBook, setOpenAddBook] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const DEFAULT_AVATAR = "/BookShop.png";

  // Fetch publisher profile data from backend
  const fetchProfile = useCallback(async () => {
    try {
      const storedPublisher = JSON.parse(localStorage.getItem("user") || "{}");
      if (!storedPublisher || !storedPublisher.publisherId) {
        throw new Error("Publisher ID is missing.");
      }
      const response = await fetch(
        `http://localhost:5000/publisher/profileInfo?publisherId=${storedPublisher.publisherId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch publisher profile");
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching publisher profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fileUpload = async (file: File) => {
    try {
      const fileName = `${Date.now()}-${file.name}`
        .replace(/\s+/g, "-")
        .toLowerCase();

      const { data, error } = await supabase.storage
        .from("publisher")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("publisher")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const uploadedImageUrl = await fileUpload(file);
        if (uploadedImageUrl) {
          await updateProfileImage(uploadedImageUrl);
          setProfile((prev: any) => ({
            ...prev,
            0: { ...prev[0], image: uploadedImageUrl },
          }));
          const storedPublisher = JSON.parse(
            localStorage.getItem("user") || "{}"
          );
          storedPublisher.image = uploadedImageUrl;
          localStorage.setItem("user", JSON.stringify(storedPublisher));
          toast.success("Profile image updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update profile image");
      }
    }
  };

  const updateProfileImage = async (imageUrl: string) => {
    try {
      const storedPublisher = JSON.parse(localStorage.getItem("user") || "{}");
      const publisherId = storedPublisher.publisherId;
      if (!publisherId) {
        throw new Error("Publisher ID is missing.");
      }

      const response = await fetch(
        "http://localhost:5000/publisher/updateProfileImage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publisherId, imageUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile image.");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
            <div className="space-y-6">
              <Card className="p-8">
                <Skeleton className="w-64 h-64 rounded-full mx-auto" />
              </Card>
              <Card className="p-8">
                <Skeleton className="h-32 w-full" />
              </Card>
            </div>
            <Card className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Publisher Profile</h1>
          <EditProfileDialog
            profile={profile}
            onProfileUpdated={fetchProfile}
          />
        </div>
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
          {/* Left Column - Profile Image */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="relative group">
                  <div className="relative w-64 h-64 mx-auto">
                    <img
                      src={profile[0].image || DEFAULT_AVATAR}
                      alt="Publisher profile"
                      className="w-full h-full rounded-full object-cover bg-muted shadow-md transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-4 right-4 bg-background rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Book Section */}
            <Dialog open={openAddBook} onOpenChange={setOpenAddBook}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Add New Book</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <DialogTrigger asChild>
                    <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <Plus className="h-8 w-8" />
                    </div>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button className="w-full">Add Book</Button>
                  </DialogTrigger>
                </CardContent>
              </Card>
              <AddBookDialog onClose={() => setOpenAddBook(false)} />
            </Dialog>
          </div>

          {/* Right Column - Publisher Information Display */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publisher Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Publisher Name
                    </label>
                    <p className="font-medium">{profile[0].name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Contact Number
                    </label>
                    <p className="font-medium">{profile[0].phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Email Address
                    </label>
                    <p className="font-medium">{profile[0].email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Location
                    </label>
                    <p className="font-medium">{profile[0].address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Description
                    </label>
                    <p className="font-medium">{profile[0].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 text-center">
                      <Library className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">
                        {profile[0].book_count}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Published Books
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 text-center">
                      <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">1.2K</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Total Sales
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default PublisherProfile;

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
import { BookOpen, Calendar, Camera, Gift, Plus, Users } from "lucide-react";
import React, { useRef, useState } from "react";

const AVATAR_URL =
  "https://api.dicebear.com/6.x/avataaars/svg?seed=JohnDoee&background=%23EBF4FF&radius=50&width=285&height=285";

const ProfilePage: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string>(AVATAR_URL);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const genres = [
    "Romance",
    "Mystery/Thriller",
    "Fantasy",
    "Science Fiction",
    "+5 More",
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                    Male, City, Country
                  </p>
                  <p className="text-gray-600 flex items-center gap-3">
                    <Gift className="h-4 w-4 text-[#265073]" />
                    Birth Day: DD/MM/YYYY
                  </p>
                  <p className="text-gray-600 flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#265073]" />
                    Joined: Month DD YEAR
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - User Info and Stats */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-[#265073]">
                    User Name
                  </h2>
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
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
                            defaultValue="User Name"
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
                            defaultValue="City, Country"
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
                            className="border-[#265073] focus-visible:ring-[#265073]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="gender"
                            className="text-[#265073] font-semibold"
                          >
                            Gender
                          </Label>
                          <Input
                            id="gender"
                            defaultValue="Male"
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
                          onClick={() => setIsEditDialogOpen(false)}
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
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#265073] hover:text-[#265073]/80"
                  >
                    Edit
                  </Button> */}
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
      </main>
    </div>
  );
};

export default ProfilePage;

import Navbar from "@/components/navbar"; // Adjust path if necessary
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Edit2, Gift, Plus } from "lucide-react";
import React from "react";

// Avatar URL
// const AVATAR_URL =
//   "https://api.dicebear.com/7.x/micah/svg?seed=Felix&hairStyle=fonze,full,pixie&glasses=variant01&glassesProbability=100";

const AVATAR_URL ="https://api.dicebear.com/6.x/avataaars/svg?seed=JohnDoee&background=%23EBF4FF&radius=50&width=285&height=285"; // Change the seed value to your name

// Define the structure of the profile page component
const ProfilePage: React.FC = () => {
  const genres = [
    "Romance",
    "Mystery/Thriller",
    "Fantasy",
    "Science Fiction",
    "+5 More",
  ];

  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#265073]">Profile</h1>
          <Button
            variant="outline"
            className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Card className="p-8 bg-[#FAF7ED] border-none shadow-lg">
          <div className="grid md:grid-cols-[300px_1fr_300px] gap-8">
            {/* Left Column - Profile Image and Details */}
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={AVATAR_URL}
                  alt="Profile picture"
                  className="w-64 h-64 rounded-full mx-auto object-cover bg-white shadow-md transition-transform group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-[#265073]" />
                </button>
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg text-[#265073]">
                  Details
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#265073]" />
                  Male, City, Country
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Gift className="h-4 w-4 text-[#265073]" />
                  <span>Birth Day: DD/MM/YYYY</span>
                </div>
              </div>
            </div>

            {/* Middle Column - User Info and Stats */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#265073]">
                  User Name
                </h2>
                <div className="flex gap-4">
                  <div className="bg-[#a4c0ed] px-8 py-3 rounded-2xl text-center transition-transform hover:scale-105">
                    <div className="text-2xl font-bold text-[#265073]">100</div>
                    <div className="text-sm font-medium">Books</div>
                  </div>
                  <div className="bg-[#a4c0ed] px-8 py-3 rounded-2xl text-center transition-transform hover:scale-105">
                    <div className="text-2xl font-bold text-[#265073]">8</div>
                    <div className="text-sm font-medium">Following</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-[#265073]">Details</h3>
                <p className="text-gray-600">Joined in Month DD YEAR</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[#265073]">
                  Favorite GENRES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <Badge
                      key={index} // Use the index if the genre is simple text
                      variant="secondary"
                      className="bg-[#a4c0ed] hover:bg-[#93b3e7] text-[#265073] font-medium transition-all hover:scale-105"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#265073]">My BookShelves</h3>
                <div className="flex gap-4">
                  <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c] transition-all hover:scale-105 shadow-md">
                    Read (01)
                  </Button>
                  <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c] transition-all hover:scale-105 shadow-md">
                    Currently Reading (00)
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Favorite Book */}
            <div className="flex flex-col items-center">
              <div className="bg-[#a4c0ed] p-6 rounded-2xl w-full max-w-[250px] aspect-square flex flex-col items-center justify-center text-center space-y-4 transition-transform hover:scale-105 cursor-pointer group shadow-md">
                <h3 className="font-bold text-lg text-[#265073]">
                  FAVORITE BOOK
                </h3>
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner group-hover:bg-[#265073]/5 transition-colors">
                  <Plus className="h-8 w-8 text-[#265073]" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ProfilePage;

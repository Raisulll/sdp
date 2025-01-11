import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { EditProfileDialog } from "@/components/edit-publisher-profile";
import { AddBookDialog } from "@/components/add-book-dialog";

const PUBLISHER_AVATAR =
  "/BookShop.png";

const PublisherProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#265073]">Profile</h1>
          <EditProfileDialog />
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
          {/* Left Column - Profile Image */}
          <div className="space-y-6">
            <Card className="p-8 bg-[#FAF7ED] border-none shadow-lg">
              <div className="relative group">
                <img
                  src={PUBLISHER_AVATAR}
                  alt="Publisher profile"
                  className="w-64 h-64 rounded-full mx-auto object-cover bg-white shadow-md transition-transform group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-[#265073]" />
                </button>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
              >
                Edit Picture
              </Button>
            </Card>

            {/* Add Book Section */}
            <Dialog>
              <Card className="p-8 bg-[#FAF7ED] border-none shadow-lg">
                <div className="text-center space-y-4">
                  <h3 className="font-bold text-lg text-[#265073]">
                    Add New Book
                  </h3>
                  <DialogTrigger asChild>
                    <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center shadow-inner hover:bg-[#265073]/5 transition-colors cursor-pointer">
                      <Plus className="h-8 w-8 text-[#265073]" />
                    </div>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#265073] text-white hover:bg-[#1a3b5c]">
                      Add Book
                    </Button>
                  </DialogTrigger>
                </div>
              </Card>
              <AddBookDialog />
            </Dialog>
          </div>

          {/* Right Column - Publisher Information Display */}
          <Card className="p-8 bg-[#FAF7ED] border-none shadow-lg space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#265073]">
                  Publisher Details
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Publisher Name
                    </label>
                    <p className="text-[#265073] font-medium">
                      Penguin Random House
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Contact Number
                    </label>
                    <p className="text-[#265073] font-medium">+1 212-782-9000</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Email Address
                    </label>
                    <p className="text-[#265073] font-medium">
                      contact@penguinrandomhouse.com
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="text-[#265073] font-medium">New York, USA</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="text-[#265073] font-medium">
                      Penguin Random House is the international home to nearly
                      275 editorially and creatively independent publishing
                      imprints. Together, our imprints publish more than 70,000
                      digital and 15,000 print titles annually, with more than
                      100,000 eBooks available worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-[#265073] mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#a4c0ed] px-6 py-4 rounded-xl text-center transition-transform hover:scale-105">
                  <div className="text-2xl font-bold text-[#265073]">24</div>
                  <div className="text-sm font-medium">Published Books</div>
                </div>
                <div className="bg-[#a4c0ed] px-6 py-4 rounded-xl text-center transition-transform hover:scale-105">
                  <div className="text-2xl font-bold text-[#265073]">1.2K</div>
                  <div className="text-sm font-medium">Total Downloads</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PublisherProfile;

'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Upload, Plus, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Navbar from "@/components/adminnavbar";
const publishers = [
  {
    id: 1,
    name: "Tamrolipi",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Publishing house specializing in contemporary literature"
  },
  {
    id: 2,
    name: "Anonna",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Leading publisher of fiction and poetry"
  },
  {
    id: 3,
    name: "Somoy",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Renowned publisher of academic and educational books"
  },
  {
    id: 4,
    name: "Ananda",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Publisher of classic literature and translations"
  },
  {
    id: 5,
    name: "Prothoma",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Modern publishing house focusing on contemporary works"
  },
  {
    id: 6,
    name: "Kakoli",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Specialized in children's books and educational materials"
  }
]

export default function PublisherList() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen bg-[#E5EADD] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 bg-[#FAF7ED] p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Filter By</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">Oldest</Button>
              <Button variant="outline" className="w-full justify-start">Newest</Button>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <Input type="text" placeholder="Genre" className="w-full" />
              </div>
              <Button variant="outline" className="w-full justify-start">Most purchased</Button>
              <Button variant="outline" className="w-full justify-start">Highest Rated</Button>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <Input type="text" placeholder="Country" className="w-full" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-[#265073]">Publisher List</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Search" 
                    className="pl-10 w-[300px]"
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#265073] hover:bg-[#265073]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Publisher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#FAF7ED]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#265073]">Add New Publisher</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Publisher Name</Label>
                        <Input id="name" placeholder="Enter publisher name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Enter publisher description" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Logo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <div className="flex flex-col items-center">
                            {!selectedFile ? (
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                  <Upload className="w-12 h-12 text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input
                                  id="file-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileSelect}
                                />
                              </label>
                            ) : (
                              <div className="relative">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="max-w-[200px] max-h-[200px] rounded-lg"
                                />
                                <button
                                  onClick={clearSelectedFile}
                                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button type="submit" className="bg-[#265073] hover:bg-[#265073]/90">
                        Add Publisher
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishers.map((publisher) => (
                <div 
                  key={publisher.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-[#FAF7ED] flex items-center justify-center p-4">
                      <img
                        src={publisher.logo}
                        alt={`${publisher.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#265073] mb-2">{publisher.name}</h3>
                    <p className="text-sm text-gray-600">{publisher.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


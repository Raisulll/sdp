'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import Navbar from "@/components/adminnavbar";

const users = [
  {
    id: 1,
    name: "MR.OBAYED",
    email: "obayedbinhabib1299@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 2,
    name: "Jahid Bin",
    email: "jahidbinwahid72@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 3,
    name: "MR. Aziz",
    email: "mdrizall123499@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 4,
    name: "Kabbo Sarker",
    email: "sarkarkabbo725@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 5,
    name: "Anika Tasnim",
    email: "tasnimanika404@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 6,
    name: "Ariful Khan",
    email: "arifulislamkhan@gmail.com",
    image: "/placeholder.svg?height=400&width=400"
  }
]

export default function UserList() {
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
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <Input type="text" placeholder="Age" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Occupation</label>
                <Input type="text" placeholder="Occupation" className="w-full" />
              </div>
              <Button variant="outline" className="w-full justify-start">Newest</Button>
              <Button variant="outline" className="w-full justify-start">Frequently Login</Button>
              <Button variant="outline" className="w-full justify-start">Most Purchase</Button>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <Input type="text" placeholder="Country" className="w-full" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">User List</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search" 
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div 
                  key={user.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-[#265073] mb-2">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
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


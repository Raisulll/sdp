'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Flag, AlertTriangle, MessageCircle, Clock,  Trash2 } from 'lucide-react'


import Navbar from "@/components/adminnavbar";


interface ReportDetails {
  id: string
  reporter: {
    name: string
    avatar: string
    email: string
  }
  reason: string
  type: string
  status: 'pending' | 'investigating' | 'resolved'
  priority: 'high' | 'medium' | 'low'
  date: string
  time: string
  comment: string
  commentator: {
    name: string
    avatar: string
    role: string
  }
}

const reportDetails: ReportDetails = {
  id: 'REP-2024-001',
  reporter: {
    name: 'Md. Jaber',
    avatar: '/placeholder.svg?height=40&width=40',
    email: 'jaber@example.com'
  },
  reason: 'Hateful Speech',
  type: 'User Conduct',
  status: 'pending',
  priority: 'high',
  date: '17 December 2024',
  time: '14:30',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
  commentator: {
    name: 'Arif Abdullah',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Moderator'
  }
}

export default function ReportDetailsPage() {
  const handleDelete = () => {
    // Handle delete functionality here
    console.log('Deleting report:', reportDetails.id)
  }

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen bg-[#E5EADD] pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        

        <Card className="mb-6">
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold text-[#265073]">
                  Report Description
                </CardTitle>
                <div className="text-sm text-gray-500">
                  Report ID: {reportDetails.id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  {reportDetails.status}
                </Badge>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {reportDetails.priority} priority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={reportDetails.reporter.avatar} alt={reportDetails.reporter.name} />
                      <AvatarFallback>{reportDetails.reporter.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[#265073]">Reported By</h3>
                      <p className="text-sm text-gray-600">{reportDetails.reporter.name}</p>
                      <p className="text-sm text-gray-500">{reportDetails.reporter.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {reportDetails.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <Clock className="w-4 h-4" />
                      {reportDetails.time}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="w-4 h-4 text-red-500" />
                      <h3 className="font-semibold text-[#265073]">Reason</h3>
                    </div>
                    <p className="text-gray-600">{reportDetails.reason}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-semibold text-[#265073]">Type</h3>
                    </div>
                    <p className="text-gray-600">{reportDetails.type}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <h3 className="font-semibold text-[#265073]">Comment</h3>
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {reportDetails.comment}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-[#265073] mb-4">Commentator</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={reportDetails.commentator.avatar} alt={reportDetails.commentator.name} />
                      <AvatarFallback>{reportDetails.commentator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{reportDetails.commentator.name}</p>
                      <p className="text-sm text-gray-500">{reportDetails.commentator.role}</p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}


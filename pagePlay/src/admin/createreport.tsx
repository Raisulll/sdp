'use client'

import { useState } from 'react'
import Navbar from "@/components/adminnavbar";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from 'lucide-react'

export default function CreateReport() {

  const [formData, setFormData] = useState({
    reportedUser: '',
    type: '',
    priority: '',
    description: '',
    evidence: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
   
  }

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen bg-[#E5EADD]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Reports
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#265073] mb-6">Create New Report</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportedUser">Reported User</Label>
              <Input
                id="reportedUser"
                value={formData.reportedUser}
                onChange={(e) => setFormData({ ...formData, reportedUser: e.target.value })}
                placeholder="Enter username or email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Report Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide details about the report..."
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence URL (Optional)</Label>
              <Input
                id="evidence"
                type="url"
                value={formData.evidence}
                onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                placeholder="https://"
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
               
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-[#265073] hover:bg-[#265073]/90"
              >
                Submit Report
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}


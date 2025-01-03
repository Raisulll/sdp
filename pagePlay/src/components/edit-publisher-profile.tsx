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

export function EditProfileDialog() {
  return (
    <Dialog>
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
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Contact Number
              </label>
              <Input
                type="tel"
                placeholder="Enter contact number"
                className="border-[#265073] focus-visible:ring-[#265073]"
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
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Location
              </label>
              <Input
                placeholder="Enter location"
                className="border-[#265073] focus-visible:ring-[#265073]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#265073]">
                Description
              </label>
              <Textarea
                placeholder="Enter description about the publisher"
                className="min-h-[100px] border-[#265073] focus-visible:ring-[#265073]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button className="bg-[#265073] text-white hover:bg-[#1a3b5c]">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

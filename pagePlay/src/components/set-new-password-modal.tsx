import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";

interface SetNewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SetNewPasswordModal({
  isOpen,
  onClose,
}: SetNewPasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#a4c0ed] border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-black">
            Set New Password
          </DialogTitle>
          <DialogDescription className="text-center text-black/70 text-base">
            Please enter your new password below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                className="w-full h-[50px] bg-white rounded-[40px] pl-[60px] pr-12 text-base font-medium border-none"
              />
              <Lock className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px] text-gray-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
                className="w-full h-[50px] bg-white rounded-[40px] pl-[60px] pr-12 text-base font-medium border-none"
              />
              <Lock className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px] text-gray-500" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[174px] h-[49px] bg-[#f5ffde] hover:bg-[#f5ffde]/90 text-black font-medium text-lg rounded-[46px]"
            >
              {isSubmitting ? "Updating..." : "Set New Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { Mail } from "lucide-react";
import { OTPModal } from "./otp-modal";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowOTPModal(true);
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-[#a4c0ed] border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-black">
              Reset your Password
            </DialogTitle>
            <DialogDescription className="text-center text-black/70 text-base">
              Please provide the email address that you used when you signed up
              for your account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-mail"
                required
                className="w-full h-[50px] bg-white rounded-[40px] pl-[60px] pr-6 text-base font-medium border-none"
              />
              <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px] text-gray-500" />
            </div>
            <div className="text-center text-sm text-black/70">
              We will send you an email with a 6-digit one-time password to
              reset your password.
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[174px] h-[49px] bg-[#f5ffde] hover:bg-[#f5ffde]/90 text-black font-medium text-lg rounded-[46px]"
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <OTPModal isOpen={showOTPModal} onClose={handleOTPClose} email={email} />
    </>
  );
}

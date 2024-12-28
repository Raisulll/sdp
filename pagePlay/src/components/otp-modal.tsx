import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetNewPasswordModal } from "./set-new-password-modal";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function OTPModal({ isOpen, onClose, email }: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      inputRefs[0].current?.focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSetPasswordModal(true);
  };

  const handleSetPasswordClose = () => {
    setShowSetPasswordModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-[#a4c0ed] border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-black">
              Enter OTP
            </DialogTitle>
            <DialogDescription className="text-center text-black/70 text-base">
              We've sent a 6-digit one-time password to {email}. Please enter it
              below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{1}"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                  className="w-10 h-12 text-center text-xl bg-white rounded-lg border-none"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-center text-sm text-black/70">
              Didn't receive the OTP?{" "}
              <button type="button" className="text-[#265073] hover:underline">
                Resend
              </button>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || otp.some((digit) => digit === "")}
                className="w-[174px] h-[49px] bg-[#f5ffde] hover:bg-[#f5ffde]/90 text-black font-medium text-lg rounded-[46px]"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <SetNewPasswordModal
        isOpen={showSetPasswordModal}
        onClose={handleSetPasswordClose}
      />
    </>
  );
}

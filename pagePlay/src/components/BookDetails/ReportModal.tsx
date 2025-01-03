import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reportReasons = [
  "Problem involving someone under 18",
  "Bullying, harassment or abuse",
  "Violent, hateful or disturbing content",
  "Scam, fraud or false information",
  "Selling or promoting restricted items",
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleReport = (reason: string) => {
    console.log("Reported for:", reason);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-semibold">
              Thanks for letting us know
            </h2>
            <p className="text-center text-gray-600">
              We use your feedback to help our system learn when something's not
              right
            </p>
            <Button onClick={onClose}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Why are you reporting this comment?
          </p>
          <p className="text-sm text-gray-600 mb-6">
            If someone is in immediate danger, get help before reporting to
            PagePlay. Don't wait.
          </p>
          <div className="space-y-2">
            {reportReasons.map((reason) => (
              <Button
                key={reason}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleReport(reason)}
              >
                {reason}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

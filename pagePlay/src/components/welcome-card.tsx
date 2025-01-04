import { Card } from "@/components/ui/card";
import { FC } from "react";

interface WelcomeCardProps {
  year: number;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ year }) => {
  return (
    <Card className="p-6 bg-[#FAF7ED] text-center">
      <h2 className="font-bold text-[#265073] mb-4">WELCOME TO PagePlay</h2>
      <p className="text-gray-600 mb-6">
        Meet your favorite book, find your reading community, and manage your
        reading life.
      </p>

      <div className="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/400x300?text=Book"
          alt="Welcome Illustration"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-[#265073]">PagePlay</h3>
        <p className="text-sm text-[#265073]">CHOICE AWARDS</p>
        <p className="text-2xl font-bold text-[#265073]">{year}</p>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Announcing the Best Books of {year}
      </p>
    </Card>
  );
};

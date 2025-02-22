import { Card } from "@/components/ui/card";
import { FC } from "react";

interface WelcomeCardProps {
  year: number;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ year }) => {
  return (
    <Card className="p-6 bg-[#FAF7ED] text-center h-full w-full">
      <h2 className="font-bold text-[#265073] mb-4">BEST RATED BOOK</h2>
      <p className="text-gray-600 mb-6">
        Discover the highest-rated book of the year and join the community of readers who loved it.
      </p>

      <div className="flex justify-center mb-6">
        <img
          src="https://hvbraclpyrwmifaebctf.supabase.co/storage/v1/object/public/books/1740069711481-TheMidNightLibrary.jpg"
          alt="Best Rated Book"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-[#265073]">The Midnight Library</h3>
        <p className="text-sm text-[#265073]">by Matt Haig</p>
        <p className="text-2xl font-bold text-[#265073]">{new Date().getFullYear()}</p>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Announcing the Best Rated Book of {new Date().getFullYear()}
      </p>
    </Card>
  );
};
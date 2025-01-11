import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import React from "react";
import Navbar from "@/components/navbar";
import { trendingBooks, suggestedBooks } from "@/data/books";

const books = [...trendingBooks, ...suggestedBooks];

const WishlistPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const wishlistItems = books.slice(0, 5); // Example: taking first 5 books as wishlist items

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(wishlistItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const subtotal = wishlistItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.price ?? 0), 0);

  const onlineFee = 5;
  const total = subtotal + onlineFee;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#E5EADD] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#265073] mb-8">WISHLIST</h1>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  checked={selectedItems.length === wishlistItems.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">
                  Select All ({wishlistItems.length} item
                  {wishlistItems.length !== 1 ? "s" : ""})
                </span>
              </div>

              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.author}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2 font-semibold">
                      ${item.price?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#E5EADD] p-6 rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4">Checkout Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Online Fee</span>
                  <span>${onlineFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-3 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payable total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
                <Button
                className="w-full mt-6 bg-[#265073] hover:bg-[#265073]/90"
                disabled={selectedItems.length === 0}
                onClick={() => {
                  if (selectedItems.length > 0) {
                  window.location.href = "/check-out";
                  }
                }}
                >
                Proceed to checkout
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;

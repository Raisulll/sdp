import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const actualdata = JSON.parse(localStorage.getItem("user") || "{}");

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_image_url: string;
  price: number;
  cart_id: number;
}

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Book[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/user/wishlist?userId=${actualdata.userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items");
      }
      const data = await response.json();
      console.log(data);
      setWishlistItems(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []); // Removed actualdata.userId as a dependency

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(wishlistItems.map((item) => item.cart_id.toString()));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (cart_id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(cart_id.toString())) {
        return prev.filter((id) => id !== cart_id.toString());
      }
      return [...prev, cart_id.toString()];
    });
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await fetch("http://localhost:5000/user/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: actualdata.userId,
          bookId: itemId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = wishlistItems
    .filter((item) => selectedItems.includes(item.cart_id.toString()))
    .reduce((sum, item) => sum + Number(item.price), 0);

  const onlineFee = 5;
  const total = subtotal + onlineFee;

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-[#F5F0E8] pt-24 flex justify-center items-center">
      <div className="animate-pulse space-y-4">
        <div className="w-64 h-8 bg-gray-300 rounded"></div>
        <div className="w-96 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#E5EADD] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#265073] mb-8">Cart</h1>
          {wishlistItems.length === 0 ? (
            <div className="text-center text-gray-600">Your cart is empty.</div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox
                    checked={
                      wishlistItems.length > 0 &&
                      selectedItems.length === wishlistItems.length
                    }
                    onCheckedChange={(checked) =>
                      handleSelectAll(Boolean(checked))
                    }
                  />
                  <span className="text-sm text-gray-600">
                    Select All ({wishlistItems.length} item
                    {wishlistItems.length !== 1 ? "s" : ""})
                  </span>
                </div>
                {wishlistItems.map((item) => (
                  <div
                    key={item.cart_id}
                    className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.cart_id.toString())}
                      onCheckedChange={() => handleSelectItem(item.cart_id)}
                    />
                    <img
                      src={item.cover_image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">{item.author}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-2 font-semibold">${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#E5EADD] p-6 rounded-lg h-fit">
                <h2 className="text-xl font-semibold mb-4">Checkout Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Online Fee</span>
                    <span>${onlineFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-3 border-t">
                    <span>Total</span>
                    <span>${total}</span>
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
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;

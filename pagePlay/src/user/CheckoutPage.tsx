import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCcMastercard } from "react-icons/fa";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const CheckoutPage: React.FC = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const fetchName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/fetchname?userId=${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("User data:", data);
        setName(data[0].firstname);
      } catch (error) {
        console.error(error);
      }
    };
    fetchName();
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stateData =
    (location.state as {
      total: number;
      bookIds: number[];
      publisherIds: number[];
    }) || {};
  const total = stateData.total || queryParams.get("total") || "0";
  const bookIds = stateData.bookIds || [];
  const publisherIds = stateData.publisherIds || [];
  console.log(
    "Total:",
    total,
    "Book IDs:",
    bookIds,
    "Publisher IDs:",
    publisherIds
  );

  // Default dummy data for card details.
  const [formData, setFormData] = useState({
    cardholderName: "Sabbir Hossain",
    cardNumber: "1234 5678 1234 5678",
    expiry: "12/25",
    cvc: "123",
    discountCode: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.userId;

  // Remove event parameter here
  const handleSubmit = async (bookId: number, publisherId: number) => {
    try {
      const response = await fetch("http://localhost:5000/user/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookId,
          publisherId,
        }),
      });
      if (!response.ok) {
        throw new Error("Payment failed");
      }
      // Handle successful payment (e.g., show a success message)
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E8] pt-24">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">Let's Make Payment</h1>
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-6">
                To start your subscription, input your card details to make
                payment.
              </p>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder's Name</Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      required
                    />
                    <FaCcMastercard className="absolute right-3 top-1/2 -translate-y-1/2 h-6" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountCode">Discount Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discountCode"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleChange}
                    />
                    <Button type="button" variant="outline">
                      Apply
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#265073] hover:bg-[#265073]/90"
                  onClick={async (e) => {
                    e.preventDefault();
                    // Process payment for each book and publisher pair
                    for (let i = 0; i < bookIds.length; i++) {
                      await handleSubmit(bookIds[i], publisherIds[i]);
                    }
                    navigate("/home");
                  }}
                >
                  Pay
                </Button>
              </form>
            </div>
            <div className="bg-[#E5EADD] p-6 rounded-lg h-fit">
              <h2 className="text-lg font-semibold mb-4">You're paying:</h2>
              <div className="flex justify-between font-semibold text-base pt-3 border-t">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCcMastercard } from "react-icons/fa";
import React, { useState } from "react";

interface CheckoutItem {
  title: string;
  price: number;
}

const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    discountCode: "",
  });

  const items: CheckoutItem[] = [
    { title: "Book Name", price: 86.73 },
    { title: "Book Name", price: 75.6 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const onlineFee = 5.0;
  const total = subtotal + onlineFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Let's Make Payment</h1>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-6">
              To start your subscription, input your card details to make
              payment. You will be redirected to your bank's authorization page.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  {/* <img
                    src={mastercard}
                    alt="Mastercard"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-6"
                  /> */}
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
              >
                Pay
              </Button>
            </form>
          </div>

          <div className="bg-[#E5EADD] p-6 rounded-lg h-fit">
            <h2 className="text-lg font-semibold mb-4">You're paying:</h2>
            <div className="space-y-3 text-sm">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-gray-600">
                <span>Online Fee</span>
                <span>${onlineFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

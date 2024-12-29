import Navbar_guest from "@/components/navbar_guest";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import emailIcon from "../assets/email-icon.svg";
import bookStack from "../assets/large-book.svg";
import lockIcon from "../assets/lock-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";
import floatingBook from "../assets/reaching-book.svg";
import readingPerson from "../assets/reading-desk.svg";
import treeIllustration from "../assets/tree-scene.svg";
import userIcon from "../assets/user-icon.svg";

import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"



export default function Signup() {
  const [date, setDate] = React.useState<Date>()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", formData);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'date' ? e.target.value : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <>
      <Navbar_guest />
      <div className="min-h-screen bg-[#E5EADD] flex flex-col justify-center items-center overflow-x-hidden">
        {/* Main Content */}
       
        <div className="w-full max-w-[900px] bg-[#a4c0ed] rounded-[10px] bottom-[85px] p-4 sm:p-8 relative overflow-hidden">
            {/* Tree illustration */}
            <img
              src={treeIllustration}
              alt=""
              className="absolute bottom-0 left-0 w-[210px] hidden lg:block"
            />

            {/* Signup Form */}
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-black text-center mb-2">
                Welcome to PagePlay
              </h1>
              <p className="text-2xl font-semibold text-black text-center mb-12">
                Sign up to continue
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6 max-w-[800px] mx-auto"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={userIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={userIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={emailIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={phoneIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date of Birth */}
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[390px] h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[30px] sm:pl-[29px] justify-start text-left text-sm sm:text-sm font-medium border-none outline-none",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-[100px] h-[10px] mr-7"/>
                        {date ? format(date, "PPP") : <span>Date of Birth</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Password Fields */}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-12 text-sm sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={lockIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                    />
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
                 
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-[174px] h-[40px] bg-[#265073] hover:bg-[#265073]/90 text-white font-medium text-lg sm:text-xl rounded-[46px]"
                  >
                    Submit
                  </Button>

                  <p className="text-lg font-medium">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[#265073] hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Decorative Images */}
        <img
          src={bookStack}
          alt="Book Stack"
          className="absolute bottom-[5%] left-[0%] max-w-[25%] h-auto hidden lg:block"
        />
        <img
          src={floatingBook}
          alt="Floating Book"
          className="absolute top-[5%] right-[17%] max-w-[13%] h-auto hidden lg:block"
        />
        <img
          src={readingPerson}
          alt="Reading Person"
          className="absolute bottom-[5%] right-10 max-w-[26%] h-auto hidden lg:block"
        />
        </div>
    </>
  );
}


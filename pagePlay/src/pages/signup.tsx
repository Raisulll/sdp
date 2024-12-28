import Navbar_guest from "@/components/navbar_guest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailIcon from "../assets/email-icon.svg";
import bookStack from "../assets/large-book.svg";
import lockIcon from "../assets/lock-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";
import floatingBook from "../assets/reaching-book.svg";
import readingPerson from "../assets/reading-desk.svg";
import treeIllustration from "../assets/tree-scene.svg";
import userIcon from "../assets/user-icon.svg";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", formData);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navbar_guest />
      <div className="min-h-screen bg-[#E5EADD] flex flex-col relative overflow-x-hidden">
        {/* Decorative Images */}
        <img
          src={bookStack}
          alt=""
          className="absolute bottom-0 left-[-50px] w-[373px] hidden lg:block"
        />
        <img
          src={floatingBook}
          alt=""
          className="absolute top-[80px] right-[80px] w-[245px] transform-none hidden lg:block"
        />
        <img
          src={readingPerson}
          alt=""
          className="absolute bottom-0 right-0 w-[412px] hidden lg:block"
        />

        {/* Main Content */}
        <div className="flex justify-center items-center min-h-screen px-4 py-8 sm:py-12">
          <div className="w-full max-w-[912px] bg-[#a4c0ed] rounded-[13px] p-4 sm:p-8 relative overflow-hidden">
            {/* Tree illustration */}
            <img
              src={treeIllustration}
              alt=""
              className="absolute bottom-0 left-0 w-[210px]"
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
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-6 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={userIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px]"
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
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-6 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={userIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px]"
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
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-6 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={emailIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px]"
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
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-6 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={phoneIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[25px] h-[25px]"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-12 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={lockIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[23px] h-[27px]"
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
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full h-[50px] sm:h-[67px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-12 text-base sm:text-lg font-medium border-none outline-none"
                    />
                    <img
                      src={lockIcon}
                      alt=""
                      className="absolute left-7 top-1/2 -translate-y-1/2 w-[23px] h-[27px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-6 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
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
                    className="w-full sm:w-[174px] h-[49px] bg-[#265073] hover:bg-[#265073]/90 text-white font-medium text-lg sm:text-xl rounded-[46px]"
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
        </div>
      </div>
    </>
  );
}


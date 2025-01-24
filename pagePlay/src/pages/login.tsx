import { ForgotPasswordModal } from "@/components/forgot-password-modal";
import Navbar_guest from "@/components/navbar_guest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import emailIcon from "../assets/email-icon.svg";
import bookStack from "../assets/large-book.svg";
import lockIcon from "../assets/lock-icon.svg";
import floatingBook from "../assets/reaching-book.svg";
import readingPerson from "../assets/reading-desk.svg";
import treeIllustration from "../assets/tree-scene.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    const result = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await result.json();
    console.log(data);
    if(data.role === "user") {
      navigate("/user-profile");
    }
    else if(data.role === "publisher") {
      navigate("/publisher-profile");
    }
    else if(data.role === "admin") {
      navigate("/admin-dashboard");
    }
    else {
      console.log("Invalid role");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar_guest />
      <div className="min-h-screen bg-[#E5EADD] flex flex-col justify-center items-center overflow-x-hidden">
        {/* Main Content */}
        <div className="w-full max-w-[800px] bg-[#a4c0ed] rounded-[10px] bottom-[85px] p-4 sm:p-8 relative overflow-hidden">
          {/* Tree illustration */}
          <img
            src={treeIllustration}
            alt="Tree illustration"
            className="absolute bottom-0 left-0 max-w-[20%] h-auto"
          />

          {/* Login Form */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-black text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-2xl font-semibold text-black text-center mb-12">
              Login to continue
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-[60%] sm:max-w-[500px] mx-auto"
            >
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-[40px] sm:h-[60px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-6 text-base sm:text-lg font-medium border-none outline-none"
                />
                <img
                  src={emailIcon}
                  alt="Email Icon"
                  className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-[40px] sm:h-[60px] bg-white rounded-[40px] pl-[60px] sm:pl-[81px] pr-12 text-base sm:text-lg font-medium border-none outline-none"
                />
                <img
                  src={lockIcon}
                  alt="Lock Icon"
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

              <div className="flex flex-col items-center gap-4">
                <Button
                  type="submit"
                  className="w-full sm:w-[174px] h-[49px] bg-[#f5ffde] hover:bg-[#f5ffde]/90 text-black font-medium text-lg sm:text-xl rounded-[46px]"
                >
                  Login
                </Button>

                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[15px] font-medium text-gray-600 hover:underline"
                >
                  Forgot password
                </button>

                <p className="text-lg font-medium">
                  New User?{" "}
                  <Link to="/signup" className="text-[#265073] hover:underline">
                    Sign Up
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
          className="absolute bottom-[5%] left-[0%] max-w-[26%] h-auto hidden lg:block"
        />
        <img
          src={floatingBook}
          alt="Floating Book"
          className="absolute top-[5%] right-[15%] max-w-[25%] h-auto hidden lg:block"
        />
        <img
          src={readingPerson}
          alt="Reading Person"
          className="absolute bottom-[5%] right-10 max-w-[26%] h-auto hidden lg:block"
        />
      </div>
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
}

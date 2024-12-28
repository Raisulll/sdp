import { ForgotPasswordModal } from "@/components/forgot-password-modal";
import Navbar_guest from "@/components/navbar_guest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    navigate("/");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    navigate("/user-profile");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
          className="fixed top-20 right-20 w-[245px] z-10 hidden lg:block"
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
                className="space-y-6 max-w-[542px] mx-auto"
              >
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter E-mail"
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
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

                <div className="flex flex-col items-center gap-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-[174px] h-[49px] bg-[#f5ffde] hover:bg-[#f5ffde]/90 text-black font-medium text-lg sm:text-xl rounded-[46px]"
                    onClick={handleLogin}
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
                    <Link
                      to="/signup"
                      className="text-[#265073] hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
}

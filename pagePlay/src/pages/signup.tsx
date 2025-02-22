import Navbar_guest from "@/components/navbar_guest"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import addressIcon from "../assets/address-svgrepo-com.png"
import emailIcon from "../assets/email-icon.svg"
import genderIcon from "../assets/gender.png"
import lockIcon from "../assets/lock-icon.svg"
import phoneIcon from "../assets/phone-icon.svg"
import floatingBook from "../assets/reaching-book.svg"
import userIcon from "../assets/user-icon.svg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function Signup() {
  const [date, setDate] = React.useState<Date>()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDate = date ? format(date, "yyyy-MM-dd") : ""
    const formDataWithFormattedDate = {
      ...formData,
      dateOfBirth: formattedDate,
    }
    console.log("Signup attempt with:", formDataWithFormattedDate)
    const result = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithFormattedDate),
    })
    const data = await result.json()
    console.log(data)
    if (result.status === 200) {
      toast.success("User Created Successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } else if (result.status === 400) {
      toast.error("User already exists!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }))
  }

  return (
    <>
      <Navbar_guest />
      <ToastContainer />
      <div className="min-h-screen bg-[#E5EADD] flex flex-col justify-center items-center overflow-x-hidden">
        {/* Main Content */}

        <div className="w-full max-w-[900px] bg-[#a4c0ed] rounded-[10px] bottom-[85px] p-4 sm:p-8  overflow-hidden">
          {/* Signup Form */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-black text-center mb-2">Welcome to PagePlay</h1>
            <p className="text-2xl font-semibold text-black text-center mb-12">Sign up to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-[800px] mx-auto">
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
                    src={userIcon || "/placeholder.svg"}
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
                    src={userIcon || "/placeholder.svg"}
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
                    src={emailIcon || "/placeholder.svg"}
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
                    src={phoneIcon || "/placeholder.svg"}
                    alt=""
                    className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Address */}
                <div className="relative">
                  <Input
                    type="text"
                    name="address"
                    placeholder="City, Country"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                  />
                  <img
                    src={addressIcon || "/placeholder.svg"}
                    alt=""
                    className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
                  />
                </div>

                {/* Gender */}
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] pr-6 text-sm sm:text-lg font-medium border-none outline-none"
                  >
                    <option value="" disabled className="font-normal">
                      Select Gender
                    </option>
                    <option value="male" className="font-normal">
                      Male
                    </option>
                    <option value="female" className="font-normal">
                      Female
                    </option>
                  </select>
                  <img
                    src={genderIcon || "/placeholder.svg"}
                    alt=""
                    className="absolute left-7 top-1/2 -translate-y-1/2 w-[30px] h-[30px]"
                  />
                </div>
              </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date of Birth */}
                <div className="relative">
                  <Input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Pick your date of birth"
                  className="w-full h-[40px] sm:h-[60px] bg-white rounded-[13px] pl-[60px] sm:pl-[81px] text-sm sm:text-lg font-medium border-[#265073] focus-visible:ring-[#265073] outline-none"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  />
                  <CalendarIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-gray-500" />
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
                    src={lockIcon || "/placeholder.svg"}
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
                  <Link to="/login" className="text-[#265073] hover:underline">
                    Sign in
                  </Link>
                  {/* break the line */}
                  <br />
                  Are you a publisher?{" "}
                  <Link to="/contact" className="text-[#265073] hover:underline">
                    Contact Us
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* Decorative Images */}
        <img
          src={floatingBook || "/placeholder.svg"}
          alt="Floating Book"
          className="absolute top-[5%] right-[17%] max-w-[13%] h-auto hidden lg:block"
        />
      </div>
    </>
  )
}


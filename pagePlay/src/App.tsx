import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UserProfile from "./user/profile";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/about-us" element={< AboutUs />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;

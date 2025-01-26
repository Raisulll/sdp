import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/admin-dashboard";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contact";
import Home from "./pages/home";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import BookList from "./publisher/booklist";
import PublisherProfile from "./publisher/publisherProfile";
import RequestedBooks from "./publisher/requested-books";
import PublisherTransactions from "./publisher/transaction";
import Blogs from "./user/Blogs";
import BookDetails from "./user/book-details";
import ChatBot from "./user/chatBot"; 
import CheckoutPage from "./user/checkoutPage";
import FavouriteBooks from "./user/favourite-books";
import MyBooks from "./user/my-books";
import PDFReader from "./user/pdf-reader";
import UserProfile from "./user/profile";
import WishlistPage from "./user/WishlistPage";

function App() {
  return (
    <Routes>
      {/* common */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* user */}
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/wish-list" element={<WishlistPage />} />
      <Route path="/check-out" element={<CheckoutPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pdf-reader" element={<PDFReader />} />
      <Route path="/favourite-books" element={<FavouriteBooks />} />
      <Route path="/chat-bot" element={<ChatBot />} />

      {/* publisher */}
      <Route path="/publisher-profile" element={<PublisherProfile />} />
      <Route path="/book-list" element={<BookList />} />
      <Route path="/requested-books" element={<RequestedBooks />} />
      <Route
        path="/publisher-transactions"
        element={<PublisherTransactions />}
      />

      {/* admin */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

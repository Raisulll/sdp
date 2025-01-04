import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/Contact";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import BookList from "./publisher/booklist";
import PublisherProfile from "./publisher/publisherProfile";
import RequestedBooks from "./publisher/requested-books";
import PublisherTransactions from "./publisher/transaction";
import BookDetails from "./user/book-details";
import CheckoutPage from "./user/CheckoutPage";
import MyBooks from "./user/my-books";
import UserProfile from "./user/profile";
import WishlistPage from "./user/WishlistPage";
import Blogs from "./user/Blogs";
import PdfReader from "./user/pdf-reader";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/publisher-profile" element={<PublisherProfile />} />
      <Route path="/book-list" element={<BookList />} />
      <Route path="/requested-books" element={<RequestedBooks />} />
      <Route
        path="/publisher-transactions"
        element={<PublisherTransactions />}
      />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/wish-list" element={<WishlistPage />} />
      <Route path="/check-out" element={<CheckoutPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/pdf-reader" element={<PdfReader />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

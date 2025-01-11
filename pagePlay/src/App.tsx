import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/contact";
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
import CheckoutPage from "./user/CheckoutPage";
import MyBooks from "./user/my-books";
import UserProfile from "./user/profile";
import WishlistPage from "./user/WishlistPage";
import AdminProfile from "./admin/profile"
import AdminUserlist from "./admin/userlist"
import AdminLogin from "./admin/adminlogin"
import AdminPublisher from "./admin/adminpublisher"
import AdminReportReview from "./admin/ReportReview"
import AdminTransaction from "./admin/admintransaction"
import AdminReportDetails from "./admin/reportdetails"
import AdminCreateReport from "./admin/createreport"
import PDFReader  from "./user/pdf-reader";
import FavouriteBooks from "./user/favourite-books";
import ChatBot from "./user/ChatBot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/about-us" element={<AboutUs />} />
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
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/wish-list" element={<WishlistPage />} />
      <Route path="/check-out" element={<CheckoutPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="admin-profile" element={<AdminProfile/>} />
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="admin-userlist" element={<AdminUserlist />} />
      <Route path="admin-publisher" element={<AdminPublisher />} />
      <Route path="admin-reportreview" element={<AdminReportReview />} />
      <Route path="admin-transaction" element={<AdminTransaction />} />
      <Route path="admin-reportdetails" element={<AdminReportDetails />} />
      <Route path="admin-createreport" element={<AdminCreateReport />} />
      <Route path="/pdf-reader" element={<PdfReader />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

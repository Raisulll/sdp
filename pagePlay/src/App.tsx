import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import PendingBooks from "./admin/PendingBooks";
import PublishersList from "./admin/PublisherList";
import Reports from "./admin/Report";
import Transactions from "./admin/Transactions";
import UsersList from "./admin/UserList";
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
import AddAdmin from "./admin/AddAdmin";
import AddPublisher from "./admin/AddPublisher";


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
      <Route path="/book-details/:bookId/:publisherId" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/wish-list" element={<WishlistPage />} />
      <Route path="/check-out" element={<CheckoutPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pdf-reader/:bookId" element={<PDFReader />} />
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
      
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersList />} />
      <Route path="/admin/publishers" element={<PublishersList />} />
      <Route path="/admin/transactions" element={<Transactions />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/pending-books" element={<PendingBooks />} />
      <Route path="/admin/Add-Admin" element={<AddAdmin />} />
      <Route path="/admin/Add-Publishers" element={<AddPublisher />} />
      
    </Routes>
  );
}

export default App;
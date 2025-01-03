import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UserProfile from "./user/profile";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/contact";
import PublisherProfile from "./publisher/publisherProfile";
import BookList from "./publisher/booklist";
import RequestedBooks from "./publisher/requested-books";
import PublisherTransactions from "./publisher/transaction";
import BookDetails from "./user/book-details";
import AboutUs from "./pages/aboutUs";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/about-us" element={< AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/publisher-profile" element={<PublisherProfile />} />
      <Route path="/book-list" element={<BookList />} />
      <Route path="/requested-books" element={<RequestedBooks />} />
      <Route path="/publisher-transactions" element={<PublisherTransactions />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}

export default App;

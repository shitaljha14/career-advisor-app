import {BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./components/UserContext.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CareerMatcher from "./components/CareerMatcher";
import Dashboard from "./pages/Dashboard";
import SavedCareers from "./components/SavedCareers";
import Profile from "./pages/Profile";

function AppContent() {
  const location = useLocation();

  // Hide Navbar & Footer for immersive pages (Dashboard + CareerMatcher)
  const hideLayout = ["/", "/dashboard", "/career-matcher"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!hideLayout && <Navbar />}

      <main className="flex-grow w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career-matcher" element={<CareerMatcher />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/saved-careers" element={<SavedCareers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

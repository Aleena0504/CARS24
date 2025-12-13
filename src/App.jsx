import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BrandStory from "./components/BrandStory";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopNow from "./pages/ShopNow";
import ThankYou from "./pages/ThankYou";


import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-container">

          
            <Navbar />

           
            <div className="page-content">
              <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/brand-story" element={<BrandStory />} />

                
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute>
                      <Inventory />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                
               
                <Route
                  path="/shop/:id"
                  element={
                    <ProtectedRoute>
                      <ShopNow />
                    </ProtectedRoute>
                  }
                />
                <Route path="/thankyou" element={<ThankYou />} />


               
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

              </Routes>
            </div>

            
            <Footer />

          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

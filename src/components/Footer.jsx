import "./Footer.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext); // dark / light

  return (
    <footer className={`footer fade-up ${theme}`}>

      {/* TOP BRAND NAME */}
      <div className="footer-top">
        <h2>AmWiN Cars</h2>
        <p>Premium Cars. Exceptional Service. Trusted Excellence.</p>
      </div>

      {/* MIDDLE CONTENT */}
      <div className="footer-mid">

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>📍 Bangalore, Karnataka</p>
          <p>📞 +91 9876543210</p>
          <p>✉️ support@amwincars.com</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/inventory" className="footer-link">Inventory</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        {/* SOCIALS */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <a href="#" className="footer-link">Facebook</a>
          <a href="#" className="footer-link">Instagram</a>
          <a href="#" className="footer-link">Twitter</a>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © 2025 AmWiN Cars. All Rights Reserved.
      </div>

    </footer>
  );
}

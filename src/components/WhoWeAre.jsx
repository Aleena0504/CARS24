import "./WhoWeAre.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function WhoWeAre() {
  const { theme } = useContext(ThemeContext); // dark / light

  return (
    <section className={`whoweare-section fade-up ${theme}`}>


      {/* LEFT TEXT SIDE */}
      <div className="whoweare-left">
        <h2 className="whoweare-title">Who We Are</h2>

        <p className="whoweare-text">
          AmWiN Cars is a premium multi-brand dealership offering luxury,
          electric, and performance vehicles. We combine automotive excellence
          with seamless customer experience, ensuring every customer gets
          personalized guidance from experts.
        </p>

        <p className="whoweare-text">
          Our passion for innovation, transparency, and trust has helped us
          become one of India’s most preferred premium automotive partners.
        </p>

        <Link to="/brand-story">
          <button className="learn-more-btn">Learn More →</button>
        </Link>
      </div>

      {/* RIGHT IMAGE SIDE */}
      <div className="whoweare-right">
        <div className="img-wrapper">
          <img src="/images/about.png" alt="about" className="whoweare-img" />
        </div>
      </div>
    </section>
  );
}

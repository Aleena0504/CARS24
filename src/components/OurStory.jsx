import "./OurStory.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function OurStory() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`ourstory-section fade-up ${theme}`}>
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT TEXT */}
          <div className="col-lg-6 col-md-12 ourstory-left">
            <h2 className="ourstory-title">Our Legacy</h2>

            <p className="ourstory-text">
              At AmWin, our journey began with one passion — bringing luxury,
              performance, and innovation to every car enthusiast. For over a decade,
              we’ve partnered with world-class brands including BMW, Audi, Mercedes,
              Porsche, and Tesla to provide vehicles that redefine excellence.
            </p>

            <p className="ourstory-text">
              Whether you're seeking thrilling speed, premium comfort, or the latest
              electric technology, AmWin ensures every customer finds the perfect car
              tailored to their lifestyle.
            </p>

            <Link to="/contact">
              <button className="story-btn">Contact Us →</button>
            </Link>
          </div>

          {/* RIGHT IMAGES */}
          <div className="col-lg-6 col-md-12 ourstory-right d-flex justify-content-center gap-3">
            <div className="story-img-wrapper img1">
              <img src="/images/abt1.jpg" alt="Car 1" className="story-img" />
            </div>

            <div className="story-img-wrapper img2">
              <img src="/images/abt2.jpeg" alt="Car 2" className="story-img" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

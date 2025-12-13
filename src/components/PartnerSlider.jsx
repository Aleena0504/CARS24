import "./PartnerSlider.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function PartnerSlider() {
  const { theme } = useContext(ThemeContext);

  const brandLogos = [
    "/partners/bmw.jpg",
    "/partners/audi.jpg",
    "/partners/mercedes.jpg",
    "/partners/porsche.jpg",
    "/partners/tesla.jpg",
    "/partners/jaguar.jpg",
    "/partners/landrover.jpg"
  ];

  return (
    <section className={`partners-section ${theme}`}>
      <h2 className="partners-title">Our Trusted Brand Partners</h2>
      <p className="partners-sub">
        World-class automotive manufacturers we proudly collaborate with.
      </p>

      <div className="partners-slider">
        <div className="partners-track">

          {brandLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`brand-${index}`}
              className="partner-logo-img"
            />
          ))}

          {/* Duplicate logos for infinite slide */}
          {brandLogos.map((logo, index) => (
            <img
              key={`dup-${index}`}
              src={logo}
              alt={`brand-duplicate-${index}`}
              className="partner-logo-img"
            />
          ))}

        </div>
      </div>
    </section>
  );
}

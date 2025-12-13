import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  const { theme } = useContext(ThemeContext);

  const features = [
    {
      icon: "🤝",
      title: "Trusted Dealership",
      desc: "Thousands of satisfied customers choose us every year.",
    },
    {
      icon: "🌍",
      title: "Wide Selection",
      desc: "Explore premium vehicles across multiple categories.",
    },
    {
      icon: "🛠️",
      title: "Expert Support",
      desc: "Professional assistance for buying, financing, and servicing.",
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      desc: "Competitive pricing with excellent value for every model.",
    },
  ];

  return (
    <section className={`why-section ${theme} fade-up`}>
      <div className="container text-center">

        {/* Heading */}
        <h2 className="fw-bold why-title mb-4">Why Choose AmWiN?</h2>

        {/* Bootstrap Grid */}
        <div className="row g-4 justify-content-center">
          {features.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-sm-6">
              
              <div className="why-box p-4 shadow-sm rounded">
                <span className="why-icon">{item.icon}</span>
                <h4 className="why-heading mt-3 mb-2">{item.title}</h4>
                <p className="why-desc mb-0">{item.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

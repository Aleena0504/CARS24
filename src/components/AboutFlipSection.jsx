import "./AboutFlip.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function AboutFlipSection() {
  const { theme } = useContext(ThemeContext);

  const cards = [
    {
      img: "/images/des1.jpg",
      title: "OUR MISSION",
      text: "To deliver premium, personalized car-buying experiences with trust, guidance, and a passion for excellence."
    },
    {
      img: "/images/plan.jpg",
      title: "OUR PLAN",
      text: "To bring a complete range of luxury, electric, and performance cars tailored for every automotive enthusiast."
    },
    {
      img: "/images/fu.jpg",
      title: "OUR VISION",
      text: "To become India's most trusted automotive partner delivering innovation, luxury, and unforgettable journeys."
    }
  ];

  return (
    <section className={`flip-section ${theme}`}>
      {cards.map((c, index) => (
        <div className="flip-card" key={index}>
          <div className="flip-inner">

            {/* FRONT SIDE */}
            <div className="flip-front">
              <img src={c.img} alt={c.title} />
            </div>

            {/* BACK SIDE */}
            <div className="flip-back">
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}

import "./CarCategoryStrip.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CarCategoryStrip() {
  const { theme } = useContext(ThemeContext); // get theme

  const categories = [
    { icon: "🏎️", label: "Supercar", count: "8+ cars" },
    { icon: "🚘", label: "Sports", count: "12+ cars" },
    { icon: "⚡", label: "Performance", count: "10+ cars" },
    { icon: "🚙", label: "Luxury", count: "15+ cars" },
    { icon: "🔋", label: "Electric", count: "6+ cars" },
  ];

  return (
    <div className={`car-category-strip ${theme}`}>
      {categories.map((cat, index) => (
        <div className="cat-item" key={index}>
          <span className="cat-icon">{cat.icon}</span>
          <div className="cat-texts">
            <span className="cat-label">{cat.label}</span>
            <span className="cat-count">{cat.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import Hero from "../components/nav/Hero";
import CarCategoryStrip from "../components/CarCategoryStrip";
import WhyChooseUs from "../components/WhyChooseUs";
import OurStory from "../components/OurStory";
import TestDrivePopup from "../components/nav/TestDrivePopup";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
    
      <section className="home-section">
  <Hero />
</section>

<section className="home-section">
 
    <CarCategoryStrip />
  
</section>

<section className="home-section">
  <OurStory />
</section>

<section className="home-section">
 
    <WhyChooseUs />
 
</section>



      {/* STICKY BUTTON */}
      <button
        className="sticky-testdrive-btn"
        onClick={() => setShowPopup(true)}
      >
        🚗 Test Drive
      </button>

      {/* POPUP MODAL */}
      {showPopup && (
        <TestDrivePopup close={() => setShowPopup(false)} />
      )}
    </>
  );
}

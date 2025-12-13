import AboutHeader from "../components/AboutHeader";
import WhoWeAre from "../components/WhoWeAre";
import AboutFlipSection from "../components/AboutFlipSection";
import OurStory from "../components/OurStory";
import PartnerSlider from "../components/PartnerSlider";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO HEADER */}
      <section className="section fade-in">
        <AboutHeader />
      </section>

      {/* WHO WE ARE */}
      <section className="section fade-in delay-1">
        <WhoWeAre />
      </section>

      {/* FLIP CARDS */}
      <section className="section fade-in delay-2">
        <AboutFlipSection />
      </section>

      {/* OUR STORY */}
      <section className="section fade-in delay-3">
        <OurStory />
      </section>

      {/* PARTNERS */}
      <section className="section fade-in delay-4">
        <PartnerSlider />
      </section>

      

    </div>
  );
}

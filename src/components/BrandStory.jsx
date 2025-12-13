import "./BrandStory.css";

export default function BrandStory() {
  return (
    <section className="brandstory-section fade-up">

      {/* HEADER */}
      <div className="brandstory-header">
        <h2 className="brandstory-title">Our Brand Story</h2>
        <p className="brandstory-sub">
          A journey built on passion, precision, and the pursuit of automotive excellence.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="timeline">

        {/* --- 2015 --- */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>2015 — The Beginning</h3>
            <p>
              AmWiN Cars was founded with a mission to bring global luxury automotive
              experiences to India. Starting as a small premium dealership, we quickly
              evolved into a trusted brand known for delivering performance and elegance.
            </p>
          </div>
        </div>

        {/* --- 2018 --- */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>2018 — Expanding Our Vision</h3>
            <p>
              We embraced the future of mobility by introducing electric and hybrid
              luxury vehicles, offering sustainable performance from leading
              automotive innovators.
            </p>
          </div>
        </div>

        {/* --- 2021 --- */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>2021 — Nationwide Growth</h3>
            <p>
              With rising trust and demand, AmWiN Cars expanded across major cities,
              providing premium automotive buying, servicing, and ownership experiences.
            </p>
          </div>
        </div>

        {/* --- 2024 --- */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>2024 — A Trusted Name in Luxury Mobility</h3>
            <p>
              Today, AmWiN Cars stands as a symbol of quality, transparency, and passion.
              We continue to redefine automotive excellence with expert guidance,
              curated car collections, and unmatched customer satisfaction.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

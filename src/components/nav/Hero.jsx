import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    img: "/images/car1.jpg",
    title: "Drive Your Dream Car Today",
    desc: "Discover our premium selection of luxury and performance vehicles.",
  },
  {
    img: "/images/CAR3.avif",
    title: "Experience Luxury Performance",
    desc: "High-end engineering meets cutting-edge design.",
  },
  {
    img: "/images/CAR4.jpg",
    title: "Redefining Modern Mobility",
    desc: "Thrill, comfort, and innovation in one place.",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4200 }}
        loop={true}
      >

        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section
              className="hero-section"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              <div className="hero-left text-white">
                <h1 className="fw-bold">{slide.title}</h1>
                <p className="lead">{slide.desc}</p>

                <div className="d-flex gap-3 mt-3">
                  <button
                    className="btn btn-primary px-4 py-2"
                    onClick={() => navigate("/inventory")}
                  >
                    Browse Inventory →
                  </button>

                  <button
                    className="btn btn-outline-light px-4 py-2"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us
                  </button>
                </div>
              </div>

          

            </section>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}


import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const API = "/api/cars";


export default function Inventory() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [seating, setSeating] = useState("any");
  const [sort, setSort] = useState("none");

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Disable scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // Debounce search
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch cars
  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setCars(res.data);
        setFiltered(res.data);
        setTimeout(() => setIsFetching(false), 300);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Unique brands
  const brands = useMemo(
    () => ["all", ...new Set(cars.map((c) => c.brand))],
    [cars]
  );

  // Filtering
  useEffect(() => {
    let result = [...cars];
    const q = debouncedQuery.toLowerCase();

    if (q) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q)
      );
    }

    if (brand !== "all") result = result.filter((c) => c.brand === brand);
    if (category !== "all") result = result.filter((c) => c.category === category);
    if (seating !== "any") result = result.filter((c) => Number(c.seating) === Number(seating));

    if (sort === "priceLow") result.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") result.sort((a, b) => b.price - a.price);
    if (sort === "newest") result.sort((a, b) => b.year - a.year);

    setFiltered(result);
  }, [cars, debouncedQuery, brand, category, seating, sort]);

  // Wishlist
  const toggleWishlist = (car) => {
    setWishlist((prev) =>
      prev.some((w) => w.id === car.id)
        ? prev.filter((w) => w.id !== car.id)
        : [car, ...prev]
    );
  };

  // Modal handlers
  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const formatPrice = (p) => Number(p).toLocaleString("en-IN");

  return (
    <div className="container py-5">
      <h1 className="fw-bold mt-4">Our Inventory</h1>
      <p className="text-muted mb-4">Search, filter and discover your next car.</p>

      {/* FILTER BAR */}
      <div className="row g-2 mb-4">

        <div className="col-md-3">
          <input className="form-control" placeholder="Search..."
            value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="col-md-2">
          <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
            {brands.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            <option value="electric">Electric</option>
            <option value="petrol">Petrol</option>
            <option value="supercar">Supercar</option>
            <option value="luxury">Luxury</option>
            <option value="sports">Sports</option>
            <option value="performance">Performance</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={seating} onChange={(e) => setSeating(e.target.value)}>
            <option value="any">Any seating</option>
            <option value="2">2 seats</option>
            <option value="4">4 seats</option>
            <option value="5">5 seats</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">Sort</option>
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="col-md-1">
          <Link to="/wishlist">
            <button className="btn btn-outline-primary w-100">❤️ {wishlist.length}</button>
          </Link>
        </div>

      </div>

      {/* CAR GRID */}
      <div className="row">
        {filtered.map((car) => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className={`card shadow-sm h-100 position-relative ${
              theme === "dark" ? "bg-dark text-white" : "bg-white"
            }`}>

              <button
                className="btn btn-danger position-absolute top-0 start-0 m-2 px-3 py-1 rounded-pill"
                onClick={() => toggleWishlist(car)}
              >
                {wishlist.some((w) => w.id === car.id) ? "❤️ Added" : "🤍 Wishlist"}
              </button>

              <button
                className="btn btn-secondary position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill"
                onClick={() => openModal(car)}
              >
                Quick View
              </button>

              <img src={car.img} className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }} />

              <div className="card-body">
                <h5>{car.name}</h5>
                <p className="text-warning fw-bold fs-5">₹ {formatPrice(car.price)}</p>

                {/* SHOP NOW — CONNECTED TO SHOP PAGE */}
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate(`/shop/${car.id}`)}
                >
                  🛒 Shop Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && selectedCar && (
        <>
          <div className="blur-backdrop" onClick={closeModal}></div>

          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "850px", width: "90%" }}>

              <div
                className={`modal-content rounded-4 shadow-lg ${
                  theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
                }`}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >

                <button
                  className={`btn-close position-absolute top-0 end-0 m-3 ${
                    theme === "dark" ? "btn-close-white" : ""
                  }`}
                  onClick={closeModal}
                ></button>

                <img src={selectedCar.img} className="w-100"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem"
                  }}
                />

                <div className="modal-body">
                  <h3 className="fw-bold">{selectedCar.name}</h3>
                  <p className="text-warning fs-5 fw-bold">₹ {formatPrice(selectedCar.price)}</p>

                  <p>{selectedCar.description}</p>

                  <h5 className="fw-bold mt-3">Specifications:</h5>
                  <ul>
                    {selectedCar.specs?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => navigate(`/shop/${selectedCar.id}`)}
                  >
                    🛒 Shop Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

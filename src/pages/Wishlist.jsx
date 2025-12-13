
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(saved);
    } catch {
      setWishlist([]);
    }
  }, []);

  // Remove a car from wishlist
  const remove = (id) => {
    const updated = wishlist.filter((c) => c.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Empty state
  if (!wishlist.length)
    return (
      <div className="container text-center py-5">
        <h1 className="fw-bold mb-3">Your Wishlist</h1>
        <p className="text-muted mb-4">No cars added yet. Explore our collection!</p>

        <Link to="/inventory">
          <button className="btn btn-primary px-4 py-2">Browse Inventory</button>
        </Link>
      </div>
    );

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Your Wishlist</h1>

      <div className="row">
        {wishlist.map((car) => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">

              {/* Car Image */}
              <img
                src={car.img}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
                alt={car.name}
              />

              {/* Card Body */}
              <div className="card-body">
                <h4 className="fw-bold">{car.name}</h4>
                <p className="text-warning fw-bold fs-5">
                  ₹ {Number(car.price).toLocaleString("en-IN")}
                </p>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={() => navigate(`/inventory`)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-danger w-50"
                    onClick={() => remove(car.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

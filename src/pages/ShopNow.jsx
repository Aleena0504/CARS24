import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

export default function ShopNow() {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [purchaseType, setPurchaseType] = useState("buy");
  const [paymentType, setPaymentType] = useState("");

  // EMI
  const [emiMonths, setEmiMonths] = useState(12);
  const interestRate = 10;

  const API = "http://localhost:5000/cars";

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => setCar(res.data));
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (!car) return null;

  // EMI CALCULATION
  const emiCalc = () => {
    let P = car.price;
    let r = interestRate / 12 / 100;
    let n = emiMonths;
    let emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  // FORM VALIDATION
  const validateForm = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      err.phone = "Enter a valid 10-digit phone number";
    if (!form.address.trim()) err.address = "Address cannot be empty";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // SUBMIT ORDER + LOCAL STORAGE
  const submitOrder = () => {
    if (!paymentType) {
      alert("Please select a payment method.");
      return;
    }

    if (!validateForm()) {
      alert("Please fill all details correctly.");
      return;
    }

    if (!window.confirm("Confirm your order?")) return;

    const orderData = {
      orderId: Date.now(),
      carId: car.id,
      carName: car.name,
      price: car.price,
      purchaseType,
      paymentType,
      emiMonths: paymentType === "EMI" ? emiMonths : null,
      monthlyEmi: paymentType === "EMI" ? emiCalc() : null,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
      },
      orderedAt: new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(orderData);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    navigate("/thankyou");
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold">{car.name}</h1>
      <p className="text-warning fw-bold fs-4">
        ₹ {Number(car.price).toLocaleString()}
      </p>

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-lg-6">
          <img
            src={car.img}
            className="img-fluid rounded"
            style={{ height: "330px", objectFit: "cover" }}
            alt={car.name}
          />

          <h4 className="mt-4 fw-bold">Specifications</h4>
          <ul>
            {car.specs?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6">
          <h4 className="fw-bold mb-2">Choose Type</h4>

          <div className="d-flex gap-3 py-2">
            {["buy", "rent"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPurchaseType(type);
                  setPaymentType("");
                }}
                className={`btn px-4 rounded-pill ${
                  purchaseType === type
                    ? "btn-primary"
                    : theme === "dark"
                    ? "btn-outline-light"
                    : "btn-outline-dark"
                }`}
              >
                {type === "buy" ? "🚗 Buy New" : "📅 Rent Car"}
              </button>
            ))}
          </div>

          {purchaseType === "buy" && (
            <div className="card p-3 mt-3 shadow-sm">
              <h4 className="fw-bold">Select Payment Method</h4>

              <div className="d-flex gap-2 flex-wrap mt-2">
                {["Full Cash", "EMI", "Loan"].map((pt) => (
                  <button
                    key={pt}
                    onClick={() => setPaymentType(pt)}
                    className={`btn ${
                      paymentType === pt
                        ? "btn-success"
                        : theme === "dark"
                        ? "btn-outline-light"
                        : "btn-outline-dark"
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>

              {paymentType === "Full Cash" && (
                <p className="fw-bold fs-4 mt-3">
                  ₹ {Number(car.price).toLocaleString()}
                </p>
              )}

              {paymentType === "EMI" && (
                <div className="mt-3">
                  <select
                    className="form-select"
                    value={emiMonths}
                    onChange={(e) => setEmiMonths(Number(e.target.value))}
                  >
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                  </select>

                  <p className="fw-bold mt-2">
                    Monthly EMI:{" "}
                    <span className="text-warning fs-5">
                      ₹ {emiCalc()}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {purchaseType === "rent" && (
            <div className="card p-3 mt-3 shadow-sm">
              <h4 className="fw-bold">Rent Payment</h4>
              {["Online Payment", "Pay on Pickup"].map((pt) => (
                <button
                  key={pt}
                  onClick={() => setPaymentType(pt)}
                  className={`btn me-2 mt-2 ${
                    paymentType === pt
                      ? "btn-success"
                      : theme === "dark"
                      ? "btn-outline-light"
                      : "btn-outline-dark"
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
          )}

          {paymentType && (
            <div className="card p-3 mt-3 shadow-sm">
              <h4 className="fw-bold">Your Details</h4>

              <input
                className="form-control mb-1"
                name="name"
                placeholder="Full Name"
                onChange={handleForm}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}

              <input
                className="form-control mb-1"
                name="phone"
                placeholder="Phone Number"
                onChange={handleForm}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}

              <textarea
                className="form-control mb-1"
                name="address"
                rows="3"
                placeholder="Full Address"
                onChange={handleForm}
              />

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={submitOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

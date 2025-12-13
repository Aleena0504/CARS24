import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center"
         style={{ minHeight: "80vh" }}>
      
      <h1 className="fw-bold text-success">🎉 Thank You!</h1>
      <p className="fs-5 text-muted text-center">
        Your order has been received. Our team will contact you shortly.
      </p>

      <Link to="/" className="btn btn-primary mt-3">Return to Home</Link>
    </div>
  );
}

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const result = login(form.email, form.password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/"); 
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center fw-bold mb-3">Login</h3>

        {error && <span className="text-danger">{error}</span>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="fw-semibold">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>

          <p className="text-center mt-3">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

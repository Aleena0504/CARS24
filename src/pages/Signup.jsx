import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[\w.%+-]+@[\w.-]+\.\w{2,}$/.test(form.email))
      err.email = "Enter a valid email";

    if (!form.password.trim()) err.password = "Password is required";
    else if (form.password.length < 4)
      err.password = "Password must be at least 4 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser && savedUser.email === form.email) {
      setErrors({ email: "Email already registered" });
      return;
    }

    signup(form);
    setSuccess("Account created successfully!");

    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "380px" }}>
        <h3 className="text-center fw-bold mb-3">Create Account</h3>

        {success && <p className="text-success fw-semibold">{success}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="text-danger small">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span className="text-danger small">{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <span className="text-danger small">{errors.password}</span>
            )}
          </div>

          <button className="btn btn-success w-100 mt-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

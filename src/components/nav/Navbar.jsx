import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top shadow-sm ${
        theme === "dark" ? "navbar-dark" : "navbar-light"
      }`}
      style={{
        backdropFilter: "blur(10px)",
        background:
          theme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
      }}
    >
      <div className="container">

        {/* BRAND LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/images/logo.webp" width={42} height={42} alt="logo" />
          <span className="brand-text fw-bold">AmWiN</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          
          {/* CENTER NAV LINKS */}
          <ul className="navbar-nav mx-auto gap-3">
            {["/", "/inventory", "/about", "/contact"].map((path, index) => {
              const names = ["Home", "Inventory", "About", "Contact"];

              return (
                <li className="nav-item" key={path}>
                  <Link
                    to={path}
                    className={`nav-link ${
                      location.pathname === path ? "active fw-bold" : ""
                    }`}
                  >
                    {names[index]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT SIDE CONTROLS */}
          <div className="d-flex align-items-center gap-3">

            {/* Phone */}
            <span className="fw-semibold nav-phone">📞 +91 9876543210</span>

            {/* Theme Button */}
            <button
              className="btn btn-outline-secondary theme-btn"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            {/* USER AUTH DROPDOWN */}
            <div className="dropdown">
              {user ? (
                <>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    👤 {user.name}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                   

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Register
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { IconLogout } from "./icons";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-mark">GB</span>
          Go Business
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`navbar-link${isHome ? " is-active" : ""}`}>
            Home
          </Link>
        </div>

        <div className="navbar-spacer" />

        <div className="navbar-actions">
          <ThemeToggle />
          <button type="button" className="navbar-logout" onClick={handleLogout}>
            <IconLogout />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

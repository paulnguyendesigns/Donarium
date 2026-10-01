import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <NavLink to="/" className="wordmark-group">
        <img src={logo} alt="" className="wordmark-logo" />
        <span className="wordmark">Donarium</span>
      </NavLink>

      <div className="navbar-right">
        <nav className="navbar-links">
          {user && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
              <NavLink to="/requests" className={({ isActive }) => (isActive ? "active" : "")}>
                Requests
              </NavLink>
            </>
          )}
          <NavLink to="/organizations" className={({ isActive }) => (isActive ? "active" : "")}>
            Organizations
          </NavLink>
        </nav>

        <NavLink to={user ? "/profile" : "/login"} className="account-btn">
          {user ? (
            <>
              <span>{user.first_name}</span>
              <i className="ri-user-3-line"></i>
            </>
          ) : (
            <span>Account</span>
          )}
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
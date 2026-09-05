import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <NavLink to={user ? "/dashboard" : "/login"} className="wordmark">
        Donarium
      </NavLink>

      {user ? (
        <>
            <nav className="navbar-links">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
            </NavLink>
            <NavLink to="/requests" className={({ isActive }) => (isActive ? "active" : "")}>
                Requests
            </NavLink>
            <NavLink to="/organizations" className={({ isActive }) => (isActive ? "active" : "")}>
                Organizations
            </NavLink>
            </nav>

            <div className="navbar-user">
            <NavLink
                to="/profile"
                className={({ isActive }) => "navbar-profile-link" + (isActive ? " active" : "")}
            >
                <i className="ri-user-3-line"></i>
                <span>{user.first_name}</span>
            </NavLink>
            <button onClick={logout} className="btn btn-ghost btn-small">
                Log out
            </button>
            </div>
        </>
      ) : (
        <nav className="navbar-links">
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Log in
          </NavLink>
          <NavLink to="/register" className="btn btn-secondary btn-small">
            Register
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
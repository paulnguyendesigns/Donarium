import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_COLORS = {
  teacher: "var(--forest)",
  organization: "var(--forest)",
  donor: "var(--marigold-dark)",
  admin: "var(--brick)",
};

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="navbar">
      <NavLink to="/dashboard" className="wordmark">
        Donarium
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => (isActive ? "active" : "")}>
          Requests
        </NavLink>
      </nav>

      <div className="navbar-user">
        <span className="role-chip">
          <span
            className="role-dot"
            style={{ background: ROLE_COLORS[user.role] || "var(--ink-soft)" }}
          />
          {user.first_name}
        </span>
        <button onClick={logout} className="btn btn-ghost btn-small">
          Log out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
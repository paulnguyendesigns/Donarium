import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatLabel } from "../utils/format";

const ROLE_COLORS = {
  teacher: "var(--terracotta)",
  organization: "var(--terracotta)",
  donor: "var(--marigold-dark)",
  admin: "var(--brick)",
};

function Dashboard() {
  const { user } = useAuth();
  const isRequester = user.role === "teacher" || user.role === "organization";

  return (
    <div className="page-narrow">
      <p className="role-label">
        <span
          className="role-dot"
          style={{ background: ROLE_COLORS[user.role] || "var(--ink-soft)" }}
        />
        {formatLabel(user.role)}
      </p>

      <h1>Welcome, {user.first_name}</h1>
      <p className="page-subtitle">
        {isRequester
          ? "Post requests or needs, and track it here as donors respond."
          : "Browse what organizations near you need right now."}
      </p>

      <div className="dashboard-actions">
        {isRequester && (
          <Link to="/requests/new" className="btn btn-primary">
            Post a request
          </Link>
        )}
        <Link to="/requests" className="btn btn-secondary">
          {isRequester ? "View your requests" : "Browse requests"}
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
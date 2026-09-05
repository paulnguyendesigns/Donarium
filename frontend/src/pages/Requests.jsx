import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRequests, fulfillRequest } from "../services/requests";
import { formatLabel } from "../utils/format";

const URGENCY_STRIPE = {
  low: "var(--sage)",
  medium: "var(--marigold)",
  high: "var(--brick)",
};

const STATUS_DOT = {
  open: "var(--forest)",
  fulfilled: "var(--sage)",
  closed: "var(--ink-soft)",
};

function Requests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canPost = user.role === "teacher" || user.role === "organization";

  async function loadRequests() {
    setLoading(true);
    setError("");
    try {
      const filters = {};
      if (statusFilter) filters.status = statusFilter;
      if (categoryFilter) filters.category = categoryFilter;

      const response = await getRequests(filters);
      setRequests(response.data);
    } catch (err) {
      setError("Couldn't load requests. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, [statusFilter, categoryFilter]);

  async function handleFulfill(requestId) {
    try {
      await fulfillRequest(requestId);
      loadRequests();
    } catch (err) {
      const detail = err.response?.data?.detail || "Could not fulfill request.";
      alert(detail);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Requests</h1>
          <p className="page-subtitle">
            {canPost ? "What you've asked the community for." : "What classrooms and organizations need right now."}
          </p>
        </div>
        {canPost && (
          <Link to="/requests/new" className="btn btn-primary">
            New request
          </Link>
        )}
      </div>

      <div className="filters">
        <div className="field">
          <label htmlFor="status-filter">Status</label>
          <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="category-filter">Category</label>
          <select id="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All categories</option>
            <option value="school_supplies">School supplies</option>
            <option value="food_assistance">Food assistance</option>
            <option value="hygiene_products">Hygiene products</option>
            <option value="basic_necessities">Basic necessities</option>
          </select>
        </div>
      </div>

      {loading && <p className="page-subtitle">Loading requests…</p>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && requests.length === 0 && (
        <div className="empty-state">
          <p>No requests match these filters.</p>
          {(statusFilter || categoryFilter) && (
            <button
              className="btn btn-ghost btn-small"
              onClick={() => {
                setStatusFilter("");
                setCategoryFilter("");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <ul className="request-list">
        {requests.map((req) => (
          <li
            key={req.id}
            className="request-card"
            style={{ borderLeftColor: URGENCY_STRIPE[req.urgency] || "var(--line)" }}
          >
            <div className="request-card-top">
              <h3>{req.title}</h3>
              <span className="status-badge">
                <span className="status-dot" style={{ background: STATUS_DOT[req.status] || "var(--ink-soft)" }} />
                {formatLabel(req.status)}
              </span>
            </div>

            <p className="request-org-line">
              For {req.organization_name} in {req.city}, {req.state}
            </p>

            <p className="request-description">{req.description}</p>

            <div className="meta-row">
              <span>{formatLabel(req.category)}</span>
              <span>Qty {req.quantity}</span>
              <span>{formatLabel(req.urgency)} urgency</span>
            </div>

            {user.role === "donor" && req.status === "open" && req.teacher_id !== user.id && (
              <button className="btn btn-accent" onClick={() => handleFulfill(req.id)}>
                Fulfill this request
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;
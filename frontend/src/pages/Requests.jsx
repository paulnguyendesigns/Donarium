import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getRequests, fulfillRequest } from "../services/requests";

function Requests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Failed to load requests.");
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
      <h1>Requests</h1>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="open">Open</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="closed">Closed</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          <option value="school_supplies">School Supplies</option>
          <option value="food_assistance">Food Assistance</option>
          <option value="hygiene_products">Hygiene Products</option>
          <option value="basic_necessities">Basic Necessities</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && requests.length === 0 && <p>No requests found.</p>}

      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            <h3>{req.title}</h3>
            <p>{req.description}</p>
            <p>
              {req.category} — {req.urgency} urgency — qty {req.quantity}
            </p>
            <p>
              {req.organization_name} ({req.city}, {req.state})
            </p>
            <p>Status: {req.status}</p>

            {user.role === "donor" &&
              req.status === "open" &&
              req.teacher_id !== user.id && (
                <button onClick={() => handleFulfill(req.id)}>
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
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createRequest } from "../services/requests";

function CreateRequest() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "school_supplies",
    quantity: 1,
    urgency: "low",
    organization_name: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await createRequest(formData);
      navigate("/requests");
    } catch (err) {
      const detail = err.response?.data?.detail || "Could not create request.";
      setError(detail);
    }
  }

  return (
    <div className="page-narrow">
      <Link to="/requests" className="back-link">← Back to requests</Link>
      <h1>Post a request</h1>
      <p className="page-subtitle">Tell donors what you need and where to bring it.</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="stacked-form">
        <section className="form-section">
          <h2>Request details</h2>

          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required />
          </div>
        </section>

        <section className="form-section">
          <h2>Specifics</h2>

          <div className="field-row-three">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="school_supplies">School supplies</option>
                <option value="food_assistance">Food assistance</option>
                <option value="hygiene_products">Hygiene products</option>
                <option value="basic_necessities">Basic necessities</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="urgency">Urgency</label>
              <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Drop-off information</h2>

          <div className="field">
            <label htmlFor="organization_name">Organization name</label>
            <input id="organization_name" name="organization_name" value={formData.organization_name} onChange={handleChange} required />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input id="state" name="state" value={formData.state} onChange={handleChange} required />
            </div>
          </div>
        </section>

        <button type="submit" className="btn btn-primary btn-full">
          Post request
        </button>
      </form>
    </div>
  );
}

export default CreateRequest;
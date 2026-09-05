import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/users";

function Profile() {
  const { user, updateUser } = useAuth();
  const isOrg = user.role === "teacher" || user.role === "organization";

  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await updateProfile(formData);
      updateUser(response.data);
      setSuccess("Profile updated.");
    } catch (err) {
      const detail = err.response?.data?.detail || "Could not update profile.";
      setError(detail);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-narrow">
      <h1>Your profile</h1>
      <p className="page-subtitle">Update your name{isOrg ? " and drop-off location" : ""}.</p>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      <form onSubmit={handleSubmit} className="stacked-form">
        <section className="form-section">
          <h2>Name</h2>
          <div className="field-row">
            <div className="field">
              <label htmlFor="first_name">First name</label>
              <input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="last_name">Last name</label>
              <input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
          </div>
        </section>

        {isOrg && (
          <section className="form-section">
            <h2>Drop-off location</h2>
            <div className="field">
              <label htmlFor="address">Street address</label>
              <input id="address" name="address" value={formData.address} onChange={handleChange} required />
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
        )}

        <button type="submit" className="btn btn-primary btn-full" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
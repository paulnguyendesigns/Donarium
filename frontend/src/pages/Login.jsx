import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      login(response.data.access_token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail || "Login failed.";
      setError(detail);
    }
  }

  return (
    <div className="auth-shell">
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <span className="wordmark">Donarium</span>
          <h1>Log in</h1>
          <p className="auth-tagline">Connecting classrooms with the community that supports them.</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Log in
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
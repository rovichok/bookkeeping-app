import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "https://localhost:7239/api/auth/login";

export default function AdminLoginPage() {
  // ---------------------------
  // ROUTING HOOKS
  // ---------------------------
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where to send the user after login:
  // 1. The page they were trying to access (from ProtectedRoute state)
  // 2. Default to the leads page
  const from = location.state?.from?.pathname || "/admin/leads";

  // ---------------------------
  // STATE
  // ---------------------------
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // HANDLERS
  // ---------------------------
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const email = formData.email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid credentials. Please try again.");
        }

        if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        }

        throw new Error("An unexpected error occurred.");
      }

      if (!data.token) {
        throw new Error("Login response was invalid.");
      }

      // Success: Store token and redirect
      localStorage.setItem("lentis_admin_token", data.token);

      // Navigate back to the intended page, replacing login in history
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "420px" }}>
        <h2>Admin Login</h2>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

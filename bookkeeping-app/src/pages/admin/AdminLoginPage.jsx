import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../apiConfig";

//const API_URL = "https://localhost:7239/api/auth/login";
const API_URL = `${API_BASE_URL}/api/auth/login`;

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Grabbing the login function from your AuthContext

  // SMART REDIRECT:
  // If the user was kicked here from a protected page, location.state.from
  // holds that URL. If they came here directly, default to the leads page.
  const from = location.state?.from?.pathname || "/admin/leads";

  // Updates form state as the user types
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // CRITICAL: Tells the browser to receive and store the HttpOnly cookie
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      // Update React state so the app knows we are now authenticated
      login();

      // Send the user to their destination and 'replace: true'
      // prevents them from clicking "back" to the login form.
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-field">
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

          <div className="admin-login-field">
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

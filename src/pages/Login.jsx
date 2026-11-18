import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const notice = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.get("/users");

      const user = response.data.find(
        (item) =>
          item.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          String(item.password) === String(password)
      );

      if (!user) {
        setError("That email and password don't match an account. Check them and try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login error:", err);
      setError("Can't reach the server. Make sure it's running with npm run server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <h1>Welcome back.</h1>
          <span>Your wishlist is saved and waiting for you.</span>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-form-wrapper">
          <div className="auth-heading">
            <h2>Log in</h2>
            <p>Use the email and password you signed up with.</p>
          </div>

          {notice && <div className="auth-notice" role="status">{notice}</div>}
          {error && <div className="auth-error" role="alert">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-password">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="auth-switch">
            New here?
            <Link to="/signup">Create an account</Link>
          </p>

          <Link to="/" className="auth-back">Back to the shop</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

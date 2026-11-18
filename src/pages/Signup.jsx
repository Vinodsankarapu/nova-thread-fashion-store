import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = user.email.trim().toLowerCase();

    try {
      const response = await api.get("/users", { params: { email } });

      if (response.data.length > 0) {
        setError("An account with this email already exists. Try logging in instead.");
        return;
      }

      await api.post("/users", { ...user, name: user.name.trim(), email });

      navigate("/login", { state: { message: "Account created. Log in to continue." } });
    } catch (err) {
      console.error("Error creating account:", err);
      setError("Couldn't create your account. Make sure the server is running with npm run server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <h1>Join Nova Thread.</h1>
          <span>Save pieces to your wishlist, and add or edit items in the shop.</span>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-form-wrapper">
          <div className="auth-heading">
            <h2>Create your account</h2>
            <p>It takes under a minute.</p>
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                autoComplete="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <div className="auth-password">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  minLength={6}
                  value={user.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <Link to="/login">Log in</Link>
          </p>

          <Link to="/" className="auth-back">Back to the shop</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

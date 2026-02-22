import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    const result = login(username.trim(), password.trim());

    if (!result.ok) {
      setError(result.message || "Login failed. Please try again.");
      return;
    }

    navigate("/saved");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to NewsReader</h2>
        <p className="login-subtitle">Access your personalized news experience</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Login
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts (for testing):</p>
          <p>Regular user: <strong>tiffany / password123</strong></p>
          <p>Admin user: <strong>admin / admin123</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
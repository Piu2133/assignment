import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import TaskManager from "./TaskManager.jsx";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(
    localStorage.getItem("rememberedUser") || ""
  );
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(
    Boolean(localStorage.getItem("rememberedUser"))
  );
  const [error, setError] = useState("");

  const strength =
    password.length === 0
      ? ""
      : password.length < 6
      ? "Weak"
      : password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
      ? "Medium"
      : "Strong";

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (remember) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    // Demo JWT token simulation (not a real JWT)
    const token = "demo-jwt-" + Date.now();
    localStorage.setItem("authToken", token);
    localStorage.setItem("loggedInUser", username);

    navigate("/");
  }

  return (
    <div className="auth-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Login to access your Task Manager</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password && (
          <p className="strength">
            Password strength: <b>{strength}</b>
          </p>
        )}

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function ProtectedApp() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <TaskManager />
    </>
  );
}

function ProtectedRoute() {
  const token = localStorage.getItem("authToken");

  return token ? <ProtectedApp /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedRoute />} />
    </Routes>
  );
}
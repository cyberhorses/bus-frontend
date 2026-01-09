// File: app/routes/login.jsx
import React, { useState } from "react";
import "../styles/login.css";
const loginPath = "http://localhost:8000/api/login"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const bd = { 
          username: username, 
          password: password 
        };

    console.log("REquest Body:", bd)
    try {
      const response = await fetch(loginPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bd)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register clicked with:", { username, password });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
          <button type="button" onClick={handleRegister} className="register-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
// File: app/routes/login.jsx
import { useState } from "react";
import { handleLogin } from "../http/apiClient";
import { useNavigate } from "react-router";
import { Link } from "react-router";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginBtnSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password, navigate, setErrorMessage)
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <button type="button" onClick={handleLoginBtnSubmit} className="login-button">
            Login
          </button>
        </div>
        <p className="register-prompt">
          Don’t have an account yet?
          <Link to="/register" className="register-link"> Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { handleRegister } from "../http/apiClient";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterBtnSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !repeatPassword) {
      setErrorMessage("All fields are required.");
      setSuccessMessage(""); // Clear success message
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage(""); // Clear success message
      return;
    }

    await handleRegister(
      username,
      password,
      (errorMsg) => {
        setErrorMessage(errorMsg);
        setSuccessMessage(""); 
      },
      (successMsg) => {
        setSuccessMessage(successMsg);
        setErrorMessage(""); 
      },
      navigate
    );
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
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
        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password:</label>
          <input
            type="password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            onClick={handleRegisterBtnSubmit}
            className="login-button"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <p className="register-prompt">
          Already registered?{" "}
          <Link to="/login" className="register-link">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;